import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import isEqual from 'lodash.isequal';
import capitalize from '../../../../utils/capitalize';
import moment from 'moment';
import theme from '../../../../theme';
import Card from '../../../../components/card';
import axios from 'axios';
import useTeams from '../../../../redux/teams/hooks';
import LoadingScreen from '../../../../components/loadingSpinner';
import Button from '../../../../components/button';
import {getCompleteTeamContracts} from '../../../../api/contracts';
import Input from '../../../../components/input';
import useAuth from '../../../../redux/auth/hooks';

const ReviewMatch = ({ navigation, route }) => {
  const { match: { homeId, awayId, type, time, _id, review }} = route.params
  const { id } = useAuth();
  const [isLoading, setIsLoading] = useState(false)
  const [players, setPlayers] = useState(false)
  const [awayTeam, setAwayTeam] = useState({})
  const { team: homeTeam, isLoadingTeam, getTeam } = useTeams()
  const [starters, setStarters] = useState([])
  const [stats, setStats] = useState([])
  const [homeScore, setHomeScore] = useState(route.params.match.homeScore || '')
  const [awayScore, setAwayScore] = useState(route.params.match.awayScore || '')

  useEffect(() => {
    Promise.all([
      fetchData(),
      getTeam(homeId)])
  }, [])

  const isTeamManager = homeTeam.managerId === id || awayTeam.managerId === id

  const canReview = review === 'complete' || !isTeamManager

  const notManager = review !== 'complete' && !isTeamManager

  const fetchData = async () => {
    setIsLoading(true)
    const url = `teams/${awayId}`
    try {
      const response = await axios.get(url)
      const contractsResponse = await getCompleteTeamContracts({ teamId: homeId })
      await fetchStats()
      setAwayTeam(response.data)
      setPlayers(contractsResponse.data)
    } catch (e) {
      console.log(e.response?.data.message, 'error')
    }
    setIsLoading(false)
  }

  const fetchStats = async () => {
    const url = `stats/match/${_id}?=teamId=${homeId}`
    try {
      const response = await axios.get(url)
      setStarters(response.data.map(stat => stat.playerId))
    } catch (e) {
      console.log(e.response?.data.message, 'error')
    }
  }

  const addGoalScorer = (playerId) => {
    const currentStat = stats.find(stat => playerId === stat.playerId)
    if (currentStat) {
      const newStats = stats.map(stat => playerId === stat.playerId ? {...stat, quantity: stat.quantity + 1} : stat)
      return setStats(newStats)
    }

    const stat = {
      type: 'goal',
      playerId,
      teamId: homeId,
      matchId: _id,
      quantity: 1
    }
    setStats([...stats, stat])
  }

  const dateString = moment(time).format("dddd Do MMMM YYYY");
  const timeString = moment(time).format("HH:mm");
  if (isLoading || isLoadingTeam) return <LoadingScreen />

  const submitReview = async () => {
    setIsLoading(true)
    try {
      await axios.put(`matches/${_id}/report`, { stats, homeScore, awayScore })
    } catch (e) {
      console.log('Error submitting scorecard', e)
    }
    setIsLoading(false)
  }
  console.log('stats', stats)
  return (
    <View keyboardShouldPersistTaps='handled' style={{ flex: 1, alignItems: 'center', marginBottom: 20 }}>
      <Text style={{ color: theme.activeWhite, fontSize: 20, fontWeight: 'bold'}}>{dateString}</Text>
      <Text style={{ color: theme.activeWhite, fontSize: 18, marginBottom: 4}}>{timeString}</Text>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Card>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{homeTeam.name}</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: theme.inactiveGrey, textAlign: 'center'}}>{homeTeam.city}</Text>
          </View>
        </Card>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <View style={{ width: 10, borderColor: theme.inactiveGrey, borderStyle: 'solid', borderWidth: 1, height: 1}}/>
          <Text style={{ fontSize: 14, color: theme.inactiveGrey, marginLeft: 4, marginRight: 4}}>vs</Text>
          <View style={{ width: 10, borderColor: theme.inactiveGrey, borderStyle: 'solid', borderWidth: 1, height: 1}}/>
        </View>
        <Card>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{awayTeam.name}</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: theme.inactiveGrey, textAlign: 'center'}}>{awayTeam.city}</Text>
          </View>
        </Card>
      </View>
      <View style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row', width: '90%'}}>
        {canReview ? <Text style={{ color: theme.activeWhite, fontSize: 20, fontWeight: 'bold'}}>{homeScore}</Text> : <Input width={50} fontSize={20} value={homeScore} onChangeText={setHomeScore} placeholder="0" />}
        {canReview ? <Text style={{ color: theme.activeWhite, fontSize: 20, fontWeight: 'bold'}}>{awayScore}</Text> : <Input width={50} fontSize={20} value={awayScore} onChangeText={setAwayScore} placeholder="0" />}
      </View>
      <Text style={{ color: theme.activeWhite, fontSize: 18, fontWeight: 'bold'}}>{`${type}-a-side`}</Text>
      {notManager && <Text style={{ color: theme.activeWhite, fontSize: 18, fontWeight: 'bold'}}>Waiting for manager review</Text>}
      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10, marginBottom: 20}}>
        {players.filter(({playerId}) => starters.includes(playerId)).map(({ playerId, playerName }) =>
          <Button
            disabled={canReview}
            secondary
            key={playerId}
            width="40%"
            onPress={() => addGoalScorer(playerId)}
            title={capitalize(playerName)}/>
            )}
      </View>
      {!canReview && <Button width="50%" onPress={submitReview} title="Submit review"/>}
    </View>
  );
}

export default ReviewMatch

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

const MatchView = ({ navigation, route }) => {
  const { match: { homeId, awayId, type, time, _id }} = route.params
  const [isLoading, setIsLoading] = useState(false)
  const [players, setPlayers] = useState(false)
  const [awayTeam, setAwayTeam] = useState({})
  const { team, isLoadingTeam, getTeam } = useTeams()
  const [starters, setStarters] = useState([])
  const [selectedTeam, setSelectedTeam] = useState([])

  useEffect(() => {
    Promise.all([
      fetchData(),
      getTeam(homeId)]).then()
  }, [])


  const fetchData = async () => {
    setIsLoading(true)
    const url = `teams/${awayId}`
    try {
      const response = await axios.get(url)
      const contractsResponse = await getCompleteTeamContracts({teamId: homeId })
      await fetchStarters()
      setAwayTeam(response.data)
      setPlayers(contractsResponse.data)
    } catch (e) {
      console.log(e.response?.data.message, 'error')
    }
    setIsLoading(false)
  }

  const fetchStarters = async () => {
    const url = `stats/match/${_id}?=teamId=${homeId}`
    try {
      const response = await axios.get(url)
      setSelectedTeam(response.data.map(stat => stat.playerId))
      setStarters(response.data.map(stat => stat.playerId))
    } catch (e) {
      console.log(e.response?.data.message, 'error')
    }
  }

  const deleteMatch = async () => {
    const url = `matches/${_id}`
    try {
      await axios.delete(url)
      navigation.navigate('Play')
    } catch (e) {
      console.log(e.response?.data.message, 'error')
    }
  }

  const updateMatch = async () => {
    setIsLoading(true)
    const url = `matches/${_id}`
    const payload = { homeId: homeId, players: selectedTeam}
    try {
      await axios.put(url, payload)
      await fetchStarters()
    } catch (e) {
      console.log(e.response?.data.message, 'error')
    }
    setIsLoading(false)
  }


  const dateString = moment(time).format("dddd Do MMMM YYYY");
  const timeString = moment(time).format("HH:mm");
  if (isLoading || isLoadingTeam) return <LoadingScreen />

  const selectPlayer = (player) => {
    if (selectedTeam.includes(player)) {
      const index = selectedTeam.indexOf(player)
      const arr = [...selectedTeam]
      arr.splice(index, 1)
      return setSelectedTeam(arr)
    }
    if (selectedTeam.length < type) setSelectedTeam([...selectedTeam, player])
  }

  const noChange = isEqual(selectedTeam.sort(), starters.sort())

  return (
    <View keyboardShouldPersistTaps='handled' style={{ flex: 1, alignItems: 'center', marginBottom: 20 }}>
      <Text style={{ color: theme.activeWhite, fontSize: 20, fontWeight: 'bold'}}>{dateString}</Text>
      <Text style={{ color: theme.activeWhite, fontSize: 18, marginBottom: 4}}>{timeString}</Text>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Card>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{team.name}</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: theme.inactiveGrey, textAlign: 'center'}}>{team.city}</Text>
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
      <Text style={{ color: theme.activeWhite, fontSize: 18, fontWeight: 'bold'}}>{`${type}-a-side`}</Text>
      <Text style={{ color: theme.inactiveGrey, fontSize: 16, marginBottom: 4}}>{`${selectedTeam.length}/${type}`}</Text>
      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10, marginBottom: 20}}>
        {players.map(({ playerId, playerName }) => <Button key={playerId} width="40%" onPress={() => selectPlayer(playerId)} secondary={!selectedTeam.includes(playerId)} title={capitalize(playerName)}/>)}
      </View>
      <Button disabled={noChange} width="50%" onPress={updateMatch} title="Update players"/>
      <Button color="red" width="50%" onPress={deleteMatch} title="Delete match"/>
    </View>
  );
}

export default MatchView

import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import isEqual from 'lodash.isequal';
import capitalize from '../../../../utils/capitalize';
import moment from 'moment';
import theme from '../../../../theme';
import Card from '../../../../components/card';
import axios from 'axios';
import LoadingScreen from '../../../../components/loadingSpinner';
import Button from '../../../../components/button';
import useAuth from '../../../../redux/auth/hooks';

const MatchView = ({ navigation, route }) => {
  const { id } = useAuth()
  const { match: { homeId, awayId, type, time, _id, status }} = route.params
  const [isLoading, setIsLoading] = useState(false)
  const [awayTeam, setAwayTeam] = useState({})
  const [homeTeam, setHomeTeam] = useState({})
  const [homeContracts, setHomeContracts] = useState([])
  const [awayContracts, setAwayContracts] = useState([])
  const [selectedHomeTeam, setSelectedHomeTeam] = useState([])
  const [initialHomeTeam, setInitialHomeTeam] = useState([])
  const [selectedAwayTeam, setSelectedAwayTeam] = useState([])
  const [initialAwayTeam, setInitialAwayTeam] = useState([])
  const [stats, setMatchStats] = useState([])
  const [teamView, setTeamView] = useState('home')

  const isHomeManager = homeTeam.managerId === id
  const isAwayManager = awayTeam.managerId === id

  useEffect(() => {
    fetchData()
  }, [])


  const fetchData = async () => {
    setIsLoading(true)
    const url = `matches/full-match/${_id}`
    try {
      const { data } = await axios.get(url)
      setHomeTeam(data.homeTeam)
      setAwayTeam(data.awayTeam)
      setHomeContracts(data.homeContracts.filter(contract => contract.status !== 'pending'))
      setAwayContracts(data.awayContracts)
      setMatchStats(data.stats)

      const homeStarters = data.stats.filter( stat => stat.teamId === homeId && stat.type === 'game').map(stat => stat.playerId)
      const awayStarters = data.stats.filter( stat => stat.teamId === awayId && stat.type === 'game').map(stat => stat.playerId)
      setSelectedHomeTeam(homeStarters)
      setInitialHomeTeam(homeStarters)
      setSelectedAwayTeam(awayStarters)
      setInitialAwayTeam(awayStarters)
      data.awayTeam === id && setTeamView('away')
    } catch (e) {
      console.log(e.response?.data.message, 'error')
    }
    setIsLoading(false)
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

  const dateString = moment(time).format("dddd Do MMMM YYYY");
  const timeString = moment(time).format("HH:mm");

  const selectHomePlayer = (player) => {
    if (selectedHomeTeam.includes(player)) {
      const index = selectedHomeTeam.indexOf(player)
      const arr = [...selectedHomeTeam]
      arr.splice(index, 1)
      return setSelectedHomeTeam(arr)
    }
    if (selectedHomeTeam.length < type) setSelectedHomeTeam([...selectedHomeTeam, player])
  }

  const selectAwayPlayer = (player) => {
    if (selectedAwayTeam.includes(player)) {
      const index = selectedAwayTeam.indexOf(player)
      const arr = [...selectedAwayTeam]
      arr.splice(index, 1)
      return setSelectedAwayTeam(arr)
    }
    if (selectedAwayTeam.length < type) setSelectedAwayTeam([...selectedAwayTeam, player])
  }

  const filterStarters = (contract) => contract.status !== 'pending' && teamView === 'away' ? contract.teamId === awayId : contract.teamId === homeId


  const renderPlayers = () => currentContracts.filter(filterStarters).map(({ playerId, playerName }) =>
    <Button
      key={playerId}
      width="40%"
      title={capitalize(playerName)}
      disabled={teamView === 'home' && canUpdate ? selectedAwayTeam.includes(playerId) : selectedHomeTeam.includes(playerId)}
      secondary={teamView === 'home' ? !selectedHomeTeam.includes(playerId) : !selectedAwayTeam.includes(playerId)}
      onPress={() => {
        if (teamView === 'home') {
          canUpdate && selectHomePlayer(playerId)
        } else {
          canUpdate && selectAwayPlayer(playerId)
        }
      }}
    />
  )

  const canUpdate = (teamView === 'away' && isAwayManager) || (teamView === 'home' && isHomeManager )
  const currentContracts = teamView === 'home' ? homeContracts : awayContracts;
  const noHomeChange = isEqual(selectedHomeTeam.sort(), initialHomeTeam.sort())
  const noAwayChange = isEqual(selectedAwayTeam.sort(), initialAwayTeam.sort())
  const updateTing =  teamView === 'home' ? noHomeChange : noAwayChange


  const updateMatch = async () => {
    setIsLoading(true)
    const url = `matches/${_id}`
    const payload = {}
    if (!noHomeChange) {
      payload.homeId = homeId
      payload.homeStarters = selectedHomeTeam
    }
    if (!noAwayChange) {
      payload.awayId = awayId
      payload.awayStarters = selectedAwayTeam
    }
    try {
      await axios.put(url, payload)
      await fetchData()
    } catch (e) {
      console.log(e.response?.data.message, 'error')
    }
    setIsLoading(false)
  }

  const accept = async () => {
    try {
      await axios.get(`matches/accept/${_id}`)
      await fetchData()
    } catch (e) {
      console.log('error accepting match', e)
    }
  }

  const reject = async () => {
    try {
      await axios.get(`matches/reject/${_id}`)
      navigation.goBack()
    } catch (e) {
      console.log('error accepting match', e)
    }
  }

  if (isLoading) return <LoadingScreen />

  return (
    <View keyboardShouldPersistTaps='handled' style={{ flex: 1, alignItems: 'center', marginBottom: 20 }}>
      <Text style={{ color: theme.activeWhite, fontSize: 20, fontWeight: 'bold'}}>{dateString}</Text>
      <Text style={{ color: theme.activeWhite, fontSize: 18, marginBottom: 4}}>{timeString}</Text>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Card onPress={() => setTeamView('home')} isFocused={teamView === 'home'}>
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
        <Card onPress={() => setTeamView('away')} isFocused={teamView === 'away'}>
          <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{awayTeam.name}</Text>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: theme.inactiveGrey, textAlign: 'center'}}>{awayTeam.city}</Text>
          </View>
        </Card>
      </View>
      {status === 'pending' && <Button onPress={accept} color="green" width="40%" title="Accept" />}
      {status === 'pending' && <Button onPress={reject} color="red" width="40%" title="Reject" />}
      <Text style={{ color: theme.activeWhite, fontSize: 18, fontWeight: 'bold'}}>{`${type}-a-side`}</Text>
      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10, marginBottom: 20}}>
        {renderPlayers()}
      </View>
      {canUpdate && <Button disabled={updateTing} width="50%" onPress={updateMatch} title="Update players"/>}
      {(isHomeManager || isAwayManager) && <Button color="red" width="50%" onPress={deleteMatch} title="Delete match"/>}
    </View>
  );
}

export default MatchView

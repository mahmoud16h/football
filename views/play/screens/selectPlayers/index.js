import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import capitalize from '../../../../utils/capitalize';
import moment from 'moment';
import theme from '../../../../theme';
import Card from '../../../../components/card';
import axios from 'axios';
import useTeams from '../../../../redux/teams/hooks';
import LoadingScreen from '../../../../components/loadingSpinner';
import Button from '../../../../components/button';
import {getCompleteTeamContracts} from '../../../../api/contracts';

const SelectPlayers = ({ navigation, route }) => {
  const { home, away, gameType, date } = route.params
  const [isLoading, setIsLoading] = useState(false)
  const [players, setPlayers] = useState(false)
  const [awayTeam, setAwayTeam] = useState({})
  const { team, isLoadingTeam, getTeam } = useTeams()
  const [selectedTeam, setSelectedTeam] = useState([])

  useEffect(() => {
    Promise.all([
    fetchData(),
    getTeam(home)]).then()
  }, [])

  const createGame = async () => {
    const payload = {
      homeId: home,
      homeName: team.name,
      awayName: awayTeam.name,
      awayId: away,
      location: 'london',
      time: date,
      type: gameType,
      homeScore: null,
      awayScore: null,
      players: selectedTeam
    }
    try {
      await axios.post('matches', payload)
    } catch (e) {
      console.log('Error creating game', e)
    }
  }

  const fetchData = async () => {
    setIsLoading(true)
    const url = `teams/${away}`
    try {
      const response = await axios.get(url)
      const contractsResponse = await getCompleteTeamContracts({teamId: home })
      setAwayTeam(response.data)
      setPlayers(contractsResponse.data)
    } catch (e) {
      console.log(e.response?.data.message, 'error')
    }
    setIsLoading(false)
  }
  const dateString = moment(date).format("dddd Do MMMM YYYY");
  const timeString = moment(date).format("HH:mm");
  if (isLoading || isLoadingTeam) return <LoadingScreen />

  const selectPlayer = (player) => {
    if (selectedTeam.includes(player)) {
      const index = selectedTeam.indexOf(player)
      const arr = [...selectedTeam]
      arr.splice(index, 1)
      return setSelectedTeam(arr)
    }
    if (selectedTeam.length < gameType) setSelectedTeam([...selectedTeam, player])
  }

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
      <Text style={{ color: theme.activeWhite, fontSize: 18, fontWeight: 'bold'}}>{`${gameType}-a-side`}</Text>
      <Text style={{ color: theme.activeWhite, fontSize: 18, marginBottom: 4, fontWeight: 'bold'}}>Choose players</Text>
      <Text style={{ color: theme.inactiveGrey, fontSize: 16, marginBottom: 4}}>{`${selectedTeam.length}/${gameType}`}</Text>
      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 10, marginBottom: 20}}>
        {players.map(({ playerId, playerName }) => <Button key={playerId} width="40%" onPress={() => selectPlayer(playerId)} secondary={!selectedTeam.includes(playerId)} title={capitalize(playerName)}/>)}
      </View>
      <Button title="Send match request" onPress={createGame}/>
    </View>
  );
}

export default SelectPlayers

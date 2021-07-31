import {Text, View, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Input from '../input';
import {Ionicons} from '@expo/vector-icons';
import theme from '../../theme';
import addOne from '../../assets/addOne.png';
import Card from '../card';
import Button from '../button';
import {addPlayerContract, deleteContract, deleteContractByMobile, fetchContracts} from '../../api/contracts';
import LoadingScreen from '../loadingSpinner';

const AddPlayers = ({ team = {}, navigation}) => {
  const [playerName, setPlayerName] = useState('')
  const [playerNumber, setPlayerNumber] = useState('')
  const [players, setPlayers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  console.log('players', players)
  useEffect(() => {
    onFetchContracts()
  }, [])

  const onFetchContracts = async () => {
    setIsLoading(true)
    try {
      const res = await fetchContracts({teamId: team._id})
      setPlayers(res.data)
    } catch (e) {
      console.log('Error fetching contracts by team', e)
    }
    setIsLoading(false)

  }

  const addPLayer = async () => {
    const playerNumberExists = players.find(player => player.playerMobile === playerNumber)
    const canAddPlayer = !!playerName.length && !!playerNumber.length
    if (!playerNumberExists && canAddPlayer) {
      setIsLoading(true)
      try {
        const response = await addPlayerContract({playerName, playerMobile: playerNumber, teamId: team._id })
        const {playerName: name, playerMobile, playerId, status } = response.data
        setPlayers([...players, { playerName: name, playerMobile, playerId, status }])
        setPlayerName('')
        setPlayerNumber('')
      } catch (e){
        console.log('Error adding player to team', e)
      }
      setIsLoading(false)
    }
  }

  const removePlayer = async ({ playerId, playerMobile }) => {
    setIsLoading(true)
    try {
      if(playerId) await deleteContract({playerId, teamId: team._id})
      if(!playerId) await deleteContractByMobile({playerMobile, teamId: team._id})
      const res = await fetchContracts({teamId: team._id})
      setPlayers(res.data)
    } catch (e) {
      console.log('Error removing player from team', e)
    }
    setIsLoading(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 30, marginTop: 10 }}>
      <Input label="Player name" value={playerName} onChangeText={setPlayerName} placeholder="Player name"/>
      <Input label="Player mobile" keyboardType="numeric" value={playerNumber} onChangeText={setPlayerNumber} placeholder="Player mobile"/>
      <Card width={50} height={50} onPress={addPLayer}>
        <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%'}}>
          <Image style={{ width: 20, height: 22}} source={addOne} />
          <Text style={{ fontSize: 8, paddingTop: 2}}>Add player</Text>
        </View>
      </Card>
      <View style={{ width: 330, height: 1, borderColor: theme.inactiveGrey, borderStyle: 'solid', borderWidth: 1, marginLeft: 6, marginTop: 20, marginBottom: 30}}/>
      {isLoading ? <LoadingScreen/> :
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {!players.length && <Text style={{color: theme.activeWhite, fontSize: 16, marginLeft: 8, fontWeight: 'bold'}}>You have no players in your team</Text>}
          {players.map(({playerName: name, playerMobile: mobile, playerId: id, status}) =>
            <View key={mobile} style={{
              display: 'flex',
              backgroundColor: id ? theme.activeWhite : theme.inactiveGrey,
              flexDirection: 'row',
              width: 200,
              justifyContent: 'space-between',
              alignItems: 'center',
              borderStyle: 'solid',
              borderWidth: 1,
              borderRadius: 6,
              borderColor: theme.activeWhite,
              padding: 4,
              margin: 4
            }}>
              <View>
                <Text style={{fontSize: 16, marginLeft: 8, fontWeight: 'bold'}}>{name}</Text>
                <Text style={{fontSize: 14, marginLeft: 8, fontWeight: 'bold', color: id && theme.inactiveGrey}}>{mobile}</Text>
              </View>
              {status === 'pending' && <Text style={{fontSize: 14, marginLeft: 6, fontWeight: 'bold', color: 'red'}}>pending</Text>}
              <View style={{display: 'flex', flexDirection: 'row'}}>
                {/*{ !id && <ActivityIndicator size="small" /> }*/}
                <Ionicons name="trash-outline" size={20} onPress={() => removePlayer({playerId: id, playerMobile: mobile})} />
              </View>
            </View>
          )}
          <Button secondary title="Done" onPress={() => navigation.navigate('Teams')} />
        </View>
      }
    </ScrollView>
  );
}

export default AddPlayers

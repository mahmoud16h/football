import {Text, View, ScrollView, Image} from 'react-native';
import React, {useState} from 'react';
import Input from '../input';
import {Ionicons} from '@expo/vector-icons';
import theme from '../../views/theme';
import addOne from '../../assets/addOne.png';
import Card from '../card';

const AddPlayers = () => {
  const [playerName, setPlayerName] = useState('')
  const [playerNumber, setPlayerNumber] = useState('')
  const [players, setPlayers] = useState([])

  const addPLayer = () => {
    const playerNumberExists = players.find(player => player.number === playerNumber)
    const canAddPlayer = !!playerName.length && !!playerNumber.length
    if (!playerNumberExists && canAddPlayer) {
      // check on backend if the players number already exists and then replace the name
      // given here with the name the player has actually registered with
      setPlayers([...players, { name: playerName, number: playerNumber }])
      setPlayerName('')
      setPlayerNumber('')
    }
  }

  const removePlayer = (number) => {
    const newPlayers = players.filter(player => player.number !== number)
    setPlayers(newPlayers)
  }

  return (
    <View  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
      <Input value={playerName} onChangeText={setPlayerName} placeholder="Player name"/>
      <Input keyboardType="numeric" value={playerNumber} onChangeText={setPlayerNumber} placeholder="Player phone number"/>
      <Card width={50} height={50} onPress={addPLayer}>
        <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%'}}>
          <Image style={{ width: 20, height: 22}} source={addOne} />
          <Text style={{ fontSize: 8, paddingTop: 2}}>Add player</Text>
        </View>
      </Card>
      <View style={{ width: 330, height: 1, borderColor: theme.inactiveGrey, borderStyle: 'solid', borderWidth: 1, marginLeft: 6, marginTop: 20}}/>
      <Text style={{ color: theme.activeWhite, fontSize: 20, marginLeft: 8, marginTop: 20, marginBottom: 20, fontWeight: 'bold'}}>Players</Text>
      {!players.length && <Text style={{ color: theme.activeWhite, fontSize: 16, marginLeft: 8, fontWeight: 'bold'}}>You have no players in your team</Text>}
      {players.map(({ name, number }) =>
        <View key={number} style={{
          display: 'flex',
          backgroundColor: theme.activeWhite,
          flexDirection: 'row',
          width: 300,
          justifyContent: 'space-between',
          alignItems: 'center',
          borderStyle: 'dashed',
          borderWidth: 1,
          borderRadius: 6,
          borderColor: theme.activeWhite,
          padding: 4,
          margin: 4
        }}>
          <Text style={{ fontSize: 16, marginLeft: 8, fontWeight: 'bold'}}>{name}</Text>
          <Text style={{ fontSize: 16, marginLeft: 8, fontWeight: 'bold'}}>{number}</Text>
          <Ionicons name="trash-outline" size={20} onPress={() => removePlayer(number)} />
        </View>
      )}
    </View>
  );
}

export default AddPlayers

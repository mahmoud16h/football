import {Text, View, ScrollView, Image, ActivityIndicator, KeyboardAvoidingView} from 'react-native';
import React, {useState} from 'react';
import Input from '../input';
import {Ionicons} from '@expo/vector-icons';
import theme from '../../views/theme';
import addOne from '../../assets/addOne.png';
import Card from '../card';
import capitalize from '../../utils/capitalize';
import axios from 'axios';
import Button from '../button';

const AddPlayers = ({ team = []}) => {
  const [playerName, setPlayerName] = useState('')
  const [playerNumber, setPlayerNumber] = useState('')
  const [players, setPlayers] = useState(team?.players || [])

  const addPLayer = async () => {
    const playerNumberExists = players.find(player => player.number === playerNumber)
    const canAddPlayer = !!playerName.length && !!playerNumber.length
    if (!playerNumberExists && canAddPlayer) {

      try {
        const response = await axios.put(`teams/${team._id}/player`, {name: playerName, mobile: playerNumber })
        setPlayers([...players, response.data])
        setPlayerName('')
        setPlayerNumber('')
      } catch (e){
        console.log('error', e)
      }
    }
  }

  const removePlayer = (mobile) => {
    const newPlayers = players.filter(player => player.mobile !== mobile)
    setPlayers(newPlayers)
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

      {!players.length && <Text style={{ color: theme.activeWhite, fontSize: 16, marginLeft: 8, fontWeight: 'bold'}}>You have no players in your team</Text>}
      {players.map(({ name, mobile, id }) =>
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
            <Text style={{ fontSize: 16, marginLeft: 8, fontWeight: 'bold'}}>{capitalize(name)}</Text>
            <Text style={{ fontSize: 14, marginLeft: 8, fontWeight: 'bold', color: id && theme.inactiveGrey}}>{mobile}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row'}}>
            {/*{ !id && <ActivityIndicator size="small" /> }*/}
            <Ionicons name="trash-outline" size={20} onPress={() => removePlayer(mobile)} />
          </View>
        </View>
      )}
      <Button secondary title="Done" />

    </ScrollView>
  );
}

export default AddPlayers

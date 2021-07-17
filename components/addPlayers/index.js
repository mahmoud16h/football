import {Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Input from '../input';
import DropDownPicker from 'react-native-dropdown-picker';
import {Ionicons} from '@expo/vector-icons';

const CreateTeam = () => {
  const [teamName, setTeamName] = useState('')
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [playerNumber, setPlayerNumber] = useState('')
  const [players, setPlayers] = useState([])
  const items = cities.map(city => ({ label: city, value: city}))

  const addPLayer = () => {
    const playerNumberExists = players.find(player => player.number === playerNumber)
    const canAddPlayer = !!playerName.length && !!playerNumber.length
    if (!playerNumberExists && canAddPlayer) {
      // check on backend if the players number already exists and then replace the name
      // given here with the name the player has actually registered with
      setPlayers([...players, { name: playerName, number: playerNumber }])
    }
  }

  const removePlayer = (number) => {
    const newPlayers = players.filter(player => player.number !== number)
    setPlayers(newPlayers)
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
      <Text>Create Team!</Text>
      <Input value={teamName} onChangeText={setTeamName} placeholder="Team name"/>
      <DropDownPicker
        listMode="MODAL"
        containerStyle={{ width: 200, margin: 6, backgroundColor: 'whitesmoke'  }}
        style={{ backgroundColor: 'whitesmoke' }}
        open={open}
        value={city}
        items={items}
        setOpen={setOpen}
        setValue={setCity}
        searchable={true}
        searchPlaceholder="Search..."
      />
      <Text>Add players</Text>
      <Input value={playerName} onChangeText={setPlayerName} placeholder="Player name"/>
      <Input keyboardType="numeric" value={playerNumber} onChangeText={setPlayerNumber} placeholder="Player phone number"/>
      <Ionicons name="add-circle-outline" size={24} color="black" onPress={addPLayer} />
      {players.map(player =>
        <View style={{ display: 'flex', flexDirection: 'row', width: '70%', justifyContent: 'space-between', alignItems: 'center', borderStyle: 'dashed', borderWidth: 1, borderColor: 'black', padding: 4, margin: 4}}>
          <Text>{player.name}</Text>
          <Text>{player.number}</Text>
          <Ionicons name="close-circle-outline" size={24} color="black" onPress={() => removePlayer(player.number)} />
        </View>
      )}
    </ScrollView>
  );
}

export default CreateTeam

const cities = [
  'Bedfordshire',
  'Berkshire',
  'Bristol',
  'Buckinghamshire',
  'Cambridgeshire',
  'Cheshire',
  'City of London',
  'Cornwall',
  'Cumbria',
  'Derbyshire',
  'Devon',
  'Dorset',
  'Durham',
  'East Riding of Yorkshire',
  'East Sussex',
  'Essex',
  'Gloucestershire',
  'Greater London',
  'Greater Manchester',
  'Hampshire',
  'Herefordshire',
  'Hertfordshire',
  'Isle of Wight',
  'Kent',
  'Lancashire',
  'Leicestershire',
  'Lincolnshire',
  'Merseyside',
  'Norfolk',
  'North Yorkshire',
  'Northamptonshire',
  'Northumberland',
  'Nottinghamshire',
  'Oxfordshire',
  'Rutland',
  'Shropshire',
  'Somerset',
  'South Yorkshire',
  'Staffordshire',
  'Suffolk',
  'Surrey',
  'Tyne and Wear',
  'Warwickshire',
  'West Midlands',
  'West Sussex',
  'West Yorkshire',
  'Wiltshire',
  'Worcestershire']
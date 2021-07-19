import {View, Text} from 'react-native';
import React, {useState} from 'react';
import DropDown from '../../../../components/dropDown';
import theme from '../../../theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../../../../components/button';
const NewGame = ({ navigation, route }) => {
  const [myTeam, setMyTeam] = useState('')
  const [myTeamOpen, setMyTeamOpen] = useState(false)
  const [opponent, setOpponent] = useState('')
  const [opponentOpen, setOpponentOpen] = useState(false)
  const [date, setDate] = useState(new Date());
  const [gameType, setGameType] = useState(5)

  const onChangeDateTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <View keyboardShouldPersistTaps='handled' style={{ flex: 1, alignItems: 'center', marginBottom: 20 }}>
      <DropDown
        label="My team"
        open={myTeamOpen}
        setOpen={setMyTeamOpen}
        value={myTeam}
        setValue={setMyTeam}
        items={[]}
      />
      <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
        <View style={{ width: 100, borderColor: theme.inactiveGrey, borderStyle: 'solid', borderWidth: 1, height: 1}}/>
        <Text style={{ fontSize: 18, color: theme.inactiveGrey, marginLeft: 8, marginRight: 8}}>vs</Text>
        <View style={{ width: 100, borderColor: theme.inactiveGrey, borderStyle: 'solid', borderWidth: 1, height: 1}}/>
      </View>
      <DropDown
        label="Opponent"
        open={opponentOpen}
        setOpen={setOpponentOpen}
        value={opponent}
        setValue={setOpponent}
        items={[]}
      />

      <View style={{ width: '30%', justifyContent: 'center'}}>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChangeDateTime}
        />
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'time'}
          is24Hour={true}
          display="default"
          onChange={onChangeDateTime}
        />
      </View>


      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 30}}>
        {[5,6,7,11].map(num => <Button width="40%" secondary={num !== gameType} onPress={() => setGameType(num)} title={`${num}-a-side`}/>)}
      </View>
    </View>
  );
}

export default NewGame

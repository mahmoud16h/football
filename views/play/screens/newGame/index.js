import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import DropDown from '../../../../components/dropDown';
import theme from '../../../theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../../../../components/button';
import useTeams from '../../../../redux/teams/hooks';
import useAuth from '../../../../redux/auth/hooks';
import {useIsFocused} from '@react-navigation/native';
const NewGame = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  const [myTeam, setMyTeam] = useState('')
  const [myTeamOpen, setMyTeamOpen] = useState(false)
  const [opponent, setOpponent] = useState('')
  const [opponentOpen, setOpponentOpen] = useState(false)
  const [date, setDate] = useState(new Date());
  const [gameType, setGameType] = useState(5)
  const { id: playerId } = useAuth();
  const { teams, isLoading, getTeams } = useTeams({ playerId })
  const myTeamsValues = teams.map(team => ({ label: team.name, value: team._id}))

  useEffect(() => {
    isFocused && getTeams()
  }, [isFocused])

  const onChangeDateTime = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const formComplete = myTeam &&opponent && gameType && date

  return (
    <View keyboardShouldPersistTaps='handled' style={{ flex: 1, alignItems: 'center', marginBottom: 20 }}>
      <DropDown
        label="My team"
        open={myTeamOpen}
        setOpen={setMyTeamOpen}
        value={myTeam}
        setValue={setMyTeam}
        items={myTeamsValues}
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
        // replace with opponent teams later
        items={myTeamsValues}
      />

        <View style={{ width: 130, marginBottom: 4 }}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            display="default"
            onChange={onChangeDateTime}
            themeVariant="dark"
          />
        </View>
        <View style={{ width: 90 }}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'time'}
            is24Hour={true}
            display="default"
            onChange={onChangeDateTime}
          />
        </View>


      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 30, marginBottom: 20}}>
        {[5,6,7,11].map(num => <Button width="40%" secondary={num !== gameType} onPress={() => setGameType(num)} title={`${num}-a-side`}/>)}
      </View>
      <Button title="Next" disabled={!formComplete} onPress={() => navigation.navigate('Players', { home: myTeam, away: opponent, gameType, date })}/>
    </View>
  );
}

export default NewGame

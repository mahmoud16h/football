import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView } from 'react-native';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import theme from '../../../../theme';
import moment from 'moment'
import Button from '../../../../components/button';
import {completeTeamContractsSelector} from '../../../../redux/contracts/selectors';
import {getPlayerMatches} from '../../../../api/matches';

const PlayHome = ({ navigation }) => {
  const isFocused = useIsFocused();

  const completeContracts = useSelector(completeTeamContractsSelector)
  const [matches, setMatches] = useState([])

  useEffect(() => {
    isFocused && getMatches()
  }, [isFocused])

  const getMatches = async () => {
    try {
      const teamIds = completeContracts.map(contract => contract.teamId)
      const matchResponse = await getPlayerMatches({ teamIds: teamIds.join(',') })
      setMatches(matchResponse.data)
    } catch (e) {
      console.log('Error getting players matches', e)
    }
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 40 }}>
      {!matches.length && <Text style={{ color: theme.activeWhite, fontSize: 18, marginBottom: 20}}>Looks like you have no games, create one below!</Text>}
      {!!matches.length && matches.map(match => (
        <View key={match._id} style={{display: 'flex', backgroundColor: theme.activeWhite, margin: 10}}>
          <Text style={{}}>{match.homeName}</Text>
          <Text style={{}}>vs</Text>
          <Text style={{}}>{match.awayName}</Text>
          <Text style={{}}>{moment(match.time).format("dddd Do MMMM YYYY")}</Text>
          <Text style={{}}>{moment(match.time).format("HH:mm")}</Text>
        </View>
      ))}
      <Button secondary title="Create new game" onPress={() => navigation.navigate('New game')} />
    </ScrollView>
  );
}

export default PlayHome

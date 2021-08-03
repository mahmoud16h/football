import {Text, TouchableHighlight, Image, View} from 'react-native';
import  moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import useAuth from '../../../../redux/auth/hooks';
import TournamentCard from './components/tournamentCard';

const TournamentHome = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { id } = useAuth();
  const [teams, setTeams] = useState([])
  const [tournaments, setTournaments] = useState(tournamentsMock)
  const [tickets, setTickets] = useState([{ teamId: '60f83727a6d5d51955e03dc2', tournamentId: '436445645635645645' }])

  const tournamentTickets = tickets.map(ticket => ticket.tournamentId)

  useEffect(() => {
    isFocused && teams && !teams.length && fetchManagerTeams()
  }, [isFocused])

  const fetchManagerTeams = async () => {
    try {
      const response = await axios.get(`teams/manager/${id}`)
      setTeams(response.data)
    } catch (e) {
      console.log('error fetching managed Teams')
    }
  }

  return (
    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      {tournaments.map(tournament => <TournamentCard teams={teams} tournament={tournament} tournamentTickets={tournamentTickets} navigation={navigation} />)}
    </View>
  );
}

export default TournamentHome

const tournamentsMock = [
  {
    _id: '436445645635645645',
    name: 'Contenders Cup',
    location: 'Goals Wembley - HA0 1JH',
    date: moment(),
    type: 5,
    image: 'https://i.shgcdn.com/819bcb7a-4891-41ae-bc06-26fba7890dfb/-/format/auto/-/preview/3000x3000/-/quality/lighter/',
    prize: '£5,000',
    fees: '£100',
    description: 'Info:\n - 32 Teams in total\n - Group stage followed by play offs\n - £100 fee per team\n - £5,000 cash prize money to winners'
  },
  {
    _id: '436445645635fgdf645645',
    name: 'Contenders Cup',
    location: 'Goals Wembley - HA0 1JH',
    date: moment('12/3/21'),
    type: 5,
    image: 'https://i.shgcdn.com/819bcb7a-4891-41ae-bc06-26fba7890dfb/-/format/auto/-/preview/3000x3000/-/quality/lighter/',
    prize: '£5,000',
    fees: '£100',
    description: 'Info:\n - 32 Teams in total\n - Group stage followed by play offs\n - £100 fee per team\n - £5,000 cash prize money to winners'
  }
]
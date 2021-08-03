import {Text, ScrollView, Image, View, Animated} from 'react-native';
import React, { useState } from 'react';


const TournamentDay = ({ navigation, route }) => {

  const { tournamentId } = route.params;
  const mockTournament = {
    name: 'Contenders cup',
    groups: {
      a: {
        teams: [{
          name: "poppers",
          id: '3456789'
        },{
          name: "city fc",
          id: '345d6789'
        },{
          name: "lads fc",
          id: '34556789'
        },{
          name: "chelsea",
          id: '34c56789'
        }],
        fixtures: {},
      }
    }
  }
  const [tournament, setTournament] = useState(mockTournament)

  return (
    <ScrollView contentContainerStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{tournamentId}</Text>
    </ScrollView>
  );
}

export default TournamentDay
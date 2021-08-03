import {Image, Text, TouchableHighlight, View} from 'react-native';
import theme from '../../../../../theme';
import React from 'react';
import isToday from '../../../../../utils/isToday';

const TournamentCard = ({ tournament, navigation, tournamentTickets, teams }) => {
  const isTournamentDay = tournamentTickets.includes(tournament._id) && isToday(tournament.date.startOf('day'))
  return (
    <TouchableHighlight
      key={tournament._id}
      onPress={() => isTournamentDay ? navigation.navigate('Tournament day', {tournamentId: tournament._id }) :  navigation.navigate('Tournament', {tournament, teams})}
      underlayColor={theme.inactiveGrey}
      style={{
        backgroundColor: theme.activeWhite,
        padding: 20,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 12
      }}
    >
      <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{tournament.name}</Text>
        <Text style={{
          fontSize: 12,
          fontWeight: 'bold',
          color: theme.inactiveGrey,
          textAlign: 'center'
        }}>{tournament.location}</Text>
        <View style={{width: 150, height: 100, borderRadius: 20, overflow: 'hidden', margin: 10}}>
          <Image
            resizeMode='stretch'
            style={{width: '100%', height: '100%',}}
            source={{
              uri: tournament.image,
            }}
          />
        </View>
        <Text>{`${tournament.type}-a-side`}</Text>
        <Text>{tournament.date.format('dddd Do MMMM YYYY')}</Text>
        <Text style={{fontSize: 18, fontWeight: 'bold', fontStyle: 'italic'}}>{tournament.prize}</Text>
        {isTournamentDay && <Text style={{fontSize: 18, fontWeight: 'bold', color: 'red'}}>READY</Text>}
      </View>
    </TouchableHighlight>
  )
}

export default TournamentCard
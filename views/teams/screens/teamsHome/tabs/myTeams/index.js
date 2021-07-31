import {Text, ScrollView, Image, View, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Card from '../../../../../../components/card';
import addOne from '../../../../../../assets/addOne.png'
import theme from '../../../../../../theme';
import capitalize from '../../../../../../utils/capitalize';
import {useSelector} from 'react-redux';
import {pendingTeamContractsSelector} from '../../../../../../redux/contracts/selectors';
import {myTeamsSelector} from '../../../../../../redux/teams/selectors';
import {Ionicons} from '@expo/vector-icons';
import {useIsFocused} from '@react-navigation/native';
import CreateJoinTeam from '../../../../../../components/createJoinTeam';
import useAuth from '../../../../../../redux/auth/hooks';

const MyTeams = ({ navigation }) => {
  const pendingTeamIds = useSelector(pendingTeamContractsSelector)
  const teams = useSelector(myTeamsSelector)
  const { id } = useAuth()

  const hasTeams = !!teams?.length
  const renderTeams = () => {
    return teams.map(({name, city, _id, managerId }) => (
        <Card key={_id} onPress={() => navigation.navigate('Team', {teamId: _id })}>
          <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{capitalize(name)}</Text>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: theme.inactiveGrey, textAlign: 'center'}}>{city}</Text>
            {pendingTeamIds.includes(_id) && <Text style={{fontSize: 12, fontWeight: 'bold', color: 'red', textAlign: 'center'}}>PENDING</Text>}
            {managerId === id && <Text style={{fontSize: 12, fontWeight: 'bold', color: 'blue', textAlign: 'center'}}>Manager</Text>}
          </View>
        </Card>
      )
    )
  }

  return (
    <View style={{ display: 'flex', flex: 1, width: '100%' }}>
      <ScrollView contentContainerStyle={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', }}>
        {hasTeams &&
        <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
          {renderTeams()}
        </View>}
      </ScrollView>
      <CreateJoinTeam navigation={navigation} />
    </View>
  );
}

export default MyTeams
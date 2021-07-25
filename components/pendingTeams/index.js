import {Text, View} from 'react-native';
import React from 'react';
import theme from '../../theme';
import { pendingTeamContractsSelector } from '../../redux/contracts/selectors';
import { useSelector } from 'react-redux';


const PendingTeams = () => {
  const pendingTeamIds = useSelector(pendingTeamContractsSelector)

  if (!pendingTeamIds.length) return null

  return (
    <View style={{ display: 'flex', position: 'absolute', zIndex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ display: 'flex', width: '80%', justifyContent: 'center', backgroundColor: theme.activeWhite, padding: 20, borderRadius: 8 }}>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>You have pending team Invites!</Text>
      </View>
    </View>
  );
}

export default PendingTeams
import React, {useEffect} from 'react';
import {View} from 'react-native';

import AddPlayers from '../../../../components/addPlayers';
import useTeams from '../../../../redux/teams/hooks';
import {useIsFocused} from '@react-navigation/native';
import LoadingScreen from '../../../../components/loadingSpinner';

const TeamAddPlayers = ({ navigation, route }) => {
  const isFocused = useIsFocused();

  const { teamId } = route.params
  const { team, isLoadingTeam, getTeam } = useTeams()
  useEffect(() => {
    isFocused && getTeam(teamId)
  }, [isFocused])


  if (isLoadingTeam) return <LoadingScreen />
  return (
    <View keyboardShouldPersistTaps='handled' style={{ flex: 1, alignItems: 'center', marginBottom: 20 }}>
      <AddPlayers navigation={navigation} team={team} isLoadingTeam/>
    </View>
  );
}

export default TeamAddPlayers

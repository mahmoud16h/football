import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import useTeams from '../../../../redux/teams/hooks';
import { useIsFocused } from "@react-navigation/native";
import LoadingScreen from '../../../../components/loadingSpinner';
import theme from '../../../theme';
import capitalize from '../../../../utils/capitalize';
import Button from '../../../../components/button';

const TeamView = ({ navigation, route }) => {
  const { teamId } = route.params
  const isFocused = useIsFocused();

  const { team, isLoadingTeam, getTeam } = useTeams({ teamId })

  useEffect(() => {
    isFocused && getTeam()
  }, [isFocused])

  if (!isFocused) return null
  if (isLoadingTeam || !team) return <LoadingScreen />
  return (
    <View style={{ flex: 1, alignItems: 'center'}}>
      <Text style={{ fontSize: 40, color: theme.activeWhite }}>{capitalize(team.name)}</Text>
      <Text style={{ fontSize: 20, color: theme.inactiveGrey }}>{team.city}</Text>
      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 30}}>
        <Button width="40%" title="Matches" />
        <Button width="40%" title="Players" onPress={() => navigation.navigate('Players', { teamId })}/>
        <Button width="40%" title="Stats" />
        <Button width="40%" title="Rivals" />
      </View>
    </View>
  )
}

export default TeamView
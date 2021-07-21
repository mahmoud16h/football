import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import useTeams from '../../../../redux/teams/hooks';
import { useIsFocused } from "@react-navigation/native";
import LoadingScreen from '../../../../components/loadingSpinner';
import theme from '../../../theme';
import capitalize from '../../../../utils/capitalize';
import Button from '../../../../components/button';
import useAuth from '../../../../redux/auth/hooks';

const TeamView = ({ navigation, route }) => {
  const { id } = useAuth();
  const { teamId } = route.params
  const isFocused = useIsFocused();

  const { team, isLoadingTeam, getTeam, isLoadingPendingTeams, getPendingTeamRequests, pendingTeamIds } = useTeams({})
  useEffect(() => {
    isFocused && Promise.all([getTeam(teamId), getPendingTeamRequests(id)]).then()
  }, [isFocused])


  const isPending = pendingTeamIds.includes(teamId)
  if (!isFocused) return null
  if (isLoadingTeam || !team || isLoadingPendingTeams) return <LoadingScreen />
  return (
    <View style={{ flex: 1, alignItems: 'center'}}>
      <Text style={{ fontSize: 40, color: theme.activeWhite }}>{capitalize(team.name)}</Text>
      <Text style={{ fontSize: 20, color: theme.inactiveGrey }}>{team.city}</Text>
      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 30}}>
        {isPending && <Button color="green" width="40%" title="Accept" />}
        {isPending && <Button color="red" width="40%" title="Reject" />}
        <Button disabled={isPending} width="40%" title="Matches" />
        <Button disabled={isPending} width="40%" title="Players" onPress={() => navigation.navigate('Players', { teamId })}/>
        <Button disabled={isPending} width="40%" title="Stats" />
        <Button disabled={isPending} width="40%" title="Rivals" />
      </View>
    </View>
  )
}

export default TeamView
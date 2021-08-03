import React, {useEffect, useState} from 'react';
import { Text, ScrollView, RefreshControl} from 'react-native';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import theme from '../../../../theme';
import Button from '../../../../components/button';
import {completeTeamContractsSelector} from '../../../../redux/contracts/selectors';
import {getPlayerMatches} from '../../../../api/matches';
import MatchCard from '../../../../components/matchCard';
import LoadingCard from '../../../../components/loadingCard';
import moment from 'moment';

const PlayHome = ({ navigation }) => {
  const isFocused = useIsFocused();

  const completeContracts = useSelector(completeTeamContractsSelector)
  const [matches, setMatches] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    isFocused && getMatches()
  }, [isFocused])

  const getMatches = async (isRefresh) => {
    isRefresh ? setRefreshing(true) : setIsLoading(true);
    try {
      const teamIds = completeContracts.map(contract => contract.teamId)
      const matchResponse = await getPlayerMatches({ teamIds: teamIds.join(',') })
      setMatches(matchResponse.data)
    } catch (e) {
      console.log('Error getting players matches', e)
    }
    isRefresh ? setRefreshing(false) : setIsLoading(false);
  }

  const onClickMatch = (match) => {
    const isInPast = moment(match.time).isBefore(Date.now())
    navigation.navigate(isInPast ? 'Review' : 'Match', { match: match})
  }

  const dateSort = (a,b) => a.time > b.time ? 1 : -1;

  return (
    <ScrollView
      refreshControl={<RefreshControl tintColor="white" refreshing={refreshing} onRefresh={() => getMatches(true)} />}
      keyboardShouldPersistTaps='handled'
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', marginTop: 20, marginBottom: 40 }}
    >
      {(isLoading || refreshing) && !matches.length && [1,2,3,4,5,6,7].map((key) => <LoadingCard key={key} />)}
      {!matches.length && !isLoading && <Text style={{ color: theme.activeWhite, fontSize: 18, marginBottom: 20}}>Looks like you have no games, create one below!</Text>}
      {!!matches.length && matches.sort(dateSort).filter(mat => mat.status !== 'rejected').map(match => <MatchCard key={match._id} match={match} onPress={() => onClickMatch(match)} /> )}
      <Button secondary title="Create new game" onPress={() => navigation.navigate('New game')} />
    </ScrollView>
  );
}

export default PlayHome

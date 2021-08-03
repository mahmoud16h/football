import {Text, ScrollView, Dimensions, Animated, View} from 'react-native';
import React, {useRef, useEffect} from 'react';
import PendingTeams from '../../components/pendingTeams';
import PendingMatches from '../../components/pendingMatches';

import Refresh from '../../components/Refresh';
import LoadingScreen from '../../components/loadingSpinner';

const Home = () => {
  return (
    <ScrollView contentContainerStyle={{display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1}} refreshControl={<Refresh/>}>
      <PendingTeams />
      <PendingMatches />
      <LoadingScreen />
    </ScrollView>
  )};

export default Home
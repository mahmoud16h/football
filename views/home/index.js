import {Text, ScrollView, RefreshControl} from 'react-native';
import React from 'react';
import PendingTeams from '../../components/pendingTeams';
import PendingMatches from '../../components/pendingMatches';
import Refresh from '../../components/Refresh';

const Home = () => (
  <ScrollView style={{ flex: 1 }} refreshControl={<Refresh />}>
    <PendingTeams />
    <PendingMatches />
    <Text style={{ fontSize: 18, paddingTop: 10}}>Home</Text>
  </ScrollView>
);

export default Home
import {Text, ScrollView} from 'react-native';
import React from 'react';
import PendingTeams from '../../components/pendingTeams';

const Home = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <PendingTeams />
      <Text style={{ fontSize: 18, paddingTop: 10}}>Home</Text>
    </ScrollView>
  );
}

export default Home
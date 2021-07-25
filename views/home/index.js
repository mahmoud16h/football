import {Text, ScrollView, RefreshControl} from 'react-native';
import React from 'react';
import PendingTeams from '../../components/pendingTeams';
import useAuth from '../../redux/auth/hooks';

const Home = () => {
  const { fetchInitialData } = useAuth()

  const [refreshing, setRefreshing] = React.useState(false);
  return (
    <ScrollView style={{ flex: 1 }} refreshControl={<RefreshControl tintColor="white" refreshing={refreshing} onRefresh={fetchInitialData} />}>
      <PendingTeams />
      <Text style={{ fontSize: 18, paddingTop: 10}}>Home</Text>
    </ScrollView>
  );
}

export default Home
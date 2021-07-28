import {RefreshControl} from 'react-native';
import React from 'react';
import useAuth from '../../redux/auth/hooks';

const Refresh = () => {
  const { fetchInitialData, loadingInitial } = useAuth()

  return <RefreshControl tintColor="white" refreshing={loadingInitial} onRefresh={fetchInitialData} />
}

export default Refresh;
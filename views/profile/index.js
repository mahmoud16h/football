import {Text, View} from 'react-native';
import LogoutWidget from '../../components/logoutWidget';
import React from 'react';

const Profile = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Profile!</Text>
      <LogoutWidget />
    </View>
  );
}

export default Profile
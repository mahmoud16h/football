import {Text, View} from 'react-native';
import LogoutWidget from '../../components/logoutWidget';
import React from 'react';
import useAuth from '../../redux/auth/hooks';

const Profile = () => {
  const {mobile, id, firstName } = useAuth()

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white' }}>{mobile}</Text>
      <Text style={{ color: 'white' }}>{firstName}</Text>
      <Text style={{ color: 'white' }}>{id}</Text>
      <LogoutWidget />
    </View>
  );
}

export default Profile
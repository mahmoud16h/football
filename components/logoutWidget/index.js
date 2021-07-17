import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logoutAction } from '../../redux/auth/actions';

export default function LogoutWidget() {
  const dispatch = useDispatch();

  const logout = async () => {
    AsyncStorage.multiRemove(['token', 'userId','email'])
      .then(() => {
        dispatch(logoutAction())
      });
  }

  return (
    <Button title="Logout" onPress={logout}/>
  );
}

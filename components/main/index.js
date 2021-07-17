import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import useAuth from '../../redux/auth/hooks';
import LoginWidget from '../loginWidget';
import NavigationWidget from '../navigationWidget';

const Main = () =>  {
  const { loggedIn } = useAuth()


  if (!loggedIn) return (
    <View style={styles.container}>
      <StatusBar />
      <LoginWidget />
    </View>
  )
  return (
    <NavigationWidget />
  );
}

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

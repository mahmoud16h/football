import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, SafeAreaView, View} from 'react-native';
import { Provider } from 'react-redux'
import store from './redux/store'
import useAuth from './redux/auth/hooks';
import Main from './components/main';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

axios.defaults.baseURL = 'https://api-service-dot-new-app-2021-313715.ew.r.appspot.com/';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          start={{ x: 0, y: -5 }}
          end={{ x: 0, y: 1 }}
          colors={['grey', 'black']}
          style={{ flex: 1, position: 'absolute', left: 0, top: 0, bottom: 0, right: 0 }}
        />
          <Main />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

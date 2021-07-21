import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, SafeAreaView, View} from 'react-native';
import { Provider } from 'react-redux'
import store from './redux/store'
import useAuth from './redux/auth/hooks';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import LoginWidget from './components/loginWidget';
import NavigationWidget from './components/navigationWidget';
import Auth from './views/auth'

axios.defaults.baseURL = 'http://localhost:8080/';


const Main = () =>  {
  const { loggedIn } = useAuth()
  if (!loggedIn) return (
    <Auth />
  )
  return (
    <NavigationWidget />
  );
}

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

import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import useAuth from '../../redux/auth/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginSuccessful, logoutAction, setInit} from '../../redux/auth/actions';
import axios from 'axios';
import Input from '../input';
import Button from '../button';

export default function LoginWidget({navigation}) {
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const { loggedIn } = useAuth()
  const dispatch = useDispatch();

  const checkToken = async () => {
    try {
      await axios.get('is-valid-token')
    } catch (e) {
      AsyncStorage.multiRemove(['token', 'userId','email'])
        .then(() => {
          dispatch(logoutAction())
        });
    }
  }

  useEffect(() => {
    AsyncStorage.multiGet(['token', 'userId', 'mobile'])
      .then((result) => {
        if (result[0][1] !== null) {
          axios.defaults.headers['x-access-token'] = result[0][1];
          checkToken()
          dispatch(setInit({
            id: result[1][1],
            mobile: result[2][1],
          }))
        }
      });
  }, [])

  const login = async () => {
    if(!mobile.length) {
      console.log('please enter mobile')
      return
    }
    if(!password){
      console.log('please enter password')
      return
    }
    try {
      const response = await axios.post('signin', {
        mobile,
        password,
      })
      AsyncStorage.multiSet([['token', response.data.accessToken], ['userId', response.data.id], ['mobile', response.data.mobile]])
        .then(() => {
          dispatch(LoginSuccessful(response.data))
        });


    } catch (e) {
      console.log({ title: e || 'Error'})
    }
  }

  return (
    <View style={{ display: 'flex', alignItems: 'center'}}>
      <Input label="Mobile" value={mobile} onChangeText={setMobile} placeholder="07..."/>
      <Input label="Password" value={password} onChangeText={setPassword} placeholder="*******" />
      <Button title="Sign in" onPress={login}/>
      <Button secondary title="Sign up" onPress={() => navigation.navigate('Sign up')}/>
    </View>
  );
}

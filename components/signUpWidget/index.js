import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import useAuth from '../../redux/auth/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginSuccessful, setInit} from '../../redux/auth/actions';
import axios from 'axios';
import Input from '../input';
import Button from '../button';

export default function SignUpWidget() {
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const dispatch = useDispatch();

  const signup = async () => {
    console.log('mobile', mobile)
    if(!mobile.length) {
      console.log('please enter mobile')
      return
    }
    if(!password){
      console.log('please enter password')
      return
    }
    if(!firstName){
      console.log('please enter first name')
      return
    }
    if(!lastName){
      console.log('please enter last name')
      return
    }
    try {
      await axios.post('signup', {
        mobile,
        password,
        firstName,
        lastName
      })
      const response = await axios.post('signin', {
        mobile,
        password,
      })
      AsyncStorage.multiSet([['token', response.data.accessToken], ['userId', response.data.id], ['mobile', response.data.mobile]])
        .then(() => {
          dispatch(LoginSuccessful(response.data))
        });


    } catch (e) {
      console.log({ title: e.response?.data.message || 'Error'})
    }
  }

  const canRegister = !!mobile && !!password && !!firstName && !!lastName

  return (
    <KeyboardAvoidingView behavior={ "padding"} style={{ display: 'flex', alignItems: 'center'}}>
      <Input label="Mobile" value={mobile} onChangeText={setMobile} placeholder="07..."/>
      <Input label="First name" value={firstName} onChangeText={setFirstName} />
      <Input label="Last name" value={lastName} onChangeText={setLastName} />
      <Input label="Password" value={password} onChangeText={setPassword} placeholder="*******" />
      <Button disabled={!canRegister} title="Register" onPress={signup}/>
    </KeyboardAvoidingView>
  );
}

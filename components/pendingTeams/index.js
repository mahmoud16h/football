import {Text, ScrollView, Button, Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import useAuth from '../../redux/auth/hooks';
import {useIsFocused} from '@react-navigation/native';
import theme from '../../views/theme';


const PendingTeams = () => {
  const { id } = useAuth();
  const isFocused = useIsFocused();
  const [pendingTeams, setPendingTeams] = useState([])

  useEffect(() => {
    isFocused && fetchPendingTeamRequests()
  }, [isFocused])

  const fetchPendingTeamRequests = async () => {
    try {
      const response = await axios.get(`contracts/player/${id}?status=pending`)
      setPendingTeams(response.data)
    } catch (e) {
      console.log('error', e)
    }
  }

  if (!pendingTeams.length) return null

  return (
    <View style={{ display: 'flex', position: 'absolute', zIndex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ display: 'flex', width: '80%', justifyContent: 'center', backgroundColor: theme.activeWhite, padding: 20, borderRadius: 8 }}>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>You have pending team Invites!</Text>
      </View>
    </View>
  );
}

export default PendingTeams
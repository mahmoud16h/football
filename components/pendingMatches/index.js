import {Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import theme from '../../theme';
import axios from 'axios';
import useAuth from '../../redux/auth/hooks';

const PendingMatches = () => {
  const { id } = useAuth()
  const [matches, setMatches] = useState([])
  useEffect(() => {
    getPendingMatches()
  }, [])

  const getPendingMatches = async () => {
    console.log('fetching')
    console.log('id', id)
    try{
      const res = await axios.get(`matches/pending/${id}`)
      setMatches(res.data)
    } catch (e) {
      console.log('error', e)
    }
  }

  if (!matches.length) return null

  return (
    <View style={{ display: 'flex', position: 'absolute', zIndex: 1, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ display: 'flex', width: '80%', justifyContent: 'center', backgroundColor: theme.activeWhite, padding: 20, borderRadius: 8 }}>
        <Text style={{ fontSize: 18, textAlign: 'center' }}>You have pending match requests</Text>
      </View>
    </View>
  );
}

export default PendingMatches
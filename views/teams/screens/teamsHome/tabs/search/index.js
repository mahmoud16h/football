import {Text, ScrollView, View, ActivityIndicator} from 'react-native';
import React, { useState} from 'react';
import Card from '../../../../../../components/card';
import theme from '../../../../../theme';
import LoadingScreen from '../../../../../../components/loadingSpinner';
import capitalize from '../../../../../../utils/capitalize';
import Input from '../../../../../../components/input';
import {Ionicons} from '@expo/vector-icons';
import axios from 'axios';

const Search = ({ navigation }) => {
  const [teams, setTeams] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const searchTeams = async (value) => {
    setSearchValue(value)
    if (!value) return;
    setIsSearching(true)
    const url = `teams?name=${value.toLowerCase()}`
    try {
      const response = await axios.get(url)
      console.log('response', response.data)
      setTeams(response.data)
    } catch (e) {
      console.log(e.response?.data.message, 'error')
    }
    setIsSearching(false)
  }

  const renderTeams = () => {
    return teams.map(({name, city, _id}) => (
        <Card key={_id} onPress={() => navigation.navigate('Team', {teamId: _id})}>
          <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{capitalize(name)}</Text>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: theme.inactiveGrey, textAlign: 'center'}}>{city}</Text>
          </View>
        </Card>
      )
    )
  }

  return (
    <View style={{ flex: 1, display: 'flex', alignItems: 'center'}}>
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Input fontSize={14} value={searchValue} onChangeText={searchTeams} placeholder="search..." />
        <Ionicons name="search" size={20} color={theme.activeWhite} onPress={setSearchValue} />
      </View>
      <ScrollView contentContainerStyle={{ display: 'flex', justifyContent: 'space-between'}}>
        {isSearching && <ActivityIndicator size="small"  />}
        <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
          {renderTeams()}
        </View>

      </ScrollView>
    </View>
  );
}

export default Search
import {Text, View, TouchableHighlight} from 'react-native';
import React, {useState} from 'react';
import theme from '../../../../theme';
import MyTeams from './tabs/myTeams';
import Search from './tabs/search';

const TeamsHome = ({ navigation }) => {
  const [currentTab, setCurrentTab] = useState('myTeams')

  return (
    <View style={{ flex: 1, display: 'flex', alignItems: 'center'}}>
      <View style={{ display: 'flex', flexDirection: 'row'}}>
        <TouchableHighlight onPress={() => setCurrentTab('myTeams')} underlayColor={theme.activeWhite} style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '50%',
          height: 40,
          borderBottomWidth: 1,
          borderColor: theme.inactiveGrey,
          borderStyle: 'solid',
        }}>
          <Text style={{ fontSize: 16, color: currentTab === 'myTeams' ? theme.activeWhite : theme.inactiveGrey, fontWeight: 'bold'}}>My Teams</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={() => setCurrentTab('opponents')} underlayColor={theme.activeWhite} style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '50%',
          height: 40,
          borderBottomWidth: 1,
          borderColor: theme.inactiveGrey,
          borderStyle: 'solid'}}>
          <Text style={{ fontSize: 16, color: currentTab === 'opponents' ? theme.activeWhite : theme.inactiveGrey, fontWeight: 'bold'}}>Search</Text>
        </TouchableHighlight>
      </View>
      {currentTab === 'myTeams' ? <MyTeams navigation={navigation} currentTab={currentTab} /> : <Search navigation={navigation} /> }
    </View>
  );
}

export default TeamsHome
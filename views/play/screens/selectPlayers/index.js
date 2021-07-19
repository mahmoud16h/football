import {View, Text} from 'react-native';
import React from 'react';

const SelectPlayers = ({ navigation, route }) => {
  return (
    <View keyboardShouldPersistTaps='handled' style={{ flex: 1, alignItems: 'center', marginBottom: 20 }}>
      <Text style={{ backgroundColor: 'white'}}>Select Players</Text>
    </View>
  );
}

export default SelectPlayers

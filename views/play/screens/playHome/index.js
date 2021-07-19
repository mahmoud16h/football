import {View, Text, Image} from 'react-native';
import React from 'react';
import theme from '../../../theme';
import Button from '../../../../components/button';

const PlayHome = ({ navigation }) => {
  return (
    <View keyboardShouldPersistTaps='handled' style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
      <Text style={{ color: theme.activeWhite, fontSize: 18, marginBottom: 20}}>Looks like you have no games, create one below!</Text>
      <Button secondary title="Create new game" onPress={() => navigation.navigate('New game')} />
    </View>
  );
}

export default PlayHome

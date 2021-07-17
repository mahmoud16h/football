import {ScrollView} from 'react-native';
import React from 'react';

import Button from '../../../../components/button';
import AddPlayers from '../../../../components/addPlayers';

const TeamView = () => {
  return (
    <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
      <AddPlayers />
      <Button title="Save" />
    </ScrollView>
  );
}

export default TeamView

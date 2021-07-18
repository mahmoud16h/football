import {Text, ScrollView, Button, Image, View} from 'react-native';
import React, {useEffect} from 'react';
import Card from '../../../../components/card';
import addOne from '../../../../assets/addOne.png'
import useTeams from '../../../../redux/teams/hooks';
import useAuth from '../../../../redux/auth/hooks';
import { useIsFocused } from "@react-navigation/native";
import theme from '../../../theme';

const TeamsHome = ({ navigation }) => {
  const { id } = useAuth();
  const { teams, isLoading, getTeams } = useTeams(id)
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && getTeams()
  }, [isFocused])


  const hasTeams = !!teams?.length
  const capitalize = (string) => string.charAt(0).toUpperCase() + string.slice(1);

  const renderTeams = () => teams.map(({ name, city, _id }) => (
      <Card key={_id}>
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ fontSize: 20, fontWeight: 'bold'}}>{capitalize(name)}</Text>
          <Text style={{ fontSize: 12, fontWeight: 'bold', color: theme.inactiveGrey, textAlign: 'center'}}>{city}</Text>
        </View>
      </Card>
    )
  )

  if (isLoading) return <View><Text style={{ backgroundColor: 'white', fontSize: 18, paddingTop: 10}}>LOADING</Text></View>
  return (
    <ScrollView contentContainerStyle={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
      <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
        {renderTeams()}
      </View>

      <View style={{ backgroundColor: 'transparent', justifyContent: 'space-evenly', display: 'flex', flexDirection: 'row', width: '100%', paddingTop: 20 }}>
        <Card width={hasTeams && 100} height={hasTeams && 100} onPress={() => navigation.navigate('Create team')}>
          <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%'}}>
            <Image style={{ width: hasTeams ? 30: 77, height: hasTeams ? 32 : 80}} source={addOne} />
            <Text style={{ fontSize: hasTeams ? 12 : 18, paddingTop: 10}}>Create Team</Text>
          </View>
        </Card>
        <Card width={hasTeams && 100} height={hasTeams && 100} onPress={() => navigation.navigate('Join team')}>
          <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%'}}>
            <Image style={{ width: hasTeams ? 30: 77, height: hasTeams ? 32 : 80}} source={addOne} />
            <Text style={{ fontSize: hasTeams ? 12 : 18, paddingTop: 10}}>Join Team</Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

export default TeamsHome
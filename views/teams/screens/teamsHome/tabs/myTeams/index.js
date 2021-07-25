import {Text, ScrollView, Image, View} from 'react-native';
import React from 'react';
import Card from '../../../../../../components/card';
import addOne from '../../../../../../assets/addOne.png'
import theme from '../../../../../../theme';
import capitalize from '../../../../../../utils/capitalize';
import {useSelector} from 'react-redux';
import {pendingTeamContractsSelector} from '../../../../../../redux/contracts/selectors';
import {myTeamsSelector} from '../../../../../../redux/teams/selectors';

const MyTeams = ({ navigation, currentTab }) => {
  const pendingTeamIds = useSelector(pendingTeamContractsSelector)
  const teams = useSelector(myTeamsSelector)

  const hasTeams = !!teams?.length
  const renderTeams = () => {
    return teams.map(({name, city, _id}) => (
        <Card key={_id} onPress={() => navigation.navigate('Team', {teamId: _id })}>
          <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{capitalize(name)}</Text>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: theme.inactiveGrey, textAlign: 'center'}}>{city}</Text>
            {pendingTeamIds.includes(_id) && <Text style={{fontSize: 12, fontWeight: 'bold', color: 'red', textAlign: 'center'}}>PENDING</Text>}
          </View>
        </Card>
      )
    )
  }

  return (

    <ScrollView contentContainerStyle={{ display: 'flex', justifyContent: 'space-between' }}>
      {hasTeams &&
      <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
        {renderTeams()}
      </View>}
      <View style={{ backgroundColor: 'transparent', justifyContent: 'space-evenly', display: 'flex', flexDirection: 'row', width: '100%', paddingTop: 20 }}>
        <Card width={hasTeams && 70} height={hasTeams && 70} onPress={() => navigation.navigate('Create team')}>
          <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%'}}>
            <Image style={{ width: hasTeams ? 30: 77, height: hasTeams ? 32 : 80}} source={addOne} />
            <Text style={{ fontSize: hasTeams ? 10 : 18, paddingTop: 10}}>Create Team</Text>
          </View>
        </Card>
        <Card width={hasTeams && 70} height={hasTeams && 70} onPress={() => navigation.navigate('Join team')}>
          <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%'}}>
            <Image style={{ width: hasTeams ? 30: 77, height: hasTeams ? 32 : 80}} source={addOne} />
            <Text style={{ fontSize: hasTeams ? 10 : 18, paddingTop: 10}}>Join Team</Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

export default MyTeams
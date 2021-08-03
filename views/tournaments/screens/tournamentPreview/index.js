import {Text, ScrollView, Image, View, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Button from '../../../../components/button';
import DropDown from '../../../../components/dropDown';


const tournamentPreview = ({ navigation, route }) => {
  const [myTeamOpen, setMyTeamOpen] = useState(false)
  const [showTeams, setShowTeams] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState({})
  const { tournament, teams } = route.params;
  const { name, location, date, type, image, description } = tournament;
  const myTeamsValues = teams.map(team => ({ label: team.name, value: team._id}))

  return (
    <ScrollView contentContainerStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>{name}</Text>
      <View style={{ width: 200, height: 120, borderRadius: 20, overflow: 'hidden', margin: 10}}>
        <Image
          resizeMode='stretch'
          style={{ width: '100%', height: '100%',}}
          source={{
            uri: image,
          }}
        />
      </View>
      <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>{`${type}-a-side`}</Text>
      <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>{date.format('dddd Do MMMM YYYY')}</Text>
      <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>{location}</Text>
      <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white', margin: 10}}>{description}</Text>
      <DropDown
        label="Select team"
        open={myTeamOpen}
        setOpen={setMyTeamOpen}
        value={selectedTeam}
        setValue={setSelectedTeam}
        items={myTeamsValues}
      />
      <Button title="Register team" onPress={() => setShowTeams(prev => !prev)}/>
    </ScrollView>
  );
}

export default tournamentPreview
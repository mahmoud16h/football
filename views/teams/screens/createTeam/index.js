import React, {useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import axios from 'axios';
import {Ionicons} from '@expo/vector-icons';
import Input from '../../../../components/input';
import DropDownPicker from 'react-native-dropdown-picker';

import theme from '../../../../views/theme';
import Button from '../../../../components/button';
import ImagePicker from '../../../../components/imagePicker';
import useAuth from '../../../../redux/auth/hooks';

const CreateTeam = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [teamName, setTeamName] = useState('')
  const [open, setOpen] = useState(false);
  const [teamCreated, setTeamCreated] = useState(false);
  const [city, setCity] = useState('')
  const { id } = useAuth();
  const items = cities.map(city => ({ label: city, value: city}))
  console.log('id', id)

  const createTeam = async () => {
    const payload = {
      name: teamName,
      managerId: id,
      city,
    }
    try {
      await axios.post('teams', payload)
      setTeamCreated(true)
    } catch (e) {
      console.log('Error creating team', e)
    }
  }

  const canSubmit = teamName && city

  return (
    <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
      <ImagePicker image={image} setImage={setImage} />
      <Input disabled={teamCreated} label="Team name" value={teamName} onChangeText={setTeamName} placeholder="Team name"/>
      <View style={{ display: 'flex', flexDirection: 'column', marginTop: 8, marginBottom: 20}}>
        <Text style={{ color: theme.activeWhite, fontSize: 16, marginLeft: 8}}>City</Text>
        <DropDownPicker
          disabled={teamCreated}
          modalContentContainerStyle={{ backgroundColor: theme.inactiveGrey }}
          searchTextInputStyle={{ color: theme.activeWhite }}
          style={{ backgroundColor: "transparent",  borderColor: theme.activeWhite }}
          containerStyle={{ width: 250, margin: 6, backgroundColor: 'transparent' }}
          textStyle={{ color: theme.activeWhite }}
          listMode="MODAL"
          open={open}
          value={city}
          items={items}
          setOpen={setOpen}
          setValue={setCity}
          searchable={true}
          searchPlaceholder="Search..."
        />
      </View>

      {!teamCreated && <Button disabled={!canSubmit} title="Create team" onPress={createTeam}/>}
      {teamCreated && <Button secondary title="Add players manually" onPress={() => navigation.navigate('My team')}/>}
      {teamCreated && <Button Icon={() => <Ionicons name="share" size={20} />} title="Share with players" onPress={() => setTeamCreated(true)}/>}
    </ScrollView>
  );
}

export default CreateTeam

const cities = [
  'Bedfordshire',
  'Berkshire',
  'Bristol',
  'Buckinghamshire',
  'Cambridgeshire',
  'Cheshire',
  'City of London',
  'Cornwall',
  'Cumbria',
  'Derbyshire',
  'Devon',
  'Dorset',
  'Durham',
  'East Riding of Yorkshire',
  'East Sussex',
  'Essex',
  'Gloucestershire',
  'Greater London',
  'Greater Manchester',
  'Hampshire',
  'Herefordshire',
  'Hertfordshire',
  'Isle of Wight',
  'Kent',
  'Lancashire',
  'Leicestershire',
  'Lincolnshire',
  'Merseyside',
  'Norfolk',
  'North Yorkshire',
  'Northamptonshire',
  'Northumberland',
  'Nottinghamshire',
  'Oxfordshire',
  'Rutland',
  'Shropshire',
  'Somerset',
  'South Yorkshire',
  'Staffordshire',
  'Suffolk',
  'Surrey',
  'Tyne and Wear',
  'Warwickshire',
  'West Midlands',
  'West Sussex',
  'West Yorkshire',
  'Wiltshire',
  'Worcestershire']
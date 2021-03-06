import React, {useState} from 'react';
import {Text, View, ScrollView} from 'react-native';
import axios from 'axios';
import {Ionicons} from '@expo/vector-icons';
import Input from '../../../../components/input';
import DropDownPicker from 'react-native-dropdown-picker';

import theme from '../../../../theme';
import Button from '../../../../components/button';
import ImagePicker from '../../../../components/imagePicker';
import useAuth from '../../../../redux/auth/hooks';
import DropDown from '../../../../components/dropDown';
import {createTeamApi} from '../../../../api/teams';

const CreateTeam = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [teamName, setTeamName] = useState('')
  const [open, setOpen] = useState(false);
  const [teamCreated, setTeamCreated] = useState(null);
  const [city, setCity] = useState('')
  const { id } = useAuth();
  const items = cities.map(city => ({ label: city, value: city}))

  const createTeam = async () => {
    const payload = {
      name: teamName,
      managerId: id,
      city,
    }
    try {
      const res = await createTeamApi(payload)
      setTeamCreated(res.data)
    } catch (e) {
      console.log('Error creating team', e)
    }

  }

  const canSubmit = teamName && city

  return (
    <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
      <ImagePicker image={image} setImage={setImage} />
      <Input disabled={teamCreated} label="Team name" value={teamName} onChangeText={setTeamName} placeholder="Team name"/>
      <DropDown
        disabled={teamCreated}
        open={open}
        value={city}
        items={items}
        setOpen={setOpen}
        setValue={setCity}
      />
      {!teamCreated && <Button disabled={!canSubmit} title="Create team" onPress={createTeam}/>}
      {teamCreated && <Button secondary title="Add players manually" onPress={() => navigation.navigate('Players', { teamId: teamCreated._id })}/>}
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
import {Text, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import Input from '../input';
import DropDownPicker from 'react-native-dropdown-picker';

import theme from '../../views/theme';
import Button from '../button';
import ImagePicker from '../imagePicker';

const CreateTeam = () => {
  const [image, setImage] = useState(null);
  const [teamName, setTeamName] = useState('')
  const [open, setOpen] = useState(false);
  const [city, setCity] = useState('')
  const items = cities.map(city => ({ label: city, value: city}))

  return (
    <ScrollView keyboardShouldPersistTaps='handled' contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
      <ImagePicker image={image} setImage={setImage} />
      <Input label="Team name" value={teamName} onChangeText={setTeamName} placeholder="Team name"/>
      <View style={{ display: 'flex', flexDirection: 'column', marginTop: 8, marginBottom: 20}}>
        <Text style={{ color: theme.activeWhite, fontSize: 16, marginLeft: 8}}>City</Text>
        <DropDownPicker
          modalContentContainerStyle={{
            backgroundColor: theme.inactiveGrey,
          }}
          style={{
            backgroundColor: "transparent",
            borderColor: theme.activeWhite,
          }}
          searchTextInputStyle={{
            color: theme.activeWhite
          }}
          listMode="MODAL"
          containerStyle={{ width: 250, margin: 6, backgroundColor: 'transparent' }}
          textStyle={{ color: theme.activeWhite }}
          open={open}
          value={city}
          items={items}
          setOpen={setOpen}
          setValue={setCity}
          searchable={true}
          searchPlaceholder="Search..."
        />
      </View>
      <Button secondary title="Create team" onPress={() => console.log({ teamName, city })}/>
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
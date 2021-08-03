import {Text, View} from 'react-native';
import theme from '../../theme';
import DropDownPicker from 'react-native-dropdown-picker';
import React from 'react';

const DropDown = ({ disabled = false, value, items, setOpen, setValue, label, open, ...props }) => (
  <View style={{ display: 'flex', flexDirection: 'column', marginTop: 8, marginBottom: 20}}>
  <Text style={{ color: theme.activeWhite, fontSize: 16, marginLeft: 8}}>{label}</Text>
  <DropDownPicker
    disabled={disabled}
    modalContentContainerStyle={{ backgroundColor: theme.inactiveGrey }}
    searchTextInputStyle={{ color: theme.activeWhite }}
    style={{ backgroundColor: "transparent",  borderColor: theme.activeWhite }}
    containerStyle={{ width: 250, margin: 6, backgroundColor: 'transparent' }}
    textStyle={{ color: theme.activeWhite }}
    listMode="MODAL"
    open={open}
    value={value}
    items={items}
    setOpen={setOpen}
    setValue={setValue}
    searchable={true}
    searchPlaceholder="Search..."
    {...props}
  />
</View>)

export default DropDown
import React from 'react';
import {TextInput, View, Text} from 'react-native';
import theme from '../../theme';

const Input = ({fontSize, width, ...props}) => (
  <View style={{ margin: 8}}>
    {props.label && <Text style={{ color: theme.activeWhite, fontSize: 16}}>{props.label}</Text>}
    <TextInput
      editable={!props.disabled}
      selectTextOnFocus={!props.disabled}
      style={{
        borderStyle: 'solid',
        borderColor: theme.activeWhite,
        color: props.disabled ? theme.inactiveGrey : theme.activeWhite,
        borderWidth: 1,
        width: width || 250,
        fontSize: fontSize || 20,
        padding: 10,
        borderRadius: 6,
      }} {...props} />
  </View>
);

export default Input
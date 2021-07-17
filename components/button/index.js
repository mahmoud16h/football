import React from 'react';
import {TouchableHighlight, Text, View} from 'react-native';
import theme from '../../views/theme';

const Button = ({ secondary, Icon, ...props}) => (
  <TouchableHighlight
    underlayColor={theme.inactiveGrey}
    style={{
      backgroundColor: secondary ? 'transparent' : theme.activeWhite,
      borderColor: secondary ? theme.activeWhite : 'transparent',
      borderWidth: 1,
      width: 240,
      height: 50,
      borderRadius: 6,
      margin: 10,
      flexDirection: 'row',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }} {...props} >
    <View style={{
      width: '90%',
      flexDirection: 'row',
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    }}>
      {!!Icon && <Icon />}
      <Text style={{ color: secondary ? '#D8D8D8' : 'black', fontSize: 18}}>{props.title}</Text>
    </View>
  </TouchableHighlight>
);

export default Button
import React from 'react';
import {TouchableHighlight} from 'react-native';
import theme from '../../theme';

const Card = ({ disabled, width, height, ...props}) => (
  <TouchableHighlight
    underlayColor={theme.inactiveGrey}
    style={{
      backgroundColor: disabled ? theme.inactiveGrey : theme.activeWhite,
      borderColor: theme.inactiveGrey,
      borderWidth: 1,
      width: width || 140,
      height: height || 140,
      borderRadius: 6,
      margin: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }} {...props} >
  </TouchableHighlight>
);

export default Card
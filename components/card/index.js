import React from 'react';
import {TouchableHighlight} from 'react-native';
import theme from '../../theme';

const Card = ({ disabled, width, height, color, isFocused,...props}) => {
  const backgroundColor = () => {
    switch (true){
      case !!color:
        return color
      case !!disabled:
        return theme.inactiveGrey
      default:
        return theme.activeWhite
    }
  }

  return (
  <TouchableHighlight
    underlayColor={theme.inactiveGrey}
    style={{
      borderStyle: 'solid',
      borderWidth: isFocused ? 6: 0,
      borderColor: theme.inactiveGrey,
      backgroundColor: backgroundColor(),
      width: width || 140,
      height: height || 140,
      borderRadius: 6,
      margin: 10,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }} {...props} >
  </TouchableHighlight>
)};

export default Card
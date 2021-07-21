import React from 'react';
import {TouchableHighlight, Text, View} from 'react-native';
import theme from '../../views/theme';

const Button = ({ secondary, Icon, disabled, onPress, width, color, ...props}) => {
  const backgroundColor = () => {
    switch (true){
      case !!color:
        return color
      case !!disabled:
        return theme.inactiveGrey
      case !!secondary:
        return 'transparent'
      default:
        return theme.activeWhite
    }
  }

  return (
  <TouchableHighlight
    onPress={!disabled ? onPress : null}
    underlayColor={theme.inactiveGrey}
    style={{
      backgroundColor: backgroundColor(),
      borderColor: secondary ? theme.activeWhite : 'transparent',
      borderWidth: 1,
      width: width || 240,
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
      {!!Icon && <Icon/>}
      <Text style={{color: secondary ? theme.activeWhite : 'black', fontSize: 18}}>{props.title}</Text>
    </View>
  </TouchableHighlight>
)};

export default Button
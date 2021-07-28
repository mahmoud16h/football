import React, { useRef } from 'react';
import { Animated } from 'react-native';
import theme from '../../theme';

const LoadingCard = ({ onPress }) => {
  const fadeAnim = useRef(new Animated.Value(0.2)).current
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.8,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 500,
          useNativeDriver: true,

        })
      ]),
    ).start()

  }, [fadeAnim])

  return (
  <Animated.View
    style={{
      opacity: fadeAnim,
      backgroundColor: theme.activeWhite,
      width: '80%',
      height: 70,
      borderRadius: 6,
      margin: 10,
      display: 'flex',
      justifyContent: 'center',
    }}/>
)};

export default LoadingCard
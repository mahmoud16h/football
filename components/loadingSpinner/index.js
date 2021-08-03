import React, {useEffect, useRef} from 'react';
import { Animated, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

const LoadingScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  const moveAnim = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(moveAnim, {
            toValue: 50,
            duration: 500,
            useNativeDriver: false
          }),
          Animated.timing(moveAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
          })
        ]),
        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false
          }),
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
          })
        ]),
      ]),
    ).start()

  }, [fadeAnim])


  const spin = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['140deg', '0deg']
  })


  return (
    <View style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <View style={{position: 'relative', width: 100, height: 100}}>
        <Animated.View
          style={{
            position: 'absolute',
            right: moveAnim,
            transform: [{rotate: spin}]
          }}
        >
          <Ionicons name="football" size={40} color='white'/>
        </Animated.View>
      </View>
    </View>
  )
}

export default LoadingScreen

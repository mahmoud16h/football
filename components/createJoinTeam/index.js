import {Text, Image, View, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Ionicons} from '@expo/vector-icons';
import Card from '../card';
import addOne from '../../assets/addOne.png'
import theme from '../../theme';
import {useIsFocused} from '@react-navigation/native';

const CreateJoinTeam = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [showOptions, setShowOptions] = useState(false)

  const slideAnim = useRef(new Animated.Value(-90)).current
  const iconAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    !isFocused && closeAdd()
  }, [isFocused])

  const slideIn = () => Animated.timing(slideAnim, {
    toValue: 12,
    duration: 300,
    useNativeDriver: false,
  })

  const slideOut = () => Animated.timing(slideAnim, {
    toValue: -90,
    duration: 300,
    useNativeDriver: false,
  })

  const rotateIcon = () => Animated.timing(iconAnim, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  })

  const rotateBack = () => Animated.timing(iconAnim, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  })

  const onClickAdd = () => {
    if (showOptions) return closeAdd()
    setShowOptions(true);
    animate()

  }

  const closeAdd = () => {
    setShowOptions(false);
    Animated.parallel([rotateBack(), slideOut()]).start()
  }

  const animate = () => {
    Animated.parallel([rotateIcon(), slideIn()]).start()
  }

  const spin = iconAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['1deg', '45deg']
  })

  return (
    <View>
      <Animated.View style={{
        backgroundColor: 'rgba(64,64,64,0.8)',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        width: '50%',
        position: 'absolute',
        borderRadius: 8,
        bottom: slideAnim,
        right: 50
      }}>
        <Card color={theme.accent} width={70} height={70} onPress={() => navigation.navigate('Create team')}>
          <View style={{justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%'}}>
            <Image style={{width: 30, height: 32}} source={addOne}/>
            <Text style={{fontSize: 10, paddingTop: 10}}>Create Team</Text>
          </View>
        </Card>
        <Card color={theme.accent} width={70} height={70} onPress={() => navigation.navigate('Join team')}>
          <View style={{justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%'}}>
            <Image style={{width: 30, height: 32}} source={addOne}/>
            <Text style={{fontSize: 10, paddingTop: 10}}>Join Team</Text>
          </View>
        </Card>
      </Animated.View>
      <Animated.View
        style={{ position: 'absolute', bottom: 8, right: 8, transform: [{ rotate: spin }] }}
      >
        <Ionicons
          onPress={onClickAdd}
          color={theme.accent}
          name={"add-circle"}
          size={40}
        />
      </Animated.View>
    </View>
  );
}

export default CreateJoinTeam
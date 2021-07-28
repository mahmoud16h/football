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

  useEffect(() => {
    !isFocused && closeAdd()
  }, [isFocused])

  const slideIn = () => Animated.timing(slideAnim, {
    toValue: 12,
    duration: 300,
    useNativeDriver: false,
  }).start()

  const slideOut = () => Animated.timing(slideAnim, {
    toValue: -90,
    duration: 300,
    useNativeDriver: false,
  }).start()

  const onClickAdd = () => {
    if (showOptions) return closeAdd()
    setShowOptions(true);
    slideIn()

  }

  const closeAdd = () => {
    setShowOptions(false);
    slideOut()
  }

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
      <Ionicons
        style={{ position: 'absolute', bottom: 8, right: 8 }}
        onPress={onClickAdd}
        color={theme.accent}
        name={showOptions ? 'close-circle' :"add-circle"}
        size={40}
      />
    </View>
  );
}

export default CreateJoinTeam
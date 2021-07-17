import {Text, ScrollView, Button, Image, View} from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateTeam from '../../components/createTeam';
import {LinearGradient} from 'expo-linear-gradient';
import Card from '../../components/card';
const Stack = createStackNavigator();
import addOne from '../../assets/addOne.png'

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const TransitionScreen = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: config,
    close: config
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0]
            })
          },
          {
            translateX: next
              ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -layouts.screen.width]
              })
              : 1
          }
        ]
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5]
        })
      }
    };
  }
};

const CardOptions = {
  ...TransitionScreen
};

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={CardOptions}>
      <Stack.Screen name="Home" options={{headerShown: false}} component={Home} />
      <Stack.Screen name="Create team" component={CreateTeam}/>
      <Stack.Screen name="Join team" >{() => <View><Text>Join</Text></View>}</Stack.Screen>
    </Stack.Navigator>
  );
}

const Home = ({ navigation }) => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'transparent', justifyContent: 'space-evenly', display: 'flex', flexDirection: 'row', width: '100%', paddingTop: 20 }}>
        <Card onPress={() => navigation.navigate('Create team')}>
          <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%'}}>
            <Image style={{ width: 77, height: 80}} source={addOne} />
            <Text style={{ fontSize: 18, paddingTop: 10}}>Create Team</Text>
          </View>
        </Card>
        <Card onPress={() => navigation.navigate('Join team')}>
          <View style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%'}}>
            <Image style={{ width: 77, height: 80}} source={addOne} />
            <Text style={{ fontSize: 18, paddingTop: 10}}>Join Team</Text>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

export default MyStack
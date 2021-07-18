import {Text, View} from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CreateTeam from './screens/createTeam';
import TeamView from './screens/teamView';
import TeamsHome from './screens/teamsHome';
const Stack = createStackNavigator();

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
  headerStyle: {
    backgroundColor: 'transparent',
  },
  headerTintColor: '#fff',
    headerTitleStyle: {
    fontWeight: 'bold',
  },
  ...TransitionScreen
};

const MyStack = () => {
  return (
    <Stack.Navigator screenOptions={CardOptions}>
      <Stack.Screen name="Teams" options={{headerShown: false}} component={TeamsHome} />
      <Stack.Screen name="Create team" component={CreateTeam}/>
      <Stack.Screen name="My team" component={TeamView}/>
      <Stack.Screen name="Join team" >{() => <View><Text>Join</Text></View>}</Stack.Screen>
    </Stack.Navigator>
  );
}

export default MyStack
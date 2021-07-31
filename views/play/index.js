import {Text, View} from 'react-native';
import React, {useEffect} from 'react';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import NewGame from './screens/newGame';
import SelectPlayers from './screens/selectPlayers';
import PlayHome from './screens/playHome';
import MatchView from './screens/matchView';
import ReviewMatch from './screens/reviewMatch';
const Stack = createStackNavigator();

const TransitionScreen = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec
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
      <Stack.Screen name="Play" options={{headerShown: false}} component={PlayHome} />
      <Stack.Screen name="New game" component={NewGame}/>
      <Stack.Screen name="Players" component={SelectPlayers}/>
      <Stack.Screen name="Match" component={MatchView}/>
      <Stack.Screen name="Review" component={ReviewMatch}/>
    </Stack.Navigator>
  );
}

export default MyStack
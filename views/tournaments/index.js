import {Text, View} from 'react-native';
import React from 'react';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import TournamentHome from './screens/tournamentHome';
import TournamentPreview from './screens/tournamentPreview';
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
      <Stack.Screen name="Tournaments" options={{headerShown: false}} component={TournamentHome} />
      <Stack.Screen name="Tournament" component={TournamentPreview}/>
    </Stack.Navigator>
  );
}

export default MyStack
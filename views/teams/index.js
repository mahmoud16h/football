import {Text, View} from 'react-native';
import React from 'react';
import { createStackNavigator, TransitionSpecs } from '@react-navigation/stack';
import CreateTeam from './screens/createTeam';
import TeamAddPlayers from './screens/teamAddPlayers';
import TeamsHome from './screens/teamsHome';
import TeamView from './screens/teamView';
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
      <Stack.Screen name="Teams" options={{headerShown: false}} component={TeamsHome} />
      <Stack.Screen name="Create team" component={CreateTeam}/>
      <Stack.Screen name="Players" component={TeamAddPlayers}/>
      <Stack.Screen name="Team" component={TeamView}/>
      <Stack.Screen name="Join team" >{() => <View><Text>Join</Text></View>}</Stack.Screen>
    </Stack.Navigator>
  );
}

export default MyStack
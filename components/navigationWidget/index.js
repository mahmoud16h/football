import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../../views/home';
import Tournaments from '../../views/tournaments';
import Teams from '../../views/teams';
import Profile from '../../views/profile';
import Play from '../../views/play';

const Tab = createBottomTabNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};
const MyTabs = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#D8D8D8',
      inactiveTintColor: '#565656',
      labelPosition: 'below-icon',
      style: {
        backgroundColor: 'transparent',
      }
    }}

    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        switch(route.name){
          case 'Home':
            iconName = focused ? 'home' : 'home-outline';
            break;
          case 'Play':
            iconName = focused ? 'football' : 'football-outline';
            break;
          case 'Teams':
            iconName = focused ? 'people' : 'people-outline';
            break;
          case 'Tournaments':
            iconName = focused ? 'trophy' : 'trophy-outline';
            break;
          case 'Profile':
            iconName = focused ? 'man' : 'man-outline';
            break;
          default:
            break;
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Teams" component={Teams} />
    <Tab.Screen name="Play" component={Play} />
    <Tab.Screen name="Tournaments" component={Tournaments} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

const NavigationWidget = () => (
  <NavigationContainer theme={MyTheme}>
    <MyTabs />
  </NavigationContainer>
);

export default NavigationWidget;

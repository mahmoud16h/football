import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {StatusBar} from 'expo-status-bar';
import LoginWidget from '../../components/loginWidget';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import SignUpWidget from '../../components/signUpWidget';
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

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
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
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator screenOptions={CardOptions}>
        <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
        <Stack.Screen name="Sign up" component={SignUp}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Login = ({ navigation }) => (
  <View style={styles.container}>
    <StatusBar />
    <LoginWidget navigation={navigation} />
  </View>
)

const SignUp = ({ navigation }) => (
  <View style={styles.container}>
    <StatusBar />
    <SignUpWidget navigation={navigation} />
  </View>
)

export default MyStack


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
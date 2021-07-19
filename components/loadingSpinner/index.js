import React from 'react';
import {ActivityIndicator, View} from 'react-native';

const LoadingScreen = () => (
  <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large"  />
  </View>
)

export default LoadingScreen
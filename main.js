import Expo from 'expo';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import Ball from './src/Ball';

class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Ball />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

Expo.registerRootComponent(App);

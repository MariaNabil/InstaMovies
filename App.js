import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Navigation from './navigation/Navigation';

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

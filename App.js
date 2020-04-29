import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import logo from './assets/kite.png';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 305, height: 159 }} />
      <Text style={{color: '#888', fontSize: 30}}>How High was that !?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

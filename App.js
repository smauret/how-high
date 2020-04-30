import React from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import logo from './assets/kite.png';

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.text}>How high was that !?</Text>

      <TouchableOpacity
        onPress={() => alert('Hello, world!')}
        style={styles.button}>
        <Text style={styles.buttonText}>Record a jump</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderColor: 'red'
  },
  logo: {
      width: 305,
      height: 159,
      marginBottom: 10
  },
  text: {
      color: '#888',
      fontSize: 30
  },
  button: {
    backgroundColor: "#F9A826",
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  }
});

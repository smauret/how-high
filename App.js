import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import logo from './assets/kite.png';

export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    _toggle();
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
    } else {
      _subscribe();
    }
  };

  const _subscribe = () => {
    Accelerometer.setUpdateInterval(500);
    this._subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  let { y } = data;
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.text}>How high was that !?</Text>

      <TouchableOpacity
        onPress={_toggle}
        style={styles.button}>
        <Text style={styles.buttonText}>Read accelerometer data</Text>
      </TouchableOpacity>
      <Text style={styles.text}>
        y: {round(y)}
      </Text>
    </View>
  );
}

function round(n) {
  if (!n) {
    return 0;
  }
  return Math.floor(n * 100) / 100;
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

import React, {useState, useEffect} from 'react';
import {TouchableOpacity, Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import {Accelerometer} from 'expo-sensors';
import logo from './assets/kite.png';

const screen = Dimensions.get('window')

export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
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
    //Accelerometer.setUpdateInterval(500);
    this._subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  let y = data.y + 1;

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}/>
      <Text style={styles.titleText}>How high was that !?</Text>

      <TouchableOpacity
        onPress={_toggle}
        style={styles.button}>
        <Text style={styles.buttonText}>Jump!</Text>
      </TouchableOpacity>
      <Text style={{...styles.measureText, ...{color: y < 0 ? 'red' : 'green'}}}>
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
  titleText: {
    color: '#888',
    fontSize: 30
  },
  buttonText: {
    fontSize: 23,
    color: '#888',
  },
  measureText: {
    fontSize: 30
  },
  button: {
    borderColor: "#F9A826",
    padding: 20,
    margin: 20,
    borderRadius: screen.width / 3,
    borderWidth: 10,
    width: screen.width / 3,
    height: screen.width / 3,
    justifyContent: 'center',
    alignContent: 'center'
  }
});

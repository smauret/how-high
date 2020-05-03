import React, {useState, useReducer, useEffect} from 'react';
import {TouchableOpacity, Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import {Accelerometer} from 'expo-sensors';
import logo from './assets/kite.png';

const screen = Dimensions.get('window')

export default function App() {
  const [data, setData] = useState({
    startTime: [],
    endTime: [],
    acc: [],
    highestAcc: 0,
    curAcc: null,
    prevAcc: null
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    return () => {
      _unsubscribe();
    };
  }, []);

  const _toggle = () => {
    if (this._subscription) {
      _unsubscribe();
      dispatch({type: computeJumpHeight})
    } else {
      dispatch({type: 'init'})
      _subscribe();
    }
  };

  const _subscribe = () => {
    this._subscription = Accelerometer.addListener(accelerometerData => {
      dispatch({type: 'addCurrentAcc', payload: round(accelerometerData.y + 1)})
    });
  };

  const _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}/>
      <Text style={styles.titleText}>How high was that !?</Text>

      <TouchableOpacity onPress={_toggle} style={styles.button}>
        <Text style={styles.buttonText}>Jump!</Text>
      </TouchableOpacity>
      <Text style={styles.titleText}> height: {state.jumpHeight}cm </Text>
    </View>
  );
}

const initialState = {
  startTime: [],
  endTime: [],
  jumpAcc: [],
  curHighestAcc: null,
  curAcc: null,
  jumpHeight: 0
};

function reducer(state, action) {
  const {startTime, endTime, curAcc, jumpAcc} = state
  switch (action.type) {
    case 'addCurrentAcc':
      const isNewStart = checkNewStartTime(curAcc, action.payload)
      const newStart = !isNewStart ? state.startTime : [isNewStart, ...state.startTime]
      const isNewEnd = checkNewEndTime(startTime.length, endTime.length, curAcc, action.payload)
      const newEnd = !isNewEnd ? state.endTime : [isNewEnd, ...state.endTime]
      const newHighestAcc = !isNewEnd ? state.jumpAcc : [state.curHighestAcc, ...state.jumpAcc]

      return {
        ...state,
        ...{
          curAcc: action.payload,
          startTime: newStart,
          endTime: newEnd,
          curHighestAcc: setHighestAcc(action.payload, state.curHighestAcc, isNewEnd),
          jumpAcc: newHighestAcc
        }
      }
    case computeJumpHeight:
      return {
        ...state,
        ...{
          jumpHeight: computeJumpHeight(startTime, endTime, jumpAcc)
        }
      }
    case 'init':
      return initialState;
    default:
      throw new Error();
  }
}

const checkNewStartTime = (prevAcc, curAcc) => {
  if (prevAcc <= 0 && curAcc >= 0) {
    return Date.now()
  }
  return false
}

const checkNewEndTime = (startTimeLength, endTimeLength, prevAcc, curAcc) => {
  if (startTimeLength <= endTimeLength) {
    return false
  }
  if (prevAcc >= 0 && curAcc <= 0) {
    return Date.now()
  }
  return false
}

const setHighestAcc = (curAcc, highestAcc, isNewEnd) => {
  if (isNewEnd) { //reset to zero at the end of jump
    return 0
  }
  if (curAcc > highestAcc) {
    return curAcc
  } else {
    return highestAcc
  }
}

const computeJumpHeight = (start, end, acc) => {
  if (start.length > end.length) {
    start.shift()
  }

  let jumpTimes = start.map((s, i) => (end[i] - s) / 1000)
  let jumpHeights = jumpTimes.map((t, i) => 0.5 * acc[i] * t * t * 100)

  return round(Math.max(...jumpHeights))
}

const round = (n) => {
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

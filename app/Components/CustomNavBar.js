import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Button,
  Image,
  Navigator,
  TouchableHighlight,
  BackAndroid,
  AppState,
  Sidebar
} from 'react-native';
import * as firebase from "firebase";

export default class AppContainer extends Component {
  render() {
    return (
      <View>
        <Button onPress={() => this.props.navigator.pop()} title="Back" />
      </View>
    );
  }
}
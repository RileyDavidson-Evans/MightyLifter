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
  TouchableHighlight
} from 'react-native';
import * as firebase from "firebase";

export default class ListViewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={{color: 'white'}}>{this.props.data.text}</Text>
      </View>
    );
  }
}
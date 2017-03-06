import React, { Component } from 'react';
var moment = require('moment');
var _ = require('lodash');
import {
  Text,
  View,
  TextInput,
  Dimensions,
  Image,
  TouchableHighlight,
} from 'react-native';
import images from '../../Exports/Images';
import * as firebase from "firebase";
export default class LogWorkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: '',
      rep1: '',
      rep2: '',
      rep3: '',
    }
  }

  logWorkout() {
    const { weight, rep1, rep2, rep3 } = this.state;
    const database = firebase.database();
    const userId = firebase.auth().currentUser.uid;
    const hoursDate = moment().format('h:mm:ss a');
    const dateString = moment().format('MMMM Do YYYY');
    const newPostKey = firebase.database().ref().child('user/' + userId + '/' + dateString).push().key;
    database.ref('user/' + userId + '/' + dateString + '/' + hoursDate).set({
      userId,
      excercise: this.props.workoutId,
      weight,
      rep1,
      rep2,
      rep3
    });

    this.props.navigator.pop();

  }

  render() {
    const { width, height } = Dimensions.get('window');
    const color = 'white';
    return (
      <View style={{ flex: 1, width, justifyContent: 'space-between', alignItems: 'center' }}>
        <Image
          style={
            {
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              resizeMode: 'stretch'
            }
          }
          source={require('../../../images/StockWorkoutImages/logWorkout.png')}>
          <View style={{ flex: 1, width, justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(52,52,52,.7)' }}>
            <View style={{ height: height * .4, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                style={{
                  height: height * .3,
                  width,
                  resizeMode: 'contain'
                }}
                source={images[`${this.props.workoutId}Profile`]} />
              <Text style={{ color, fontSize: 30 }}>{this.props.workoutId}</Text>
            </View>
            <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
              <TextInput keyboardType='numeric' style={{ width: width * .3, color }} underlineColorAndroid="white" onChangeText={(weight) => this.setState({ weight })} value={this.state.weight} placeholder="Weight" placeholderTextColor="white" />
              <View style={{ flexDirection: 'row' }}>
                <TextInput keyboardType='numeric' style={{ width: width * .3, color }} underlineColorAndroid="white" onChangeText={(rep1) => this.setState({ rep1 })} value={this.state.rep1} placeholder="Rep One" placeholderTextColor="white" />
                <TextInput keyboardType='numeric' style={{ width: width * .3, color }} underlineColorAndroid="white" onChangeText={(rep2) => this.setState({ rep2 })} value={this.state.rep2} placeholder="Rep Two" placeholderTextColor="white" />
                <TextInput keyboardType='numeric' style={{ width: width * .3, color }} underlineColorAndroid="white" onChangeText={(rep3) => this.setState({ rep3 })} value={this.state.rep3} placeholder="Rep Three" placeholderTextColor="white" />
              </View>
            </View>
            <TouchableHighlight
              onPress={this.logWorkout.bind(this)} >
              <View style={{ height: height * .1, backgroundColor: 'blue', width, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color }}>Log {this.props.workoutId}</Text>
              </View>
            </TouchableHighlight>
          </View>
        </Image>
      </View>
    )
  }
}
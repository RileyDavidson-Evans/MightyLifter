import React, { Component } from 'react';
var _ = require('lodash');
import {
  Text,
  View,
  Dimensions,
  Button,
  Image,
} from 'react-native';
import * as firebase from "firebase";
import images from '../../Exports/Images';
export default class WorkoutListItemHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  deleteWorkoutItem() {
    const userId = firebase.auth().currentUser.uid;
    const { key, parentKey } = this.props.data;
    firebase.database().ref('user/' + userId + '/' + parentKey + '/' + key).set(null);
  }
  render() {
    const { width, height } = Dimensions.get('window');
    if (!_.get(this.props, 'data.excercise')) {
      return null;
    }
    let { excercise, weight, rep1, rep2, rep3 } = this.props.data;
    weight = weight ? `${weight} Pounds` : null;
    return (
      <View style={{ height: height * .3, margin: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', elevation: 10 }}>
        <Image style={{ height: height * .3, resizeMode: 'contain', width }} source={images[excercise]}>
          <View style={{ backgroundColor: 'rgba(52,52,52,.7)', alignItems: 'center', justifyContent: 'space-around', flex: 1 }}>
            <Text style={{ fontSize: 30, color: 'white' }}>{excercise}</Text>
            {
              weight &&
              <Text style={{ fontSize: 30, color: 'white' }}>
                {
                  weight
                }
              </Text>
            }
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 30, color: 'white' }}>{rep1}</Text>
              <Text style={{ fontSize: 30, color: 'white' }}>x{rep2}</Text>
              <Text style={{ fontSize: 30, color: 'white' }}>x{rep3}</Text>
            </View>
            <View style={{justifyContent: 'flex-start', width: width * .8}}>
              <Button onPress={this.deleteWorkoutItem.bind(this)} title="Delete" />
            </View>
          </View>
        </Image>
      </View>
    );
  }
}
import React, { Component } from 'react';
var _ = require('lodash')
import {
  Text,
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import images from '../../Exports/Images';
export default class WorkoutListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  logWorkout() {
    this.props.navigator.replace({
      id: 'LogWorkout',
      workoutId: this.props.data.id
    });
  }
  render() {
    const { height } = Dimensions.get('window');
    return (
      <TouchableWithoutFeedback
        onPress={this.logWorkout.bind(this)}>
        <View style={{ height: height * .3, margin: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', elevation: 10 }}>
          <Image style={{ height: height * .3, resizeMode: 'contain' }} source={images[this.props.data.id]}>
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text style={{ fontSize: 30, color: 'black' }}>{this.props.data.text}</Text>
            </View>
          </Image>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
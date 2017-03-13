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
    this.state = {};
  }
  logWorkout() {
    this.props.navigator[__DEV__ ? 'replace' : 'push']({
      id: 'LogWorkout',
      workoutId: this.props.data.id
    });
  }
  render() {
    const { height } = Dimensions.get('window');
    return (
      <TouchableWithoutFeedback
        onPress={this.logWorkout.bind(this)}>
        <View style={{ height: height * .3, margin: 15, backgroundColor: 'white', elevation: 5 }}>
          <Image style={{ resizeMode: 'stretch', height: height * .3 }} source={{ uri: 'http://www.muscletech.com/wp-content/uploads/article-thedeadlift.png' }}>
            <View style={{ flex: 2 }}>
            </View>
            <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'space-between', padding: 8, flexDirection: 'row' }}>
              <View style={{ justifyContent: 'space-around' }}>
                <Text style={{ color: 'black' }}>DEADLIFT</Text>
                <View>
                  <Text style={{ fontSize: 8 }}>PERSONAL BEST</Text>
                  <Text style={{ fontSize: 8 }}>250 LBS</Text>
                </View>
              </View>
              <View style={{ justifyContent: 'center' }}>
                <View>
                  <Text style={{ fontSize: 8 }}>WARM-UP SETS   3</Text>
                  <Text style={{ fontSize: 8 }}>WORKING SETS   3</Text>
                  <Text style={{ fontSize: 8 }}>TOTAL REST  6 MIN</Text>
                </View>
              </View>
            </View>
          </Image>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
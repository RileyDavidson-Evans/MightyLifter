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
    const { height, width } = Dimensions.get('window');
    return (
      <TouchableWithoutFeedback
        onPress={this.logWorkout.bind(this)}>
        <View style={{ height: height * .3, margin: 15, backgroundColor: 'white', elevation: 5 }}>
          <Image style={{ resizeMode: 'stretch', height: height * .3 }} source={{ uri: 'http://www.muscletech.com/wp-content/uploads/article-thedeadlift.png' }}>
            <View style={{ flex: 1 }}>
              <View style={{ flex: 2 }}>
              </View>
              <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'space-between', padding: 8, flexDirection: 'row' }}>
                <View style={{ justifyContent: 'space-around' }}>
                  <Text style={{ color: 'black' }}>{this.props.data.text}</Text>
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
              <View style={{
                width: width * .92,
                height: height * .3,
                left: 0,
                top: 0,
                position: 'absolute',
                justifyContent: 'center',
              }}>
                <View style={{
                  flex: 1,
                  opacity: .7,
                  backgroundColor: 'black',
                  alignItems: 'center',
                  justifyContent: 'center'
                }} />
                <Image
                  style={{ height: 80, width: 80, opacity: 1, position: 'absolute', alignSelf: 'center' }}
                  source={{ uri: 'https://www.shareicon.net/data/2016/08/20/817722_check_395x512.png' }} />
              </View>
            </View>
          </Image>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
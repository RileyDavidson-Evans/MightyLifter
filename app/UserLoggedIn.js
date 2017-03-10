import React, { Component } from 'react';
var _ = require('lodash');
var moment = require('moment');
import {
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  ListView,
  Picker,
  Image
} from 'react-native';
import images from './Exports/Images';
import WorkoutListItemHistory from './Components/Workout/WorkoutListItemHistory';
import * as firebase from "firebase";
export default class UserLoggedIn extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const dateString = moment().format('MMMM Do YYYY');
    this.state = {
      message: '',
      text: '',
      dataSource: ds.cloneWithRows([]),
      dateString,
      dateArray: [dateString]
    };
  }

  formatFirebaseData(dateString = this.state.dateString, snapshot) {
    var text = snapshot.val();
    const now = moment().format('MMMM Do YYYY');
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    const dateArray = [];
    const dataSource = [];

    _.forEach(text, (dateKey, i) => {
      dateArray.push(i);
      if (i === dateString) {
        _.forEach(dateKey, (datedWorkout, key) => {
          datedWorkout.key = key;
          datedWorkout.parentKey = i;
          dataSource.push(datedWorkout);
        });
      }
    });

    if (_.indexOf(dateArray, now) === -1) {
      dateArray.push(now);
    }

    this.setState({
      dataSource: ds.cloneWithRows(dataSource.reverse()),
      dateArray,
      display: true
    });
  }

  getPosts(dateString) {
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('/user/' + userId).once('value').then((snapshot) => {
      this.formatFirebaseData(dateString, snapshot);
    });
  }

  componentDidMount() {
    this.getPosts();
    firebase.database().ref('/user/' + firebase.auth().currentUser.uid).on('value', this.formatFirebaseData.bind(this, undefined));
  }


  componentWillUnmount() {
    firebase.database().ref('/user/' + firebase.auth().currentUser.uid).off();
  }


  changeDate(dateString) {
    this.setState({
      dateString
    })
    this.getPosts(dateString);
  }

  goToLogPage() {
    this.props.navigator.push({
      id: 'ViewWorkouts',
    });
  }

  render() {
    const { width, height } = Dimensions.get('window');
    if (!this.state.display) {
      return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Image
          style={{height, resizeMode: 'cover', width}}
            source={images.Loading}
            />
        </View>
      );
    }
    return (
      <View style={{ justifyContent: 'space-between', alignItems: 'center', flex: 1, backgroundColor: 'white' }}>
        <View style={{ height: height * .1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 20 }}>
            {
              _.get(firebase.auth(), 'currentUser.email')
            }
          </Text>
        </View>
        <View style={{ flex: 1, width, justifyContent: 'center', alignItems: 'center' }}>
          <ListView
            enableEmptySections
            style={{ backgroundColor: 'white', width }}
            dataSource={this.state.dataSource}
            renderRow={(data) => {
              return (
                <WorkoutListItemHistory data={data} />
              )
            }
            }
          />
        </View>
        <View>
          <Picker selectedValue={this.state.dateString} onValueChange={this.changeDate.bind(this)}>
            {
              this.state.dateArray.map(date => {
                return (
                  <Picker.Item key={date} label={date} value={date} />
                )
              })
            }
          </Picker>
          <TouchableHighlight
            onPress={this.goToLogPage.bind(this)}>
            <View style={{ width, backgroundColor: 'blue', height: height * .1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'white', fontSize: 20 }}>Log More !</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
};
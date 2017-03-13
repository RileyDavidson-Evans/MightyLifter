import React, { Component } from 'react';
import WorkoutItem from './WorkoutListItem';
import {
  View,
  Dimensions,
  ListView
} from 'react-native';
export default class Workouts extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([
        {
          id: 'BenchPress',
          text: 'Bench Press',
        },
        {
          id: 'Squat',
          text: 'Squat'
        },
        {
          id: 'Pushup',
          text: 'Pushup',
          complete: true
        },
        {
          id: 'ShoulderPress',
          text: 'Shoulder Press',
          complete: true
        },
        {
          id: 'Curls',
          text: 'Bicept Curls',
          complete: true
        },
        {
          id: 'ChinUp',
          text: 'Chin Up',
          complete: true
        }
      ])
    };
  }
  render() {
    const { width } = Dimensions.get('window');
    return (
      <View style={{ flex: 1, backgroundColor: '#EEEEEE' }}>
        <View>
          <ListView
            style={{ backgroundColor: '#EEEEEE', width }}
            dataSource={this.state.dataSource}
            renderRow={(data) => {
              return (
                <WorkoutItem navigator={this.props.navigator} data={data} />
              );
            }}
          />
        </View>
      </View>
    );
  }
}
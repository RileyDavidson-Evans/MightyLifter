import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ListView,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
const SideMenu = require('react-native-side-menu');

export default class ChatHome extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChangted: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }
  componentDidMount() {
    this.getPosts();
  }
  getPosts() {
    return firebase.database().ref('/Chats').once('value').then((snapshot) => {
      console.log(snapshot.val());
    });
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text>Hello</Text>
      </View>
    );
  }
}
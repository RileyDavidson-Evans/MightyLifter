import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  ListView,
  Dimensions
} from 'react-native';
import _ from 'lodash';
import * as firebase from "firebase";

export default class ChatHome extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }
  componentDidMount() {
    this.getPosts();
  }
  componentWillUnmount() {
    firebase.database().ref('/Chats').off();
  }

  goToChat(chatName) {
    this.props.navigator[__DEV__ ? 'replace' : 'push']({
      id: 'SpecificChatPage',
      workoutId: null,
      chatName
    });
  }
  getPosts() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    firebase.database().ref('/Chats').on('value', (snapshot) => {
      const allChats = snapshot.val();
      let chatArray = [];
      _.forEach(_.keys(allChats), chat => {
        chatArray.push(chat);
      });
      this.setState({
        dataSource: ds.cloneWithRows(chatArray)
      });
    });
  }
  render() {
    const { width } = Dimensions.get('window');
    return (
      <View style={{ flex: 1, backgroundColor: '#9E9E9E' }}>
        <ListView
          enableEmptySections
          contentContainerStyle={{ backgroundColor: '#9E9E9E', width, alignItems: 'center' }}
          dataSource={this.state.dataSource}
          renderRow={(data) => {
            return (
              <View style={{ marginTop: 20 }}>
                <TouchableHighlight
                  underlayColor="#9E9E9E"
                  onPress={this.goToChat.bind(this, data)}>
                  <View style={{ width: width * .8, backgroundColor: 'blue', height: 30, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white' }}>{data}</Text>
                  </View>
                </TouchableHighlight>
              </View>
            );
          }
          }
        />
      </View>
    );
  }
}
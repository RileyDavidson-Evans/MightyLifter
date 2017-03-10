import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  Dimensions,
  TextInput,
  Button
} from 'react-native';
import _ from 'lodash';

export default class ChatHome extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([]),
      text: ''
    };
  }
  componentWillUnmount() {
    firebase.database().ref('Chats/' + this.props.chatName).off();
  }
  
  componentDidMount() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    console.log(this.props.chatName);
    firebase.database().ref('Chats/' + this.props.chatName).once('value').then((snapshot) => {
      let allChats = snapshot.val();
      allChats = _.sortBy(allChats, ['date']);
      let chatArray = [];
      _.forEach(allChats, chat => {
        chatArray.push(chat);
      });
      this.setState({
        dataSource: ds.cloneWithRows(chatArray)
      });
    });
    this.getPosts();
  }
  postChat() {
    var newPostKey = firebase.database().ref().child('Chats/' + this.props.chatName).push().key;
    firebase.database().ref(`Chats/${this.props.chatName}/${newPostKey}`).set({
      text: this.state.text,
      date: new Date().toString()
    });
  }
  getPosts() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    firebase.database().ref(`/Chats/${this.props.chatName}`).on('value', (snapshot) => {
      let allChats = snapshot.val();
      allChats = _.sortBy(allChats, ['date']);
      let chatArray = [];
      _.forEach(allChats, chat => {
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
      <View style={{ flex: 1, backgroundColor: 'grey' }}>
        <ListView
          ref="scrollView"
          enableEmptySections
          contentContainerStyle={{ backgroundColor: 'grey', width, alignItems: 'center' }}
          dataSource={this.state.dataSource}
          onContentSizeChange={() => this.refs.scrollView.scrollToEnd({ animated: true })}
          renderRow={({ text }) => {
            return (
              <View style={{ width: width * .8, backgroundColor: 'blue', height: 30, borderRadius: 5, justifyContent: 'center', alignItems: 'center', margin: 5 }}>
                <View>
                  <Text style={{ color: 'white' }}>{text}</Text>
                </View>
              </View>
            );
          }
          }
        />
        <View style={{ width, justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
          <TextInput style={{ width: width * .8 }} onChangeText={(text) => this.setState({ text })} />
          <View style={{ width: width * .9 }}>
            <Button style={{ width }} onPress={this.postChat.bind(this)} title="Post" />
          </View>
        </View>
      </View>
    );
  }
}
import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  Dimensions,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    firebase.database().ref('Chats/' + this.props.chatName).limitToLast(10).once('value').then((snapshot) => {
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
    if (!this.state.text) return;
    var newPostKey = firebase.database().ref().child('Chats/' + this.props.chatName).push().key;
    firebase.database().ref(`Chats/${this.props.chatName}/${newPostKey}`).set({
      text: this.state.text,
      date: new Date().toString(),
      displayName: firebase.auth().currentUser.displayName
    });
    this.setState({
      text: ''
    });
  }
  getPosts() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    firebase.database().ref(`/Chats/${this.props.chatName}`).limitToLast(10).on('value', (snapshot) => {
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
  checkForLoggedInUserPosts(postUserName, width) {
    const userName = firebase.auth().currentUser.displayName;
    const myPost = userName === postUserName;
    let styles = {
      view: {
        width: width * .7,
        elevation: 5,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
        alignItems: 'center',
        margin: 5,
        alignSelf: myPost ? 'flex-end' : 'flex-start'
      },
      text: { color: myPost ? 'white' : 'blue' },
      userName: {
        alignSelf: myPost ? 'flex-end' : 'flex-start',
        fontSize: 10,
        color: myPost ? 'white' : 'black'
      }
    };
    styles.view.backgroundColor = myPost ? 'blue' : 'white';
    return styles;
  }
  render() {
    const { width } = Dimensions.get('window');
    return (
      <View style={{ flex: 1, backgroundColor: '#9E9E9E' }}>
        <ListView
          ref="scrollView"
          enableEmptySections
          contentContainerStyle={{ backgroundColor: 'grey', width, alignItems: 'center', padding: 10 }}
          dataSource={this.state.dataSource}
          onContentSizeChange={() => this.refs.scrollView.scrollToEnd({ animated: true })}
          renderRow={({ text, displayName }) => {
            const styles = this.checkForLoggedInUserPosts(displayName, width);
            return (
              <View style={styles.view}>
                <View style={{ alignSelf: 'flex-start' }}>
                  <Text style={styles.text}>{text}</Text>
                </View>
                <View style={{ alignSelf: 'flex-end' }}>
                  <Text style={styles.userName}>{displayName}</Text>
                </View>
              </View>
            );
          }
          }
        />
        <View style={{ width, justifyContent: 'center', alignItems: 'center', marginBottom: 10, flexDirection: 'row' }}>
          <TextInput blurOnSubmit={false} value={this.state.text} onSubmitEditing={this.postChat.bind(this)} style={{ width: width * .8 }} onChangeText={(text) => this.setState({ text })} />
          <TouchableHighlight
          underlayColor="#9E9E9E"
          onPress={this.postChat.bind(this)}>
            <Icon name="paper-plane" size={24} color='black' />
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
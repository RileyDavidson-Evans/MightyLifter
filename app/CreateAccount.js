import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Button,
  Image,
  Navigator,
  TouchableHighlight,
  BackAndroid,
  AppState,
  Sidebar,
} from 'react-native';
import * as firebase from "firebase";

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: ' ',
      displayName: ''
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.props.navigator.pop();
      return true;
    });
  }

  async signup() {
    try {
      const newUser = await firebase.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
      alert("Account created");

      var user = await firebase.auth().currentUser;
      const { displayName } = this.state;

      user.updateProfile({
        displayName
      })

      this.props.navigator.push({
        id: 'HomePage'
      })
      // Navigate to the Home page, the user is auto logged in
    } catch (error) {
      this.setState({ message: error.toString() });
    }
  }

  async setemail() {
    var user = await firebase.auth().currentUser;
    const { displayName } = this.state;
    user.updateProfile({
      displayName
    }).then(function () {
      // Update successful.
      alert('updated')
    }, function (error) {
      alert('error')
      // An error happened.
    });
  }

  renderLogin(width) {
    return (
      <View>
        <TextInput placeholderTextColor="white" onChangeText={(displayName) => this.setState({ displayName })} value={this.state.displayName} placeholder="Username" />
        <TextInput keyboardType="email-address" onChangeText={(email) => { this.setState({ email }) }} value={this.state.email} placeholder="Email" style={{ width: width * .8, height: 50, color: 'white' }} placeholderTextColor="white" underlineColorAndroid="white" />
        <TextInput secureTextEntry onChangeText={(password) => { this.setState({ password }) }} value={this.state.password} placeholder="Password" style={{ width: width * .8, height: 50 }} placeholderTextColor="white" underlineColorAndroid="white" />
      </View>
    );
  }

  async login() {
    try {
      await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
      this.setState({ message: '', password: '' });
    } catch (error) {
      this.setState({ message: 'Invalid Email / Password combination!' });
    }
  }

  renderButton({ title, onPress, color }) {
    return (
      <View style={styles.button}>
        <Button style={styles.button} onPress={onPress.bind(this)} title={title} color={color} />
      </View>
    )
  }

  render() {
    const { width, height } = Dimensions.get('window');
    return (
      <View style={styles.container}>
        <Image
          style={
            {
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center'
            }
          }
          source={require('../images/gymNow.jpg')}>
          <View style={styles.container}>
            <View style={{ width, justifyContent: 'center', alignItems: 'center', paddingTop: width * .1 }}>
              <Text style={{ color: 'white', fontSize: 40, padding: 20, }}>Create Account!</Text>
            </View>
            <View style={styles.loginContainer}>
              {
                this.renderLogin(width)
              }
              <Text>
                {this.state.message}
              </Text>
            </View>
            <View style={{ width }}>
              {
                this.renderButton({ title: 'Create Account', color: 'green', onPress: this.signup })
              }
            </View>
          </View>
        </Image>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 5
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(52,52,52,.7)'
  },
  loginContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 15,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
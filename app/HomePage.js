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
      loggedInUser: false,
      userName: '',
      password: '',
      message: ' ',
    }
  }

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.props.navigator.pop();
      return true;
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          loggedInUser: true
        })
      } else {
        this.setState({
          loggedInUser: false
        })
      }
    });
    this.checkForUser();
  }

  async checkForUser() {
    try {
      const user = firebase.auth().currentUser;
      this.setState({
        loggedInUser: user,
        initialLoading: true
      })
    } catch(error) {
      console.log({error});
    }
  }

  async signup() {
    try {
      const newUser = await firebase.auth()
        .createUserWithEmailAndPassword(this.state.userName, this.state.password);

      alert("Account created");

      // Navigate to the Home page, the user is auto logged in

    } catch (error) {
      this.setState({ message: error.toString() });
    }

  }

  renderLogin(width) {
    if (this.checkForLoggedInUser()) {
      return (
        <View>
          <Text style={{ color: 'white' }}>Logged in @ {firebase.auth().currentUser.email}</Text>
        </View>
      )
    } else {
      return (
        <View>
          <TextInput keyboardType="email-address" onChangeText={(userName) => { this.setState({ userName }) }} value={this.state.userName} placeholder="Username" style={{ width: width * .8, height: 50, color: 'white' }} placeholderTextColor="white" underlineColorAndroid="white" />
          <TextInput secureTextEntry onChangeText={(password) => { this.setState({ password }) }} value={this.state.password} placeholder="Password" style={{ width: width * .8, height: 50 }} placeholderTextColor="white" underlineColorAndroid="white" />
        </View>
      );
    }
  }

  async login() {
    try {
      await firebase.auth().signInWithEmailAndPassword(this.state.userName, this.state.password);
      this.setState({ message: '', password: '' });
    } catch (error) {
      this.setState({ message: 'Invalid Email / Password combination!' });
    }

  }

  goToHistory() {
    if (this.checkForLoggedInUser) {
      this.props.navigator.replace({
        id: 'UserLoggedIn',
      });
    }
  }

  checkForLoggedInUser() {
    return !!firebase.auth().currentUser;
  }

  logout() {
    firebase.auth().signOut();
  }

  goToWorkout() {
    this.props.navigator.replace({
      id: 'ViewWorkouts',
    });
  }

  goToProfile() {

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
    if (!this.state.initialLoading) {
      return null;
    }
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
              <Text style={{ color: 'white', fontSize: 60, padding: 20, }}>Welcome!</Text>
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
                this.state.loggedInUser &&
                this.renderButton({ title: 'Workouts', color: 'grey', onPress: this.goToWorkout })
              }
              {
                !this.state.loggedInUser &&
                this.renderButton({ title: 'Login', onPress: this.login })
              }
              {
                !this.state.loggedInUser &&
                this.renderButton({ title: 'Create Account', color: 'green', onPress: this.signup })
              }
              {
                this.state.loggedInUser &&
                this.renderButton({ title: 'Logout', color: 'red', onPress: this.logout })
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
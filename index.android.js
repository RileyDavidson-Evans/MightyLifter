import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Image
} from 'react-native';
import * as firebase from 'firebase';
import AppContainer from './app/Components/AppContainer';
import firebaseConfig from './firebaseConfig';

export default class MightyLifter extends Component {
  constructor(props) {
    super(props);
    const { apiKey, authDomain, databaseURL, storageBucket, messagingSenderId } = firebaseConfig;
    
    global.firebase = firebase.initializeApp({
      apiKey,
      authDomain,
      databaseURL,
      storageBucket,
      messagingSenderId,
    });
    this.state = {
      initialLoad: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        initialLoad: false
      });
    }, 1000);
  }

  render() {
    if (this.state.initialLoad) {
      return (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image
            style={
              {
                flex: 1,
                resizeMode: 'cover'
              }
            }
            source={require('./images/gifs/splash.gif')} />
        </View>
      );
    }

    return (
      <AppContainer />
    );
  }
}

AppRegistry.registerComponent('MightyLifter', () => MightyLifter);

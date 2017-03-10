import React, { Component } from 'react';
import HomePage from '../HomePage';
import CreateAccount from '../CreateAccount';
import UserLoggedIn from '../UserLoggedIn';
import Workouts from '../Components/Workout/Workouts';
import LogWorkout from '../Components/Workout/LogWorkout';
import ChatHome from '../Components/Chat/ChatHome';
import SpecificChatPage from '../Components/Chat/SpecificChatPage';
import {
  View,
  Navigator,
  Text,
  TouchableHighlight,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as firebase from "firebase";
const SideMenu = require('react-native-side-menu');

class Menu extends React.Component {
  renderTile({ text, icon, iconColor, color, goToPageId }) {
    return (
      <TouchableHighlight
        key={text}
        onPress={() => {
          this.props.toggleSideMenuClose();
          this.props.navigator[__DEV__ ? 'replace' : 'push']({ id: goToPageId });
        }}>
        <View style={{ margin: 5, backgroundColor: color, padding: 5, justifyContent: 'center', alignItems: 'center', borderRadius: 10, flexDirection: 'row', elevation: 5 }}>
          <Icon name={icon} size={20} color={iconColor} />
        </View>
      </TouchableHighlight>
    );
  }
  renderNavBody() {
    const items = [
      {
        text: 'Home',
        icon: 'home',
        iconColor: 'white',
        goToPageId: 'HomePage',
        color: 'black'
      },
      {
        text: 'History',
        icon: 'history',
        iconColor: 'white',
        goToPageId: 'UserLoggedIn',
        color: 'green'
      }
    ];
    return (
      <View style={{ flex: 1 }}>
        {
          items.map((item) => {
            return (
              this.renderTile(item)
            );
          })
        }
      </View>
    );
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: '#8aacb8' }}>
        <View style={{ alignSelf: 'center', paddingTop: 75, elevation: 5 }}>
          <Icon name="user-circle" size={150} color='white' />
        </View>
        {
          this.renderNavBody()
        }
        <View>
          <Text>@Riley Davidson</Text>
        </View>
      </View>
    );
  }
}

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      activeRoute: 'HomePage'
    };
  }

  componentDidMount() {
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
    } catch (error) {
      console.log({ error });
    }
  }

  toggleSideMenu() {
    this.setState({
      isOpen: true
    });
  }

  toggleSideMenuClose() {
    this.setState({
      isOpen: false
    });
  }

  closeSideNav(isOpen) {
    if (!isOpen) {
      this.setState({
        isOpen
      });
    }
  }
  jumpToScene(navigator, id) {
    if (id === this.state.activeRoute) return;
    this.setState({
      activeRoute: id
    });
    this.refs.navigator[__DEV__ ? 'replace' : 'push']({
      id
    });
  }
  renderScene(route, navigator) {
    const { id, workoutId, chatName } = route;
    const menu = <Menu navigator={navigator} toggleSideMenuClose={this.toggleSideMenuClose.bind(this)} />;
    return (
      <SideMenu onChange={this.closeSideNav.bind(this)} menu={menu} disableGestures menuPosition='right' isOpen={this.state.isOpen}>
        <View style={{ marginTop: this.state.loggedInUser ? 56 : 0, flex: 1 }}>
          {
            this.renderSpecificScene(navigator, id, { workoutId, chatName })
          }
        </View>
      </SideMenu>
    );
  }
  renderSpecificScene(navigator, id, { workoutId, chatName }) {

    switch (id) {
      case 'HomePage':
        return (
          <HomePage toggleSideMenu={this.toggleSideMenu.bind(this)} navigator={navigator} />
        );
      case 'CreateAccount':
        return (
          <CreateAccount toggleSideMenu={this.toggleSideMenu.bind(this)} navigator={navigator} />
        );
      case 'UserLoggedIn':
        return (
          <UserLoggedIn toggleSideMenu={this.toggleSideMenu.bind(this)} navigator={navigator} />
        );
      case 'ViewWorkouts':
        return (
          <Workouts toggleSideMenu={this.toggleSideMenu.bind(this)} navigator={navigator} />
        );
      case 'LogWorkout':
        return (
          <LogWorkout toggleSideMenu={this.toggleSideMenu.bind(this)} navigator={navigator} workoutId={workoutId} />
        );
      case 'ChatHome':
        return (
          <ChatHome toggleSideMenu={this.toggleSideMenu.bind(this)} navigator={navigator} />
        );
      case 'SpecificChatPage':
        return (
          <SpecificChatPage toggleSideMenu={this.toggleSideMenu.bind(this)} navigator={navigator} chatName={chatName} />
        );
      default:
        return (
          <HomePage toggleSideMenu={this.toggleSideMenu.bind(this)} navigator={navigator} />
        );
    }

  }

  renderNavItem(iconName, onPress) {
    return (
      <TouchableHighlight
        onPress={onPress}>
        <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <Icon name={iconName} size={20} color='white' />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const { width, height } = Dimensions.get('window');
    const bottomNavBar = [
      { routeId: 'HomePage', icon: 'home' },
      { routeId: 'ViewWorkouts', icon: 'arrow-circle-up' },
      { routeId: 'ChatHome', icon: 'comments' },
      { routeId: 'UserLoggedIn', icon: 'history' }
    ];
    return (
      <View style={{ flex: 1, height }}>
        <Navigator
          initialRoute={{ id: 'HomePage', name: 'HomePage' }}
          renderScene={this.renderScene.bind(this)}
          ref="navigator"
          navigationBar={
            this.state.loggedInUser &&
            <Navigator.NavigationBar
              routeMapper={{
                LeftButton: (route, navigator, index, navState) =>
                { return (this.renderNavItem('arrow-left', navigator.pop)); },
                RightButton: (route, navigator, index, navState) =>
                { return (this.state.loggedInUser && this.renderNavItem('bars', this.toggleSideMenu.bind(this))); },
                Title: (route, navigator, index, navState) =>
                { return <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center'}}><Text style={{color: 'white'}}>{route.chatName}</Text></View>; },
              }}
              style={{ backgroundColor: 'black' }}
            />
          }
        />
        {
          this.state.loggedInUser &&
          <View style={{ height: 40, backgroundColor: 'black', flexDirection: 'row', justifyContent: 'space-around' }}>
            {
              bottomNavBar.map(({ icon, routeId }) => {
                const color = this.state.activeRoute === routeId ? 'green' : 'white';
                return (
                  <TouchableHighlight
                    onPress={this.jumpToScene.bind(this, navigator, routeId)}
                    underlayColor="#9E9E9E"
                    key={icon}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: 50 }}>
                      <Icon name={icon} size={24} color={color} />
                    </View>
                  </TouchableHighlight>
                );
              })
            }
          </View>
        }
      </View>
    );
  }
}
import React, {Component} from 'react';
import {View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './Navigators/MainNavigator';
export default class componentName extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    return (
      <View>
        <Navigation />
      </View>
    );
  }
}

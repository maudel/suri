import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

// :fire: this is v good, @xavier-villelegier
import LoginScreen3 from './login/screen3';

// @monte9
import LoginScreen1 from './login/screen1';

// TODO
import LoginScreen2 from './login/screen2';
import LoginScreen4 from './login/screen4';

import CameraScreen from './camera';

export default class Login extends Component {
  render() {
    console.log('Login Screen Container', this.props);
    return (
      <View style={styles.container}>
        <ScrollView horizontal pagingEnabled decelerationRate={0.993}>
          {/* <CameraScreen /> */}
          <LoginScreen2 {...this.props.navigation} />
          <LoginScreen1 {...this.props.navigation} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

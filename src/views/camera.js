import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

// :fire: this is v good, @xavier-villelegier
import { default as CameraScreen } from './camera/screen';
import { default as CameraRecord } from './camera/cameraRecord';

export default class CameraView extends Component {
  render() {
    console.log('Camera Screen Container', this.props);
    return (
      <View style={styles.container}>
        <ScrollView horizontal pagingEnabled decelerationRate={0.993}>
          <CameraRecord {...this.props} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

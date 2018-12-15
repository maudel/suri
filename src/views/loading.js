import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

// :fire: this is v good, @xavier-villelegier
import { default as LoadingScreen } from './loading/screen';

export default class LoadingView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ScrollView horizontal pagingEnabled decelerationRate={0.993}>
          <LoadingScreen {...this.props} />
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

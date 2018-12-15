import React, { Component } from 'react';
import {
  Alert,
  ActivityIndicator,
  StyleSheet,
  View,
  Dimensions,
  Text,
} from 'react-native';

export default class LoadingScreen extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Components');
    }, 5000);
  }
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />

        <Text style={styles.inputStyle}>
          1. Enviando los datos de registro. subida.
        </Text>
        <Text style={styles.inputStyle}>2. Verificando la imagen</Text>
        <Text style={styles.inputStyle}>3. Generando Token de autencidad.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#1B2D3A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    color: 'white',
    fontFamily: 'light',
    fontSize: 15,
    alignItems: 'center',
    textAlign: 'center',
  },
});

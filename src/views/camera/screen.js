import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  TouchableOpacity,
  Image,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import { Button } from 'react-native-elements';

import { Camera, Permissions } from 'expo';

export default class CameraScreen extends React.Component {
  state = {
    switchValue: true,
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    imageuri: '',
    url: '',
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  cameraChange = () => {
    this.setState({
      imageuri: '',
      url: '',
      type: Camera.Constants.Type.front,
    });
  };

  snap = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      let photo = await this.camera.takePictureAsync(options);
      if (photo) {
        this.setState({ imageuri: photo.uri, picture: photo });
      }
    }
  };

  upload = async () => {
    console.log('Imagen', this.state);
    try {
      let username = await AsyncStorage.getItem('username');
      console.log('username', username);
      AsyncStorage.setItem('picture', this.state.picture.base64);
      this.props.navigation.navigate('Loading', {
        description: 'esto sera una prueba',
      });
    } catch (error) {
      console.log('esto es un error', error);
    }
  };

  render() {
    const { navigation } = this.props;
    const username = navigation.getParam('username', 'guess');
    const email = navigation.getParam('email', 'email');

    console.log('Paso 2. Registro de rostro: username', username);
    console.log('Paso 2. Registro de rostro: email', email);
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return (
        <View>
          <Text>No access to camera</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.switchview}>
            <Text>Activar</Text>
            <Switch
              onValueChange={value => {
                this.setState({ switchValue: value });
              }}
              value={this.state.switchValue}
              style={styles.switch}
            />
          </View>
          {this.state.switchValue ? (
            <View style={styles.cameraview}>
              {this.state.imageuri != '' ? (
                <Image
                  source={{
                    uri: this.state.imageuri,
                  }}
                  style={styles.uploadedImage}
                  resizeMode="contain"
                />
              ) : (
                <Camera
                  style={styles.camera}
                  type={this.state.type}
                  ref={ref => {
                    this.camera = ref;
                  }}
                />
              )}
            </View>
          ) : (
            <View style={styles.cameraview}>
              {this.state.url != '' ? (
                <Text>Uploaded url : {this.state.url}</Text>
              ) : null}
              <Text>Camara desactivada!!</Text>
            </View>
          )}

          {this.state.switchValue ? (
            <View style={styles.buttonsView}>
              {this.state.imageuri == '' ? (
                <View style={styles.captureButtonView}>
                  <Button
                    title="Sacar Foto"
                    containerStyle={{ flex: -1 }}
                    buttonStyle={styles.signUpButton}
                    linearGradientProps={{
                      colors: ['#FF9800', '#F44336'],
                      start: [1, 0],
                      end: [0.2, 0],
                    }}
                    titleStyle={styles.signUpButtonText}
                    onPress={this.snap}
                  />
                </View>
              ) : null}
              <View style={styles.captureButtonView}>
                <Button
                  title="Registrar Foto"
                  containerStyle={{ flex: -1 }}
                  buttonStyle={styles.signUpButton}
                  linearGradientProps={{
                    colors: ['#FF9800', '#F44336'],
                    start: [1, 0],
                    end: [0.2, 0],
                  }}
                  titleStyle={styles.signUpButtonText}
                  onPress={this.upload}
                />
              </View>
            </View>
          ) : null}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#1B2D3A',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  switchview: {
    marginTop: 50,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 5,
  },
  switch: {
    padding: 5,
  },
  cameraview: {
    height: 400,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    height: '95%',
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camerabuttonview: {
    height: '100%',
    backgroundColor: 'transparent',
  },
  cameraButtons: {
    borderColor: '#fff',
    borderWidth: 2,
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  captureButtonView: {
    height: 200,
  },
  buttonsView: {
    height: 200,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  uploadedImage: {
    height: '90%',
    width: '90%',
    padding: 10,
  },

  signUpButtonText: {
    fontFamily: 'bold',
    fontSize: 13,
  },
  signUpButton: {
    width: 100,
    borderRadius: 50,
    height: 45,
  },
});

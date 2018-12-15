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
import { Camera, Permissions } from 'expo';
// import { RNS3 } from 'react-native-aws3';

export default class CameraScreen extends React.Component {
  state = {
    switchValue: false,
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
      this.props.navigate('Login');
    } catch (error) {
      console.log('esto es un error', error);
    }

    // const file = {
    //   uri: this.state.imageuri,
    //   name: `${new Date().getTime()}.jpg`,
    //   type: 'image/jpeg',
    // };
    // const options = {
    //   keyPrefix: 'ts/',
    //   bucket: '..name..',
    //   region: 'eu-west-1',
    //   accessKey: '..acesskey..',
    //   secretKey: '..secretkey..',
    //   successActionStatus: 201,
    // };
    // return RNS3.put(file, options)
    //   .then(response => {
    //     if (response.status !== 201)
    //       throw new Error('Failed to upload image to S3');
    //     else {
    //       console.log(
    //         'Successfully uploaded image to s3. s3 bucket url: ',
    //         response.body.postResponse.location
    //       );
    //       this.setState({
    //         url: response.body.postResponse.location,
    //         switchValue: false,
    //       });
    //     }
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
  };

  render() {
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
                  <TouchableOpacity
                    style={styles.cameraButtons}
                    onPress={this.snap}
                  >
                    <Text
                      style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
                    >
                      Sacar Foto
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              <View style={styles.captureButtonView}>
                <TouchableOpacity
                  style={styles.cameraButtons}
                  onPress={this.upload}
                >
                  <Text
                    style={{ fontSize: 18, marginBottom: 10, color: 'white' }}
                  >
                    Subir Foto
                  </Text>
                </TouchableOpacity>
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
});

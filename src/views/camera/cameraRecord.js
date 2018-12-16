import { Constants, Camera, FileSystem, Permissions } from 'expo';
import React from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Vibration,
  CameraRoll,
  Alert,
  Dimensions,
} from 'react-native';
function toDataUrl(url, callback) {
  console.log('getUrlTobBase');
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}
export default class CameraRecord extends React.Component {
  state = {
    flash: 'off',
    zoom: 0,
    autoFocus: 'on',
    depth: 0,
    type: 'front',
    whiteBalance: 'auto',
    ratio: '16:9',
    videos: [],
    pictures: [],
    photoId: 1,
    recordingId: 1,
    permissionsGranted: false,
  };

  async componentWillMount() {
    const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
    const audioPermission = await Permissions.askAsync(
      Permissions.AUDIO_RECORDING
    );
    const photoStatus = cameraPermission.status;
    const videoStatus = audioPermission.status;
    this.setState({
      permissionsGranted:
        photoStatus === 'granted' && videoStatus === 'granted',
    });
  }

  toggleFacing() {
    this.setState({
      type: this.state.type === 'back' ? 'front' : 'back',
    });
  }

  startRecording = async function() {
    let recordingConfig = {
      quality: Camera.Constants.VideoQuality['720p'],
      maxDuration: 120 * 60,
    };

    if (this.camera) {
      this.camera.recordAsync(recordingConfig).then(async data => {
        Alert.alert('Grabacion recuperada');
        console.log(data.uri);
        Vibration.vibrate();
        let saveResult = await CameraRoll.saveToCameraRoll(data.uri);
        this.state.videos.push({
          uri: data.uri,
          fs: `${FileSystem.documentDirectory}videos/Video_${
            this.state.recordingId
          }.mov`,
          rollUri: saveResult,
        });
        this.state.recordingId = this.state.recordingId + 1;
      });
    }
  };
  takePicture = async function() {
    
    if (this.camera) {
      this.camera.takePictureAsync().then(async data => {
        Alert.alert('Foto recuperada');
        console.log(data.uri);
        Vibration.vibrate();
        let saveResult = await CameraRoll.saveToCameraRoll(data.uri);

        if (saveResult) {
          const url = this.props.navigation.getParam('url', 'S/D V');
          toDataUrl(data.uri, function(myBase64) {
            console.log('TENGO LA BASE 64 DE LA IMAGEN');
            console.log('TENGO LA BASE 64 DE LA IMAGEN'); // myBase64 is the base64 string
            axios
              .post('http://192.168.11.135:8080/files', {
                base: 'myBase64',
              })
              .then(response => {
                console.log('response PETICION FLASK', response);
                // this.props.navigation.goBack();
              })
              .catch(error => {
                // console.log('error PETICION FLASK', Object.keys(error));

                console.log('columns', error.config);
                console.log('columns', error.response);
                // this.props.navigation.goBack();
              });
          });

          if (url != 'S/D V') {
            this.props.navigation.navigate(url);
          } else {
            this.props.navigation.goBack();
          }
        }
      });
    }
  };
  stopRecording() {
    if (this.camera) {
      this.camera.stopRecording();
    }
  }

  renderNoPermissions() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
        }}
      >
        <Text style={{ color: 'white' }}>
          No tiene permisos para acceder a la camara.
        </Text>
      </View>
    );
  }

  renderCamera() {
    const { navigation } = this.props;
    const camera = navigation.getParam('camera', 'S/D C');
    const video = navigation.getParam('video', 'S/D V');
    return (
      <Camera
        ref={ref => {
          this.camera = ref;
        }}
        style={{
          flex: 1,
        }}
        type={this.state.type}
        flashMode={this.state.flash}
        autoFocus={this.state.autoFocus}
        zoom={this.state.zoom}
        whiteBalance={this.state.whiteBalance}
        ratio={this.state.ratio}
        focusDepth={this.state.depth}
        captureAudio={true}
      >
        <View
          style={{
            flex: 0.5,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingTop: Constants.statusBarHeight / 2,
          }}
        >
          <View>
            {video ? (
              <View>
                <TouchableOpacity
                  style={[styles.flipButton]}
                  onPress={this.startRecording.bind(this)}
                >
                  <Text style={styles.flipText}> Gravar </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.flipButton}
                  onPress={this.toggleFacing.bind(this)}
                >
                  <Text style={styles.flipText}> Cambiar Camara </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.flipButton]}
                  onPress={this.stopRecording.bind(this)}
                >
                  <Text style={styles.flipText}> Detener </Text>
                </TouchableOpacity>
              </View>
            ) : null}

            {camera ? (
              <TouchableOpacity
                style={[styles.flipButton]}
                onPress={this.takePicture.bind(this)}
              >
                <Text style={styles.flipText}> Tomar una foto </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </Camera>
    );
  }

  render() {
    const cameraScreenContent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions();
    return <View style={styles.container}>{cameraScreenContent}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    backgroundColor: '#000',
  },
  flipButton: {
    flex: 0.3,
    height: 40,
    marginHorizontal: 2,
    marginBottom: 10,
    marginTop: 20,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipText: {
    color: 'white',
    fontSize: 15,
  },
});

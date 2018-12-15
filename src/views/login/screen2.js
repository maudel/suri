import React, { Component } from 'react';
import {
  Alert,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  Image,
  UIManager,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  AsyncStorage,
} from 'react-native';
import { Font } from 'expo';
import { Input, Button } from 'react-native-elements';
import { TabNavigator, StackNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/SimpleLineIcons';

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const USER_COOL = require('../../../assets/images/user-cool.png');
const USER_STUDENT = require('../../../assets/images/user-student.png');
const USER_HP = require('../../../assets/images/user-hp.png');

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class LoginScreen3 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      selectedType: null,
      fontLoaded: false,
      username: '',
      email: '',
      password: '',
      confirmationPassword: '',
      emailValid: true,
      passwordValid: true,
      usernameValid: true,
      confirmationPasswordValid: true,
      picture: '',
    };

    this.setSelectedType = this.setSelectedType.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateConfirmationPassword = this.validateConfirmationPassword.bind(
      this
    );
    this.signup = this.signup.bind(this);
  }
  async componentWillMount() {
    console.log('Esto es un ComponentWillMount');
    let picture = await AsyncStorage.getItem('picture');
    let username = await AsyncStorage.getItem('username');
    let email = await AsyncStorage.getItem('email');
    let password = (confirmationPassword = await AsyncStorage.getItem(
      'password'
    ));
    this.setState({
      picture: 'data:image/jpeg;base64,' + picture,
      username: username,
      email: email,
      password: password,
      confirmationPassword: confirmationPassword,
    });
  }
  async componentDidMount() {
    await Font.loadAsync({
      light: require('../../../assets/fonts/Ubuntu-Light.ttf'),
      bold: require('../../../assets/fonts/Ubuntu-Bold.ttf'),
      lightitalic: require('../../../assets/fonts/Ubuntu-Light-Italic.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  signup() {
    LayoutAnimation.easeInEaseOut();
    if (this.state.picture) {
      const usernameValid = this.validateUsername();
      const emailValid = this.validateEmail();
      const passwordValid = this.validatePassword();
      const confirmationPasswordValid = this.validateConfirmationPassword();
      if (
        emailValid &&
        passwordValid &&
        confirmationPasswordValid &&
        usernameValid
      ) {
        LayoutAnimation.easeInEaseOut();
        console.log('Estado=====>', this.state);
        this.props.navigate('Components');
        // Alert.alert('REGISTRANDO LOS DATOS');
      }
    } else {
      AsyncStorage.setItem('username', this.state.username);
      AsyncStorage.setItem('email', this.state.email);
      AsyncStorage.setItem('password', this.state.password);
      this.props.navigate('Camera');
    }
  }

  validateUsername() {
    const { username } = this.state;
    const usernameValid = username.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ usernameValid });
    usernameValid || this.usernameInput.shake();
    return usernameValid;
  }

  validateEmail() {
    const { email } = this.state;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    LayoutAnimation.easeInEaseOut();
    this.setState({ emailValid });
    emailValid || this.emailInput.shake();
    return emailValid;
  }

  validatePassword() {
    const { password } = this.state;
    const passwordValid = password.length >= 8;
    LayoutAnimation.easeInEaseOut();
    this.setState({ passwordValid });
    passwordValid || this.passwordInput.shake();
    return passwordValid;
  }

  validateConfirmationPassword() {
    const { password, confirmationPassword } = this.state;
    const confirmationPasswordValid = password === confirmationPassword;
    LayoutAnimation.easeInEaseOut();
    this.setState({ confirmationPasswordValid });
    confirmationPasswordValid || this.confirmationPasswordInput.shake();
    return confirmationPasswordValid;
  }

  setSelectedType = selectedType =>
    LayoutAnimation.easeInEaseOut() || this.setState({ selectedType });

  render() {
    const {
      isLoading,
      selectedType,
      fontLoaded,
      confirmationPassword,
      email,
      emailValid,
      password,
      passwordValid,
      confirmationPasswordValid,
      username,
      usernameValid,
    } = this.state;

    return !fontLoaded ? (
      <Text> Loading... </Text>
    ) : (
      <ScrollView
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.container}
      >
        <KeyboardAvoidingView
          behavior="position"
          contentContainerStyle={styles.formContainer}
        >
          <Text style={styles.signUpText}>Registro</Text>
          <Text style={styles.whoAreYouText}>¿ Quien eres ?</Text>

          <View style={styles.userTypesContainer}>
            <UserTypeItem
              label="CIUDADANO"
              labelColor="#ECC841"
              image={USER_COOL}
              onPress={() => this.setSelectedType('parent')}
              selected={selectedType === 'parent'}
            />
            {/* <UserTypeItem
              label="MI FOTO"
              labelColor="#ECC841"
              image={{ uri: this.state.picture }}
              onPress={() => this.setSelectedType('parent')}
              selected={selectedType === 'parent'}
            /> */}
            <UserTypeItem
              label="OFICIAL DE POLICIA"
              labelColor="#2CA75E"
              image={USER_STUDENT}
              onPress={() => this.setSelectedType('child')}
              selected={selectedType === 'child'}
            />
          </View>
          <View style={{ width: '80%', alignItems: 'center' }}>
            <FormInput
              refInput={input => (this.usernameInput = input)}
              icon="user"
              value={username}
              onChangeText={username => this.setState({ username })}
              placeholder="Usuario"
              returnKeyType="next"
              errorMessage={
                usernameValid ? null : 'Usuario no puede estar vacio.'
              }
              onSubmitEditing={() => {
                this.validateUsername();
                this.emailInput.focus();
              }}
            />
            <FormInput
              refInput={input => (this.emailInput = input)}
              icon="envelope"
              value={email}
              onChangeText={email => this.setState({ email })}
              placeholder="Correo electronico"
              keyboardType="email-address"
              returnKeyType="next"
              errorMessage={
                emailValid ? null : 'Correo electronico tiene que ser valido.'
              }
              onSubmitEditing={() => {
                this.validateEmail();
                this.passwordInput.focus();
              }}
            />
            <FormInput
              refInput={input => (this.passwordInput = input)}
              icon="lock"
              value={password}
              onChangeText={password => this.setState({ password })}
              placeholder="Password"
              secureTextEntry
              returnKeyType="next"
              errorMessage={
                passwordValid
                  ? null
                  : 'Introduzca una cadena con 8 caracteres minimo'
              }
              onSubmitEditing={() => {
                this.validatePassword();
                this.confirmationPasswordInput.focus();
              }}
            />
            <FormInput
              refInput={input => (this.confirmationPasswordInput = input)}
              icon="lock"
              value={confirmationPassword}
              onChangeText={confirmationPassword =>
                this.setState({ confirmationPassword })
              }
              placeholder="Confirmando Password"
              secureTextEntry
              errorMessage={
                confirmationPasswordValid ? null : 'No son iguales, verifique'
              }
              returnKeyType="go"
              onSubmitEditing={() => {
                this.validateConfirmationPassword();
                this.signup();
              }}
            />
          </View>
          <Button
            loading={isLoading}
            title="Registrar"
            containerStyle={{ flex: -1 }}
            buttonStyle={styles.signUpButton}
            linearGradientProps={{
              colors: ['#FF9800', '#F44336'],
              start: [1, 0],
              end: [0.2, 0],
            }}
            titleStyle={styles.signUpButtonText}
            onPress={this.signup}
            disabled={isLoading}
          />
        </KeyboardAvoidingView>
        <View style={styles.loginHereContainer}>
          <Text style={styles.alreadyAccountText}>Ya tiene una cuenta.</Text>
          <Button
            title="Inicie sesion aqui"
            titleStyle={styles.loginHereText}
            containerStyle={{ flex: -1 }}
            buttonStyle={{ backgroundColor: 'transparent' }}
            underlayColor="transparent"
            onPress={() => this.props.navigate('Components')}
          />
        </View>
      </ScrollView>
    );
  }
}

export const UserTypeItem = props => {
  const { image, label, labelColor, selected, ...attributes } = props;
  return (
    <TouchableOpacity {...attributes}>
      <View
        style={[
          styles.userTypeItemContainer,
          selected && styles.userTypeItemContainerSelected,
        ]}
      >
        <Text style={[styles.userTypeLabel, { color: labelColor }]}>
          {label}
        </Text>
        <Image
          source={image}
          style={[
            styles.userTypeMugshot,
            selected && styles.userTypeMugshotSelected,
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

export const FormInput = props => {
  const { icon, refInput, ...otherProps } = props;
  return (
    <Input
      {...otherProps}
      ref={refInput}
      inputContainerStyle={styles.inputContainer}
      leftIcon={<Icon name={icon} color="#7384B4" size={18} />}
      inputStyle={styles.inputStyle}
      autoFocus={false}
      autoCapitalize="none"
      keyboardAppearance="dark"
      errorStyle={styles.errorInputStyle}
      autoCorrect={false}
      blurOnSubmit={false}
      placeholderTextColor="#7384B4"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: '#293046',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  signUpText: {
    color: 'white',
    fontSize: 28,
    fontFamily: 'light',
  },
  whoAreYouText: {
    color: '#7384B4',
    fontFamily: 'bold',
    fontSize: 14,
  },
  userTypesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: SCREEN_WIDTH,
    alignItems: 'center',
  },
  userTypeItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  userTypeItemContainerSelected: {
    opacity: 1,
  },
  userTypeMugshot: {
    margin: 4,
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  userTypeMugshotSelected: {
    height: 100,
    width: 100,
  },
  userTypeLabel: {
    color: 'yellow',
    fontFamily: 'bold',
    fontSize: 11,
  },
  inputContainer: {
    paddingLeft: 8,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'rgba(110, 120, 170, 1)',
    height: 45,
    marginVertical: 10,
  },
  inputStyle: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
    fontFamily: 'light',
    fontSize: 16,
  },
  errorInputStyle: {
    marginTop: 0,
    textAlign: 'center',
    color: '#F44336',
  },
  signUpButtonText: {
    fontFamily: 'bold',
    fontSize: 13,
  },
  signUpButton: {
    width: 250,
    borderRadius: 50,
    height: 45,
  },
  loginHereContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alreadyAccountText: {
    fontFamily: 'lightitalic',
    fontSize: 12,
    color: 'white',
  },
  loginHereText: {
    color: '#FF9800',
    fontFamily: 'lightitalic',
    fontSize: 12,
  },
});

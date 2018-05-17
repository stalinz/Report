import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Text,
  Easing,
  Alert,
} from 'react-native';

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

import usernameImg from '../images/username.png';
import passwordImg from '../images/password.png';
import eyeImg from '../images/eye_black.png';


import { Actions, ActionConst } from 'react-native-router-flux';
import { StackNavigator } from "react-navigation";
import spinner from '../images/loading.gif';
import ReportScreen from './ReportScreen';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

import { ErrorMessage } from '../Constants/errorMessage';
import { userService } from '../Services/user.services';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      showPass: true,
      press: false,
      isLoading: false,
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);

    this.showPass = this.showPass.bind(this);
  }

  componentDidMount() {
    userService.checkAuthen()
    .then((response)=> {
        const code = response.AccountID;
        if (code <=0) {
          // return;
        }
        else{
          this.props.navigation.navigate('ReportScreen');
        }
    });
}

  showPass() {
    this.state.press === false
      ? this.setState({ showPass: false, press: true })
      : this.setState({ showPass: true, press: false });
  }

  _onPress = () => {
    if (this.state.isLoading) return;
    this.setState({ isLoading: true });
    const { username, password } = this.state;
    const { navigation } = this.props;
    setTimeout(() => {
      //userService.Authen(username, password)
      userService.Authen('mrxu', '1')
      .then((response)=> {
        // const code = response.ResponseStatus;
         this.setState({ isLoading: false });
        // if (code < 0) {
        //   this._showError(code);
        //   return;
        // }
        Keyboard.dismiss();
        navigation.navigate('ReportScreen');
        this.buttonAnimated.setValue(0);
        this.growAnimated.setValue(0);
      });
    }, 1000);
  }
  _showError = (code) => {
    const text = ErrorMessage[code];
    Alert.alert(
      'Vui lòng thử lại',
      text,
      [
        { text: 'OK' },
      ],
      { cancelable: false }
    )
  }

  _onChangeText = (type, text) => {
    if (type == 1)
      this.setState({
        username: text
      })
    else
      this.setState({
        password: text
      })

  }

  render() {

    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (

      
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
        <View style={styles.container}>
        {/* <KeyboardAvoidingView behavior="padding"> */}
          <UserInput
            source={usernameImg}
            placeholder="Username"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
            type={1}
            value="Mrxu"
            //onChangeText={(text) => this.setState({ username: text })}
            onChange={this._onChangeText}
          />
          <UserInput
            source={passwordImg}
            secureTextEntry={this.state.showPass}
            placeholder="Password"
            returnKeyType={'done'}
            autoCapitalize={'none'}
            autoCorrect={false}
            type={2}
            value="1"
            onChange={this._onChangeText}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btnEye}
            onPress={this.showPass}>
            <ImageBackground source={eyeImg} style={styles.iconEye} />
          </TouchableOpacity>
          <Animated.View style={{ width: changeWidth }}>
            <TouchableOpacity
              style={stylesButton.button}
              onPress={this._onPress}
              activeOpacity={1}>
              {this.state.isLoading ? (
                <ImageBackground source={spinner} style={stylesButton.image} />
              ) : (
                  <Text style={stylesButton.text}>LOGIN</Text>
                )}
            </TouchableOpacity>
            <Animated.View
              style={[stylesButton.circle, { transform: [{ scale: changeScale }] }]}
            />
          </Animated.View>
        {/* </KeyboardAvoidingView> */}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: -250,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  btnEye: {
    position: 'absolute',
    top: 70,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
  },
  containerSignupSection: {
    flex: 1,
    top: 65,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
});

const stylesButton = StyleSheet.create({
  container: {
    flex: 1,
    top: -95,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F035E0',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});

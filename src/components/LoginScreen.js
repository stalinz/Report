import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
// import ButtonSubmit from './ButtonSubmit';
// import SignupSection from './SignupSection';

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props){
    super(props);
  }
  
  render() {
    return (
      <Wallpaper>
        <Logo />
        <Form {...this.props} />
      </Wallpaper>
    );
  }
}

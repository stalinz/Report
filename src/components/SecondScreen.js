import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Easing,
  Text,
} from 'react-native';
 
import {Actions, ActionConst} from 'react-native-router-flux';
export default class SecondSecreen extends Component {
  
    static navigationOptions = ({navigation, screenProps}) => {
        return {
          title: "Báo cáo tổng hợp",
          headerLeft: null,
          headerTintColor: 'white',
          headerTitleStyle: {
            color: 'black',
            textAlign: 'center',
          },
          headerStyle: {
            backgroundColor: '#1E90FF'
          },
        }
      };

      constructor(props) {
        super(props);
        };
   render() {
    return (
        <View>
          <Text> Báo cáo tổng hợp </Text>
        </View>
    );
  }
 
}
 
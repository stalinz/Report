import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Text,
} from 'react-native';
import { Icon } from 'react-native-elements'
import {Actions, ActionConst} from 'react-native-router-flux';
import arrowleft from '../images/left-arrow.png';
import { PieChart } from 'react-native-svg-charts'
const data = [
  {
      key: 1,
      value: 50,
      svg: { fill: '#600080' },
      arc: { outerRadius: '130%', cornerRadius: 10,  }
  },
  {
      key: 2,
      value: 50,
      svg: { fill: '#9900cc' }
  },
  {
      key: 3,
      value: 40,
      svg: { fill: '#c61aff' }
  },
  {
      key: 4,
      value: 95,
      svg: { fill: '#d966ff' }
  },
  {
      key: 5,
      value: 35,
      svg: { fill: '#ecb3ff' }
  }
]

export default class CCU extends Component {
  
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            headerLeft:
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image source={arrowleft}
                         />
                </TouchableOpacity>
            ,
            title: "CCU",
          headerTintColor: 'white',
          headerTitleStyle: {
            color: 'black',
            textAlign: 'center',
            fontWeight: '500',
            fontSize: 30
          },
          headerStyle: {
            backgroundColor: '#4267B2'
          },
        }
      };

      constructor(props) {
        super(props);
        };
   render() {
    return (
      <PieChart
      style={{ height: 200 }}
      outerRadius={'70%'}
      innerRadius={10}
      data={data}
  />
    );
  }
 
}
 
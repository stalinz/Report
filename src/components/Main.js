// import React, { Component } from 'react';
// import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
// import {StackNavigator} from "react-navigation";
// import LoginScreen from './LoginScreen';
// import ReportScreen from './ReportScreen';
// import {StyleSheet,View,} from 'react-native';
// import {connect, Provider} from "react-redux";
// // export default class Main extends Component {
// //   render() {
// // 	  return (
// // 	    <Router>
// // 	      <Scene key="root">
// // 	        <Scene key="loginScreen"
// // 	          component={LoginScreen}
// // 	        	animation='fade'
// // 	          hideNavBar={true}
// // 	          initial={true}
// // 	        />
// // 	        {/* <Scene key="secondScreen"
// // 	          component={SecondScreen}
// // 	          animation='fade'
// // 	          hideNavBar={true}
// // 					/> */}
// // 					<Scene key="reportScreen"
// // 	          component={ReportScreen}
// // 	          animation='fade'
// // 	          hideNavBar={true}
// // 	        />
// // 	      </Scene>
// // 	    </Router>
// // 	  );
// // 	}
// // }

// const Routes = {
//   LoginScreen: {screen: LoginScreen},
//   ReportScreen: {screen: ReportScreen},
// };
// const Navigator = StackNavigator(Routes, {
//   headerMode: 'screen'
// });
// export default class Main extends Component {
//   render() {
// 	  return (
// 			<Provider store=''>
// 				<Navigator/>
// 		 </Provider>
// 	  );
// 	}
// }


import React from 'react';

import { StackNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';
import ReportScreen from './ReportScreen';
import Baocaotonghop from '../screen/baocaotonghop';
import Doanhthu from '../screen/doanhthu';
import CCU from '../screen/ccu';
import Nap from '../screen/nap';
import Tieu from '../screen/tieu';
import ARPU from '../screen/arpu';

const Main = StackNavigator({
	LoginScreen: { screen: LoginScreen},
	ReportScreen: { screen: ReportScreen},
	Baocaotonghop: { screen: Baocaotonghop},
	Doanhthu: { screen: Doanhthu},
	CCU: { screen: CCU},
	Nap: { screen: Nap},
	Tieu: { screen: Tieu},
	ARPU: { screen: ARPU},
})

export default Main;

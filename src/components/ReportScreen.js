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
  Image,
} from 'react-native';
import {
    Container,
    Button,
    Header,
    Text,
    Left,
    Right,
    Body,
    Title,
    Grid,
    Row,
    Col
} from "native-base";
import {Actions, ActionConst} from 'react-native-router-flux';
import chartIcon from '../images/icons/chart2.png';
import logout from '../images/icons/logout.png';
import GridView from 'react-native-super-grid';

import { ErrorMessage } from '../Constants/errorMessage';
import { userService } from '../Services/user.services';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;
// const items = [
//     { ID: 1, name: 'Báo cáo tổng hợp', code: '#1abc9c', source: chartIcon,route : 'Baocaotonghop' },
//     { ID: 2, name: 'Doanh Thu', code: '#2ecc71', source: chartIcon ,route : 'Doanhthu'},
//     { ID: 3, name: 'Nạp', code: '#3498db', source: chartIcon ,route : 'Nap'},
//     { ID: 4, name: 'Tiêu', code: '#9b59b6', source: chartIcon ,route : 'Tieu'},
//     { ID: 5, name: 'CCU', code: '#34495e', source: chartIcon ,route : 'CCU'},
//     { ID: 6, name: 'ARPU', code: '#16a085', source: chartIcon ,route : 'ARPU'},
// ];

export default class ReportSecreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items:[]
        };
    };

    componentDidMount() {
        userService.checkAuthen()
        .then((response)=> {
            const code = response.AccountID;
            if (code <=0) {
                this.props.navigation.navigate('LoginScreen');
            }
            else{
                this.setState({ items: response.ListData})
                this.props.navigation.setParams({
                    usernameShow: response.Username,
                    showDialog : this.showDialog
                  });
               // usernameShow = response.Username
            }
        });
    }
    

    static navigationOptions = ({navigation, screenProps}) => {
      //  const {usernameShow} =this.state;
      const { params = {} } = navigation.state;
        return {
          headerRight: (
            <TouchableOpacity onPress={() => {
              params.showDialog();
            }}>
              <Text>{params.usernameShow}</Text>
              <Image style={styles.logOutText} source={logout}  />
            </TouchableOpacity>
          ),
          title: "Report",
          headerLeft: null,
          headerTintColor: 'white',
          headerTitleStyle: {
            color: 'black',
            alignSelf: 'center',
            fontWeight: '500',
            fontSize: 30
          },
          headerStyle: {
            backgroundColor: '#4267B2'
          },
        }
      };

  eventClickLister = (id) => {
        const router = this.state.items.find(x => x.ReportID == id).Route;
        this.props.navigation.navigate(router);
        };
  render() {
    return (
        
        <Container padder style={{ paddingTop: 5, backgroundColor:'#F5F5DC' }}>
        <GridView
            itemDimension={130}
            items={this.state.items}
            style={styles.gridView}
            renderItem={(item, index) => (
                <TouchableOpacity onPress={() => this.eventClickLister(item.ReportID)}>
                    <View style={[styles.itemContainer, { backgroundColor: item.Code }]}>
                        <ImageBackground
                            style={styles.icon}
                            source={require('../images/icons/chart2.png')}
                        />
                        <Text style={styles.itemName}>{item.ReportName}</Text>
                    </View>
                </TouchableOpacity>
            )}
        />
        </Container>
    );
  }

  showDialog = () =>{
    userService.Logout()
    .then((response)=> {
        this.props.navigation.navigate('LoginScreen');
    });
  }
}

const styles = StyleSheet.create({
    containerView: {
        flex: 1,
        backgroundColor: '#EBEBEB',
        alignContent: 'center',
    },
    container: {
        paddingTop: 40,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    menuBox: {
        backgroundColor: "#DCDCDC",
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 12
    },
    icon: {
        width: 60,
        height: 60,
    },
    iconimage: {
        width: 30,
        height: 30,

    },
    
    info: {
        fontSize: 22,
        color: "#696969",
    },
    col: {
        alignItems: "center",
        paddingHorizontal: 3
    },
    row: {
        paddingBottom: 20
    },
    iconText: {
        fontSize: 12
    },
    gridView: {
        paddingTop: 25,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
    logOutText: {
        marginRight:10,
    },
});
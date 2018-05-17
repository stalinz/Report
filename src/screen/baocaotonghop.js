import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Text,ScrollView ,
    Picker
} from 'react-native';

import { Icon } from 'react-native-elements'
import {Actions, ActionConst} from 'react-native-router-flux';
import arrowleft from '../images/left-arrow.png';
import chartIcon from '../images/icons/chart2.png';
import dangky from '../images/icons/person.png';
import tkmoi from '../images/icons/people.png';
import tkchoi from '../images/icons/people.png';
import doanhthu from '../images/icons/money-bag.png';
import loinhuan from '../images/icons/piggy-bank-1.png';
import tongnap from '../images/icons/cash.png';
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
import { reportService } from '../Services/report.services';
import ChartView from 'react-native-highcharts';
import { Config } from '../Configs';
export default class Baocaotonghop extends Component {

    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            headerLeft:
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image source={arrowleft}
                         />
                </TouchableOpacity>
            ,
            title: "Báo cáo tổng hợp",
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
        this.state = {
            data:[],
            TotalAccountRegister:0,
            TotalAccountPlay :0,
            TotalAccountNew :0,
            TotalRevenue :0,
            TotalProfit :0,
            TotalInput :0,
            dataTime:[],
            dataDay:[],
            dataLastday:[],
            dataSevenDaysAgo:[],
            totalService :[],
            totalLocation :[],
            totalSource :[],
        };
    };
    

    componentDidMount() {
        reportService.GetReportTotal()
        .then((response)=> {
          var dataTimeTemp =[]
          var dataDayTemp =[]
          var dataLastdayTemp =[]
          var dataSevenDaysAgoTemp =[]
          var totalserieslastday =0
          var totalseriesagoday =0
          var totalseriesday =0
          var hourMax = 0
          var minMax = 0
          var totalServiceTemp =[]
          var totalLocationTemp =[]
          var totalSourceTemp =[]
          for (let item of response.ListData) {
            dataTimeTemp.push(item.ReportTime);
            totalserieslastday =Config.GetTotalChoose(response.ListData, item.ReportTime, 2);
            totalseriesagoday = Config.GetTotalChoose(response.ListData, item.ReportTime, 3);
            dataLastdayTemp.push({ y: item.LastDay, z: totalserieslastday });
            dataSevenDaysAgoTemp.push({ y: item.SevenDaysAgo, z: totalseriesagoday });
            if (item.ToDay >0)
            {
                var tmp = item.ReportTime.split(':');
                hourMax = parseInt(tmp[0]);
                minMax = parseInt(tmp[1]);
            }
          }
          for (let item of response.ListData) {
            var tmp1 = item.ReportTime.split(':');
            if (hourMax < parseInt(tmp1[0])) continue;
            if (hourMax == parseInt(tmp1[0]) && minMax < parseInt(tmp1[1])) continue;
            totalseriesday = Config.GetTotalChoose(response.ListData, item.ReportTime, 1);
            dataDayTemp.push({ y: item.ToDay, z: totalseriesday });
           }
          for (let item of response.ListDataService) {
            totalServiceTemp.push({
                name: item.ServiceName,
                y: item.TotalAccounts
            });
           }
           for (let item of response.ListDataLocation) {
            totalLocationTemp.push({
                name: item.ServiceName,
                y: item.TotalAccounts
            });
           }
           for (let item of response.ListDataSource) {
            totalSourceTemp.push({
                name: item.ServiceName,
                y: item.TotalAccounts
            });
           }
            this.setState({ 
                TotalAccountRegister: response.TotalAccountRegister,
                TotalAccountPlay : response.TotalAccountPlay,
                TotalAccountNew : response.TotalAccountNew,
                TotalRevenue : response.TotalRevenue,
                TotalProfit : response.TotalProfit,
                TotalInput : response.TotalInput,
                dataTime:dataTimeTemp,
                dataDay:dataDayTemp,
                dataLastday:dataLastdayTemp,
                dataSevenDaysAgo:dataSevenDaysAgoTemp,
                totalService :totalServiceTemp,
                totalLocation :totalLocationTemp,
                totalSource :totalSourceTemp
            })
        });
    }

    render() {
        var Highcharts='Highcharts';
        const {dataTime,dataDay,dataLastday,dataSevenDaysAgo,totalService,totalLocation,totalSource} = this.state;
        var conf = Config.ConfigLineMinute(dataTime,dataDay,dataLastday,dataSevenDaysAgo);
        var confPie= Config.ConfigPie("Dịch vụ",totalService);
        var confPieSource= Config.ConfigPie("Khu vực",totalLocation);
        var confPieDevide= Config.ConfigPie("Thiết bị",totalSource);

         return (
            <ScrollView  >
                <View style={styles.container}>
                    <View>
                        <ImageBackground source={dangky} style={styles.inlineImg} />
                    </View>
                    <View>
                        <Text style={styles.textShow} >{"Tk đăng ký: "+ Config.FomatNumber(this.state.TotalAccountRegister)}</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <View>
                        <ImageBackground source={tkchoi} style={styles.inlineImg} />
                    </View>
                    <View>
                        <Text style={styles.textShow}> {"Tk chơi: "+ Config.FomatNumber(this.state.TotalAccountPlay)}</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <View>
                        <ImageBackground source={tkmoi} style={styles.inlineImg} />
                    </View>
                    <View>
                        <Text style={styles.textShow}> {"Tk mới: "+ Config.FomatNumber(this.state.TotalAccountNew)}</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <View>
                        <ImageBackground source={doanhthu} style={styles.inlineImg} />
                    </View>
                    <View>
                         {/* <Text style={styles.textShow}> {`Doanh thu : ${this.state.TotalRevenue.toLocaleString().replace(',','.')}`}</Text> */}
                         <Text style={styles.textShow}> {`Doanh thu : ${Config.FomatNumber(this.state.TotalRevenue)}`}</Text>
                         {/* <NumberFormat value={this.state.TotalRevenue} displayType={'text'} thousandSeparator={true} prefix={'$'} /> */}
                        
                    </View>
                </View>
                <View style={styles.container}>
                    <View>
                        <ImageBackground source={loinhuan} style={styles.inlineImg} />
                    </View>
                    <View>
                        <Text style={styles.textShow}> {"Lợi nhuận: "+ Config.FomatNumber(this.state.TotalProfit)}</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <View>
                        <ImageBackground source={tongnap} style={styles.inlineImg} />
                    </View>
                    <View>
                        <Text style={styles.textShow}> {"Tổng nạp: "+ Config.FomatNumber(this.state.TotalInput)}</Text>
                    </View>
                </View>
                <View>
                    <ChartView style={{height:300,marginTop:10}} config={conf}></ChartView>
                </View>
                <View>
                    <ChartView style={{height:300,marginTop:10}} config={confPie}></ChartView>
                </View>
                <View>
                    <ChartView style={{height:300,marginTop:10}} config={confPieSource}></ChartView>
                </View>
                <View>
                    <ChartView style={{height:300,marginTop:10}} config={confPieDevide}></ChartView>
                </View>
            </ScrollView >
          );
    }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      top:-30,
      marginTop : 40,
      paddingLeft : 10,
      flexDirection:'row',
    },
    inlineImg: {
        width: 32,
        height: 32,
      },
      textShow: {
        // paddingLeft :40,
        fontSize: 20,
        fontWeight: 'bold',
      },
  });

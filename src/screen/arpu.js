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
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
const data = [ 50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80 ]
import { userService } from '../Services/user.services';
import ChartView from 'react-native-highcharts';
import { reportService } from '../Services/report.services';
export default class ARPU extends Component {
  
    static navigationOptions = ({navigation, screenProps}) => {
        return {
            headerLeft:
            <TouchableOpacity onPress={() => { navigation.goBack() }}>
                <Image source={arrowleft}
                     />
            </TouchableOpacity> ,
          title: "Báo cáo ARPU",
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
          dataTime:[],
          dataDay:[],
          dataLastday:[],
          dataSevenDaysAgo:[],
      };
    };

    componentDidMount() {
      reportService.GetReportMinuteLine()
      .then((response)=> {
        console.log(response)
        var dataTimeTemp =[]
        var dataDayTemp =[]
        var dataLastdayTemp =[]
        var dataSevenDaysAgoTemp =[]
        for (let item of response.ListData) {
          dataTimeTemp.push(item.ReportTime);
          dataDayTemp.push(item.ToDay);
          dataLastdayTemp.push(item.LastDay);
          dataSevenDaysAgoTemp.push(item.SevenDaysAgo);
         }
         console.log(dataTimeTemp,dataDayTemp,dataLastdayTemp,dataSevenDaysAgoTemp)
          this.setState({ 
            dataTime:dataTimeTemp,
            dataDay:dataDayTemp,
            dataLastday:dataLastdayTemp,
            dataSevenDaysAgo:dataSevenDaysAgoTemp,
          })
      });
  }
  
   render() {
    var Highcharts='Highcharts';
    const {dataTime,dataDay,dataLastday,dataSevenDaysAgo} = this.state;
    var conf={
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
            },
            title: {
                text: 'Báo cáo theo phút'
            },
            xAxis: {
                categories: dataTime,
                tickPixelInterval: 5
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: true
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Hôm nay',
                data: dataDay,
                lineWidth: 2.0,
                color: "#0147FA"
            },
            {
              name: 'Hôm trước',
              data: dataLastday,
              color: "#FF030D"
          },
          {
            name: '7 ngày trước',
            data: dataSevenDaysAgo,
            color: "#76EE00"
        }]
        };

    const options = {
        global: {
            useUTC: false
        },
        lang: {
            decimalPoint: ',',
            thousandsSep: '.'
        }
    };
    return (
      <ChartView style={{height:300}} config={conf} options={options}></ChartView>
    );
  }
 
}
 
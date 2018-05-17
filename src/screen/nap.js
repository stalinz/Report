import React, { Component } from 'react';
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
    TextInput,
    ScrollView,
    Picker,
    Keyboard,
    YellowBox
} from 'react-native';
import {
    Container,
    Button,
    Header,
    Left,
    Right,
    Body,
    Title,
    List,
    ListItem,
    Thumbnail,
    Content,
    Item
} from "native-base";
import arrowleft from '../images/left-arrow.png';
import DatePicker from 'react-native-datepicker'
import { Dropdown } from 'react-native-material-dropdown';
import { reportService } from '../Services/report.services';
import spinner from '../images/loading.gif';
import { Config } from '../Configs';
import ChartView from 'react-native-highcharts';
import Moment from 'moment';
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 45;
let dataPhantich = [{
    label: 'Tổng tiền',
    value: '2',
}, {
    label: 'Tài khoản',
    value: '0',
}, {
    label: 'Giao dịch',
    value: '1',
}];
let dataTonghop = [{
    label: 'Tổng hợp',
    value: '1',
}, {
    label: 'Chi tiết',
    value: '2',
}];
 
export default class Nap extends Component {

    static navigationOptions = ({ navigation, screenProps }) => {
        return {
            headerLeft:
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <Image source={arrowleft}
                    />
                </TouchableOpacity>
            ,
            title: "Báo cáo Nạp",
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
        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
        var fromDate = new Date(y, m, 1);
        var endDate = new Date()
        super(props);
        this.state = {
            language: "",
            fromDate: fromDate,
            endDate: endDate,
            selected1: 1,
            dataService: [],
            dataSource: [],
            isLoading: false,
            dataServiceValue: "-3",
            dataPhantichValue: "2",
            dataTonghopValue: "1",
            dataSourceValue: "-1",
            dataYear: [],
            dataTimeDay: [],
            dataLastYear: [],
            dataListDay: [],
            dataListDayDetail: [],

        }
        this.buttonAnimated = new Animated.Value(0);
        this.growAnimated = new Animated.Value(0);
    };

    componentDidMount() {
        var dataServiceTemp = []
        var dataSourceTemp = []
       
        reportService.GetServiceSource(2)
            .then((response) => {
                for (let item of response.ListServiceData) {
                    dataServiceTemp.push({ label: item.ServiceName, value: item.ServiceID });
                }
                for (let item of response.ListSourceData) {
                    dataSourceTemp.push({ label: item.ServiceName, value: item.ServiceID });
                }
                this._onPress();
                this.setState({
                    dataService: dataServiceTemp,
                    dataSource: dataSourceTemp,
                    
                })
            });
    }
    componentWillUnmount()
    {

    }

    ConvertStringToInt(str) {
        Moment.locale('en');
        str = Moment(str).format('YYYYMMDD')
        return str;
    }


    _onPress = () => {
        var dataTimeDayTemp =[]
        var dataYearTemp = []
        var dataLastYearTemp = []
        const { fromDate, endDate, dataServiceValue, dataPhantichValue, dataTonghopValue, dataSourceValue } = this.state;
        var d = new Date(), dayReal = d.getDate(), monthReal = d.getMonth() + 1;
        if (this.state.isLoading) return;
        this.setState({ isLoading: true });
        // Loai bao cao
        // Bao cao theo ngay
            reportService.BR_ReportTotalInput_FlashChart(dataPhantichValue, dataSourceValue, dataServiceValue, this.ConvertStringToInt(fromDate), this.ConvertStringToInt(endDate))
                .then((response) => {
                    for (let item of response.ListData) {
                        dataTimeDayTemp.push(item.ReportDate);
                        dataLastYearTemp.push(item.LastYear);
                        var tmp = item.ReportDate.split('-');
                        var day = parseInt(tmp[1]);
                        var month = parseInt(tmp[0]);
                        if (month < monthReal) {
                            dataYearTemp.push(item.ThisYear);
                        }
                        if (month = monthReal) {
                            if (day < dayReal)
                                dataYearTemp.push(item.ThisYear);
                        }
                    }
                  
                    this.setState({
                      dataYear: dataYearTemp,
                      dataTimeDay: dataTimeDayTemp,
                      dataLastYear: dataLastYearTemp,
                  })

                });
            if (this.state.dataTonghopValue == "1") {
                reportService.BR_ReportTotalInput_GetRows(dataPhantichValue,dataSourceValue, dataServiceValue, this.ConvertStringToInt(fromDate), this.ConvertStringToInt(endDate))
                    .then((response) => {
                      console.log(response.ListData)
                        this.setState({
                            dataListDay: response.ListData,
                        })
                    });
            }
            else {
                reportService.BR_ReportTotalInput_Detail_GetRows(dataPhantichValue,dataSourceValue, dataServiceValue, this.ConvertStringToInt(fromDate), this.ConvertStringToInt(endDate))
                    .then((response) => {
                      console.log(response.ListData)
                        this.setState({
                            dataListDayDetail: response.ListData,
                        })
                    });
            }

       

        setTimeout(() => {
            this.setState({ isLoading: false });
            Keyboard.dismiss();
        }, 2000);
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

        const { dataListDayDetail,dataTonghopValue, dataService, dataSource, dataYear, dataTimeDay, dataLastYear, dataListDay } = this.state;
        
        var Highcharts = 'Highcharts';
        var conf  = Config.ConfigLineDay(dataTimeDay, dataYear, dataLastYear);
        return (
            <View>

                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Dropdown
                            label='Chọn dịch vụ'
                            value="Tất cả"
                            data={dataService}
                            onChangeText={(value) => this.setState({ dataServiceValue: value })}
                        />
                    </View>
                    <View style={{ width: 130, marginLeft: 8 }}>
                        <Dropdown
                            label='Phân tích'
                            value="2"
                            data={dataPhantich}
                            onChangeText={(value) => this.setState({ dataPhantichValue: value })}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Dropdown
                            label='Nguồn'
                            value="Tất cả"
                            data={dataSource}
                            onChangeText={(value) => this.setState({ dataSourceValue: value })}
                        />
                    </View>

                    <View style={{ width: 130, marginLeft: 8 }}>
                        <Dropdown
                            label='Báo cáo'
                            value="1"
                            data={dataTonghop}
                            onChangeText={(value) => this.setState({ dataTonghopValue: value })}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View >
                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.fromDate}
                            mode="date"
                            placeholder="select date"
                            format="DD/MM/YYYY"
                            minDate="2016-05-01"
                            maxDate="2020-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateInput: {
                                    marginLeft: 10
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ fromDate: date }) }}
                        />
                    </View>
                    <View >
                        <DatePicker
                            style={{ width: 200 }}
                            date={this.state.endDate}
                            mode="date"
                            placeholder="select date"
                            format="DD/MM/YYYY"
                            minDate="2016-05-01"
                            maxDate="2020-06-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateInput: {
                                    marginLeft: 15
                                }
                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(date) => { this.setState({ endDate: date }) }}
                        />
                    </View>
                </View>
                <Animated.View style={{ width: changeWidth, marginTop: 10, marginLeft: 17 }}>
                    <TouchableOpacity
                        style={stylesButton.button}
                        onPress={this._onPress}
                        activeOpacity={1}>
                        {this.state.isLoading ? (
                            <ImageBackground source={spinner} style={stylesButton.image} />
                        ) : (
                                <Text style={stylesButton.text}>TÌM KIẾM</Text>
                            )}
                    </TouchableOpacity>
                    <Animated.View
                        style={[stylesButton.circle, { transform: [{ scale: changeScale }] }]}
                    />
                </Animated.View>
                <ScrollView >
                    <View>
                        <ChartView style={{ height: 300, marginTop: 10 }} config={conf}></ChartView>
                    </View>
                     
                    {this.state.dataTonghopValue == "1" ? (
                        < List
                            dataArray={dataListDay}
                            renderRow={data =>
                                <ListItem thumbnail button={true}>
                                    <Left >
                                        <Text style={{ fontSize: 20 }} >
                                            {Moment(data.ReportDate).format('DD/MM')}
                                        </Text>
                                    </Left>
                                    <Body>
                                        <Text >
                                            Tài khoản:  {Config.FomatNumber(data.TotalAccounts)}
                                        </Text>
                                        <Text >
                                            SGD:  {Config.FomatNumber(data.TotalTrans)}
                                        </Text>
                                        <Text >
                                            Tổng tiền:  {Config.FomatNumber(data.TotalAmounts)}
                                        </Text>
                                    </Body>
                                </ListItem>
                            }
                        >
                        </List>
                    ) : (
                      < List
                            dataArray={dataListDayDetail}
                            renderRow={data =>
                                <ListItem thumbnail button={true}>
                                    <Left style={{ width: 100 }}>
                                        <Text style={{ fontSize: 15 }} >
                                            {data.ServiceName}
                                        </Text>
                                    </Left>
                                    <Body>
                                        <Text >
                                            Tài khoản:  {Config.FomatNumber(data.TotalAccounts)}
                                        </Text>
                                        <Text >
                                            SGD:  {Config.FomatNumber(data.TotalTrans)}
                                        </Text>
                                        <Text >
                                            Tổng tiền:  {Config.FomatNumber(data.TotalAmounts)}
                                        </Text>
                                    </Body>
                                </ListItem>
                            }
                        >
                        </List>
                        )}
                </ScrollView>
            </View >
        );
    }

}


const styles = StyleSheet.create({
    container1: {
        flex: 1,
        marginTop: 5,
        paddingLeft: 5,
    },
    container2: {
        flex: 1,
        marginTop: 10,
        paddingLeft: 5
    },
    dropdown: {
        width: 50,
    }
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

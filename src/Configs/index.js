import ChartView from 'react-native-highcharts';
import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';
function FomatNumber(number)
{
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

function GetTotalChoose (data, ReportTime, name) {
    var TotalChoose = 0;
    var d = new Date(), hour = d.getHours(), minute = d.getMinutes(), mili = d.getSeconds(), day = d.getDate(), month = d.getMonth() + 1, year = d.getFullYear();
    var datetimeIn = year + '-'+month + '-' + day  + " " + ReportTime + ":00.990";
    for (let item of data) { 
        var datetime = year + '-' + month + '-' + day + " " + item.ReportTime + ":00.990";
        if (datetime <= datetimeIn) {
            if (name == 1) TotalChoose = TotalChoose + item.ToDay;
            if (name == 2) TotalChoose = TotalChoose + item.LastDay;
            if (name == 3) TotalChoose = TotalChoose + item.SevenDaysAgo;
        }
        else {
            return TotalChoose;
        }
    };
    return TotalChoose;
};

function ConfigLineMinute(dataTime,dataDay,dataLastday,dataSevenDaysAgo)
{
    var Highcharts='Highcharts';
    var config=
    {
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
        },
        credits: { enabled: false },
        plotOptions: { series: { "allowPointSelect": false, "dataLabels": { "distance": 0, "enabled": false }, "lineWidth": 0.7, "marker": { "states": { "hover": { "enabled": true, "radius": 5 } }, "enabled": false }, "shadow": false } },
        title: {
            text: 'Báo cáo theo phút'
        },
        xAxis: [{ "categories": dataTime, "tickInterval": 5, "title": { "text": "" } }],
        yAxis: [{ "title": { "text": "" } }],
        tooltip: { "formatter": function (event) { var tmp = '<b>' + this.series.name + '</b><br/>Tại: ' + this.x + ': ' + Highcharts.numberFormat(this.y, 0, '.') + '</b><br/>Tổng: ' + Highcharts.numberFormat(this.point.z, 0, '.'); if (typeof (tmp) == 'function') { return tmp(this); } else { return tmp; } } },
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

    return config;
}

function ConfigLineDay(dataTime,dataYear,dataLastYear)
{
    var Highcharts='Highcharts';
    var config=
    {
        chart: {
            type: 'spline',
            animation: Highcharts.svg, // don't animate in old IE
            marginRight: 10,
        },
        credits: { enabled: false },
        plotOptions: { series: { "allowPointSelect": false, "dataLabels": { "distance": 0, "enabled": false }, "lineWidth": 0.7, "marker": { "states": { "hover": { "enabled": true, "radius": 5 } }, "enabled": false }, "shadow": false } },
        title: {
            text: 'Báo cáo theo ngày'
        },
        xAxis: [{ "categories": dataTime, "tickInterval": 5, "title": { "text": "" } }],
        yAxis: [{ "title": { "text": "" } }],
        tooltip: { "formatter": function (event) { var tmp = '<b>' + this.series.name + '</b><br/>Tại: ' + this.x + ': ' + Highcharts.numberFormat(this.y, 0, '.') + '</b><br/>Tổng: ' + Highcharts.numberFormat(this.point.z, 0, '.'); if (typeof (tmp) == 'function') { return tmp(this); } else { return tmp; } } },
        legend: {
            enabled: true
        },
        exporting: {
            enabled: false
        },
        series: [{
            name: 'Năm nay',
            data: dataYear,
            lineWidth: 2.0,
            color: "#0147FA"
        },
        {
          name: 'Năm ngoái',
          data: dataLastYear,
          color: "#FF030D"
      } ]
    };
    return config;
}

function ConfigPie(ServiceName,data)
{
    var Highcharts='Highcharts';
    var config=
    {
        chart: {
            type: 'pie',
            marginRight: 10,
        },
        credits: { enabled: false },
        exporting: {
            enabled: false
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                inside: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    distance: -50,
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 4
                    }
                }
            }
        },
        title: {
            text: ServiceName
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        series: [{
            name: ServiceName,
            data: data,
            color: "#76EE00"
        } ]
    };

    return config;
}

function ConfigDonut(ServiceName,data)
{
    var Highcharts='Highcharts';
    var config=
    {
        chart: {
            type: 'pie',
            marginRight: 10,
        },
        credits: { enabled: false },
        exporting: {
            enabled: false
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45,
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    distance: -20,
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 4
                    }
                }
            }
        },
        title: {
            text: ServiceName
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        series: [{
            name: ServiceName,
            data: data,
            color: "#76EE00"
        } ]
    };

    return config;
}

function ConvertStringToInt(str) {
    var s = str.split('/');
    var result = '';
    if (s[1].length < 2) result = s[2] + '0' + s[1];
    else result = s[2] + s[1];
    if (s[0].length < 2) result = result + '0' + s[0];
    else result = result  + s[0];
    return result;
}

export const Config = {
    URL_ROOT : 'http://report.sandbox.bon89.com/',
    ACCOUNT_API : 'http://report.sandbox.bon89.com/',
    REPORT_API : 'http://report.sandbox.bon89.com/',
    FomatNumber,
    GetTotalChoose,
    ConfigLineMinute,
    ConfigPie,
    ConfigDonut,
    ConfigLineDay,
    ConvertStringToInt
}
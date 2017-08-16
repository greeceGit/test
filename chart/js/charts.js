$(".datepicker").datepicker({
    language: "zh-CN",
    autoclose: true, //选中之后自动隐藏日期选择框
    format: "yyyy-mm-dd" //日期格式，详见 http://bootstrap-datepicker.readthedocs.org/en/release/options.html#format
});
var myChart = echarts.init(document.getElementById('left'));
var myChart1 = echarts.init(document.getElementById('right'));
var opitoninit = {};
$.ajax({
    url: "chart.json",
    type: "post",
    dataType: "json",
    success: function(data) {
        var x = [];
        var xdata = [];
        for (var i = 0; i < data.month.length; i++) {
            var t = data.month[i].time;
            if (t.indexOf("2017") >= 0) {
                x.push(data.month[i].time);
                xdata.push(data.month[i].personcount);
            }
        }
        //  alert(data.month[0].time);
        optioninit = {
            title: {
                text: "出勤人次",
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['人数'],

            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {
                        show: true,
                        type: ['line', 'bar', 'pie', 'stack', 'tiled', 'force', 'chord', 'pie', 'funnel']
                    },
                    // saveAsImage: {show: true}
                }
            },
            xAxis: {
                data: x
            },
            yAxis: {},
            series: [{
                name: '人数',
                type: 'bar',
                barWidth: 30,
                data: xdata
            }]
        };
        myChart.setOption(optioninit);

        var years = [];
        var months = [];
        var obj = {};
        var dataarr = [];
        //获得年（legend）
        for (var j = 0; j < data.year.length; j++) {
            years.push(data.year[j].time);
        }
        //获得月份(x轴)
        for (var m = 0; m < data.month.length; m++) {
            if (data.month[m].time.indexOf(years[0])) {
                months.push(data.month[m].time.substring(5));
            }
        }
        //获得某年对应的数据（显示的数据）
        for (var n = 0; n < years.length; n++) {
            var arr = [];
            for (var k = 0; k < data.month.length; k++) {
                if (data.month[k].time.indexOf(years[n]) >= 0) {
                    arr.push(data.month[k].carcount);
                }
            }
            obj[years[n]] = arr;
        }
        //写入series
        for (var l = 0; l < years.length; l++) {
            var dataobj = {};
            dataobj["name"] = years[l];
            dataobj["type"] = 'line';
            dataobj["smooth"] = 'true';
            dataobj["barWidth"] = 20;
            dataobj["data"] = obj[years[l]];
            dataarr.push(dataobj);
        }

        var option1 = {
            title: {
                text: "出勤车次",
            },
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {
                        show: true,
                        type: ['line', 'bar', 'pie', 'stack', 'tiled', 'force', 'chord', 'funnel']
                    },
                    // saveAsImage: {show: true}
                }
            },
            legend: {
                data: years,

            },
            xAxis: {
                data: months
            },
            yAxis: {},
            series: dataarr
        };
        myChart1.setOption(option1);
    },
    error: function() {
        alert("2222");
    }
});

function daychart() {
    if ($(".datepicker#starttime").datepicker("getDate") == null | $(".datepicker#endtime").datepicker("getDate") == null) {
        alert("请选择起止时间。");
        return;
    } else {
        var stime = $(".datepicker#starttime").datepicker("getDate").toLocaleString();
        var etime = $(".datepicker#endtime").datepicker("getDate").toLocaleString();
        var time1 = new Date(stime).getTime();
        var time2 = new Date(etime).getTime();
        //  alert(typeof(stime));
        if (time1 > time2) {
            alert("起始时间大于终止时间，请重新选择。");
            return;
        }
        $.ajax({
            url: "chart.json",
            type: "post",
            dataType: "json",
            success: function(data) {
                var x = [];
                var xdata = [];
                for (var i = 0; i < data.day.length; i++) {
                    var t = data.day[i].time;
                    //   if(t.indexOf("2017")>=0){
                    x.push(data.day[i].time);
                    xdata.push(data.day[i].personcount);
                }
                //   }
                //  alert(data.month[0].time);
                var optionday = {
                    title: {
                        text: "出勤人次",
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['人数'],

                    },
                    toolbox: {
                        show: true,
                        feature: {
                            magicType: {
                                show: true,
                                type: ['line', 'bar', 'pie', 'stack', 'tiled', 'force', 'chord', 'pie', 'funnel']
                            },
                            // saveAsImage: {show: true}
                        }
                    },
                    xAxis: {
                        data: x
                    },
                    yAxis: {},
                    series: [{
                        name: '人数',
                        type: 'bar',
                        data: xdata,
                        barWidth: 15,
                        //  barGap: '100%',
                        //  barCategoryGap:'20%'
                    }]
                };
                myChart.setOption(optionday);
                //   alert(option.series[0].barGap);
            }
        })
    }
}

function monthchart() {
    myChart.setOption(optioninit);
};

function yearchart() {
    $.ajax({
        url: "chart.json",
        type: "post",
        dataType: "json",
        success: function(data) {
            var x = [];
            var xdata = [];
            for (var i = 0; i < data.year.length; i++) {
                var t = data.year[i].time;
                //   if(t.indexOf("2017")>=0){
                x.push(data.year[i].time);
                xdata.push(data.year[i].personcount);
            }
            //   }
            //  alert(data.month[0].time);
            var optionyear = {
                title: {
                    text: "出勤人次",
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['人数'],

                },
                toolbox: {
                    show: true,
                    feature: {
                        magicType: {
                            show: true,
                            type: ['line', 'bar', 'pie', 'stack', 'tiled', 'force', 'chord', 'pie', 'funnel']
                        },
                        // saveAsImage: {show: true}
                    }
                },
                xAxis: {
                    data: x
                },
                yAxis: {},
                series: [{
                    name: '人数',
                    type: 'bar',
                    data: xdata,
                }]
            };
            myChart.setOption(optionyear);
        }
    })
}

// JavaScript Document

var colorLine = ["#3182bd","#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476", "#a1d99b", "#c7e9c0", "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb", "#636363", "#969696", "#bdbdbd", "#d9d9d9"];



var colorLine2 = ["#14ADC4","#7cb5ec","#e55555"];
/*
* bar chart
*/
function barChart(data,xName,yName,lineName,ele){
	var seriesList = [];
	for(var i=0;i<data.length;i++){
		var item = {
			data:data[i],
			color:colorLine2[i],
			name:lineName[i]
		}
		seriesList.push(item);
	}
	$('#'+ele).highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: xName,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: yName,
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'top',
            x: -140,
            y: 80,
            floating: true,
            borderWidth: 1,
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
            shadow: true
        },
        credits: {
            enabled: false
        },
        series: seriesList
    });
	
}

/*area chart*/
function areaChart(data,xName,yName,lineName,ele){
	var seriesList = [];
	for(var i=0;i<data.length;i++){
		var item = {
			data:data[i],
			color:colorLine2[i],
			name:lineName[i]
		}
		seriesList.push(item);
	}
	$('#'+ele).highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: ''
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        xAxis: {
            categories: xName/*[
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'
            ]*/,
            /*plotBands: [{ // visualize the weekend
                from: 4.5,
                to: 6.5,
                color: 'rgba(68, 170, 213, .2)'
            }]*/
        },
        yAxis: {
            title: {
                text:yName
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' '
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: seriesList
    });
}

/*scatter chart*/
function scatterChart(datax,datay,x_name,y_name,nameList,ele){
	var dataseries = [];
	
	for(var i=0;i<datax.length;i++){
		var xy_arr = [];
		xy_arr.push(parseInt(datax[i]));
		xy_arr.push(parseInt(datay[i]));
		dataseries.push(xy_arr);
		
	}
	var seriesItem = {
		name: nameList[0],
		color: colorLine[0],
		data:dataseries
	};
	
	$('#'+ele).highcharts({
        chart: {
            type: 'scatter',
            zoomType: 'xy'
        },
        title: {
            text: 'scatter chart'
        },
        /*subtitle: {
            text: 'Source: Heinz  2003'
        },*/
        xAxis: {
            title: {
                enabled: true,
                text: x_name
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true
        },
        yAxis: {
            title: {
                text: y_name
            }
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(100,100,100)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: '{point.x}, {point.y}'
                }
            }
        },
        series:[seriesItem],
		credits: {  
		  enabled: false  
		}
    });
}

/*pie chart*/
function pieChart(data,nameList,dataName,ele){
	var datalist = [];
	var total = 0;
	for(var i=0;i<data.length;i++){
		total = total + parseInt(data[i]);
	}
	for(var i=0;i<data.length;i++){
		datarow = {
			color:colorLine[i],
			name:nameList[i],
			y:parseInt(data[i])/total
		};
		datalist.push(datarow);
	}
	
	$('#'+ele).highcharts({
		chart: {
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: ''
		},
		tooltip: {
			pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
			pie: {
				allowPointSelect: true,
				cursor: 'pointer',
				dataLabels: {
					enabled: false
				},
				showInLegend: true
			}
		},
		series: [{
			name: dataName,
			colorByPoint: true,
			data: datalist
		}],
		credits: {  
		  enabled: false  
		}
	});
}

/*colcum chart*/
function colcumChart(nameList,x_categorties,xName,yName,data,ele){
	//var x_categorties = ['2015-11-01', '2015-11-02', '2015-11-03', '2015-11-04', '2015-11-05','2015-11-06','2015-11-07','2015-11-08','2015-11-09','2015-11-10','2015-11-11'];
	var dataList = [];
	for(var i =0;i<data.length;i++){
		var datarow = {
            name: nameList[i],
			color: colorLine[i],
            data: data[i]
        }
		dataList.push(datarow);
	}
	
    $('#'+ele).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'colcum'
        },
		tooltip:{
		   formatter:function(){
			  return''+this.series.name+':'+
				 x_categorties[this.x]+','+Highcharts.numberFormat(this.y,2,'.');
		   }
		},
        xAxis: {
            labels: {
				formatter: function() {
					return x_categorties[this.value];
				}
			},
			title: {
                text: xName
            },
			gridLineWidth: 2, //横向网格线宽度
			gridLineColor: '#ccc'//横向网格线颜色
        },
        yAxis: {
            min: 0, 
			minPadding: 0.2,   
			maxPadding: 0.2,  
			endOnTick: false,
			startOnTick:false,
            title: {
                text: yName,
				align:'high',
				rotation:0,
				y:10
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
			offset:-5,
			lineWidth: 2,  
            lineColor: '#333', 
			/*tickColor: '#000000',  
			tickLength: 5,  
			tickWidth: 1,*/
			//刻度  
			gridLineWidth: 1, //纵向网格线宽度
			gridLineColor: '#ccc',//纵向网格线颜色
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
		//标识
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: dataList,
		credits: {  
		  enabled: false  
		}
    });
}

/*line chart*/
function linechart(xName,yName,nameList,x_categorties,data,ele){
	/*test*/
	//var x_categorties = ['10', '20', '30', '40', '50', '60','70', '80', '90', '100', '110', '120','130'];
	//var data = [[0, 60, 350, 840, 1350, 1700, 1860, 1700, 1350, 840, 350, 60,65],[100, 1350, 100,99,98,97,96,95,94,95,96,97,100],[0, 60,100,140, 350,550, 840, 1350, 1700, 1860, 1700, 1350,850]];
	
	var dataList = [];
	for(var i=0;i<data.length;i++){
		var datarow = {
            name: nameList[i],
			color: colorLine[i],
            data: data[i],
        };
		dataList.push(datarow);
	}
	
    $('#'+ele).highcharts({
		chart: {
            type: 'spline'
        },
        title: {
            text: 'line',
            x: 20 //center
        },
        /*subtitle: {
            text: 'Source: WorldClimate.com',
            x: -20
        },*/
		//标识
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
		tooltip:{
		   formatter:function(){
			  return''+this.series.name+':'+
				 x_categorties[this.x]+','+Highcharts.numberFormat(this.y,2,'.');
		   }
		},
        xAxis: {
			title: {
                text: xName
            },
            labels: {
				formatter: function() {
					return x_categorties[this.value];
				}
			},
			gridLineWidth: 2, //纵向网格线宽度
			gridLineColor: '#ccc'//纵向网格线颜色
        },
        yAxis: {
			//max:2000, // 定义Y轴 最大值  
			min:0, // 定义最小值  
			minPadding: 0.2,   
			maxPadding: 0.2,  
			endOnTick: false,

			startOnTick:false,
            title: {
                text: yName,
				align:'high',
				rotation:0,
				y:10
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
			offset:0,
			lineWidth: 1,  
            lineColor: '#333', 
			/*tickColor: '#000000',  
			tickLength: 5,  
			tickWidth: 1,*/
			//刻度  
			gridLineWidth: 1, //纵向网格线宽度
			gridLineColor: '#ccc'//纵向网格线颜色
        },
        series: dataList,
		credits: {  
		  enabled: false  
		}
    });

}
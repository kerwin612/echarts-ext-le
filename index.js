window.onload = function () {
    'use strict';

	var dataAxis = ['。', '。', '。', '。', '。', '点', '击', 'Chart', '导', '出', '水', '印', '的', '图', '片', '。', '。', '。', '。', '。'];
	var data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
	var yMax = 500;
	var dataShadow = [];

	for (var i = 0; i < data.length; i++) {
		dataShadow.push(yMax);
	}

	var option = {
		title: {
			text: '点击Chart导出带水印的图片。'
		},
		xAxis: {
			data: dataAxis,
			axisLabel: {
				inside: true,
				textStyle: {
					color: '#fff'
				}
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: false
			},
			z: 10
		},
		yAxis: {
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				textStyle: {
					color: '#999'
				}
			}
		},
		dataZoom: [
			{
				type: 'inside'
			}
		],
		series: [
			{ // For shadow
				type: 'bar',
				itemStyle: {
					normal: {color: 'rgba(0,0,0,0.05)'}
				},
				barGap:'-100%',
				barCategoryGap:'40%',
				data: dataShadow,
				animation: false
			},
			{
				type: 'bar',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1,
							[
								{offset: 0, color: '#83bff6'},
								{offset: 0.5, color: '#188df0'},
								{offset: 1, color: '#188df0'}
							]
						)
					},
					emphasis: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1,
							[
								{offset: 0, color: '#2378f7'},
								{offset: 0.7, color: '#2378f7'},
								{offset: 1, color: '#83bff6'}
							]
						)
					}
				},
				data: data
			}
		]
	};
	
	var myChart = echarts.init(document.getElementById('myChart'));
	myChart.setOption(option);

	// Enable data zoom when user click bar.
	var zoomSize = 6;
	myChart.on('click', function (params) {
		var tempGraphic = [
			{
				type: 'image',
				id: 'watermark-logo',
				right: 'center',
				top: 'center',
				z: 100,
				silent: true,
				bounding: 'raw',
				origin: [125, 125],
				style: {
					image: '/ileler.png',
					width: 229,
					height: 230,
					opacity: 0.6
				}
			},
			{
				type: 'text',
				id: 'watermark-name',
				z: -10,
				right: 14,
				bottom: 14,
				silent: true,
				rotation: 0,
				style: {
					fill: '#aaa',
					text: '数据来源：https://github.com/ileler',
					font: '14px Microsoft YaHei'
				}
			}
		];
		myChart.downloadChart({
			graphic: tempGraphic
		});
	});

};


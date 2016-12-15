# Expanded the echarts function, add getDupECharts, downloadChart function

 Expanded the [eCharts](http://ecomfe.github.io/echarts/index-en.html) function, add `getDupECharts`, `downloadChart` function

## Prerequisites

You will need the following things properly installed on your computer.

* [Node.js](http://nodejs.org/) (with NPM) and [Bower](http://bower.io/)

## Building

- Preparing  
`bower install` & `npm install`

- default  
`gulp`
> develop with realtime monitor, automatic open browser to view example

- build  
`gulp build`
> Build file to dist

- publish  
`gulp publish`
> Build & bump npm versions

## Usage

Install bower dependency and save for production

```
$ bower install echarts-ext-le --save
```

Inject echarts and echarts-ext-le file into page

```
<script src="path/to/bower_components/echarts/build/dist/echarts-all.js"></script>
<script src="path/to/bower_components/echarts-ext-le/dist/echarts-ext-le.min.js"></script>
```

This is a demo to demonstrate custom download chart without affecting the display of the chart.

```
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
				text: 'data source: https://github.com/ileler',
				font: '14px Microsoft YaHei'
			}
		}
	];
	myChart.downloadChart({
		graphic: tempGraphic
	});
});
```

## Contribute

* `git clone git@github.com:ileler/echarts-ext-le.git`
* change into the new directory
* `npm install`
* `bower install`

### __Running / Development__

* open ```/index.html``` in browser

> Or you can use `gulp server` and visit `http://localhost:8080` in Chrome browser, to avoid `XMLHttpRequest Cross origin requests` error.

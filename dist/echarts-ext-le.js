(function () {'use strict';
var LeEChartsConfig = function () {
        function Config() {
            this.EChartsAPIs = [];
        }
        Config.prototype.getEChartsAPIs = function () {
            return ['group', 'setOption', 'getWidth', 'getHeight', 'getDom', 
            		        'getOption', 'resize', 'dispatchAction', 'on', 'off', 'convertToPixel', 
            		        'convertFromPixel', 'containPixel', 'showLoading', 'hideLoading', 'getDataURL', 
            		        'getConnectedDataURL', 'clear', 'isDisposed', 'dispose'].concat(this.EChartsAPIs || []);
        };
        function LeECharts(chart, theme, opts) {
            this.le_option = null;
            this.le_chart = chart;
            this.le_theme = theme;
            this.le_opts = opts;
            var LeEChartsProto = LeECharts.prototype;
            LeEChartsProto.setOption = function (option, notMerge, lazyUpdate) {
                if (!this.le_chart)
                    return;
                this.le_option = notMerge && option || echarts.util.extend(this.le_option || {}, option);
                return this.le_chart.setOption(option, notMerge, lazyUpdate);
            };
            LeEChartsProto.getDupECharts = function () {
                var dom, option;
                for (var i = 0, j = arguments.length; i < j && i < 2; i++) {
                    if (!dom && arguments[i] instanceof HTMLElement)
                        dom = arguments[i];
                    if (!option && !(arguments[i] instanceof HTMLElement))
                        option = arguments[i];
                }
                var dupId = this.le_chart.id + '_dup';
                var dupDom = null;
                if (dom) {
                    dupDom = dom;
                    dupId = dupDom.id || dupId;
                    dupDom.id = dupId;
                } else {
                    var dupDom = dom || (document.getElementById(dupId) || document.createElement('div'));
                    dupDom.style.position = 'absolute';
                    dupDom.style.height = '100%';
                    dupDom.style.width = '100%';
                    dupDom.style.zIndex = -999;
                    dupDom.style.left = 0;
                    dupDom.style.top = 0;
                    dupDom.innerHTML = '';
                    dupDom.id = dupId;
                    document.body.appendChild(dupDom);
                }
                var chart = echarts.init(dupDom, this.le_theme, this.le_opts);
                chart.setOption(option && echarts.util.extend(this.le_option, option) || this.le_option);
                return chart;
            };
            LeEChartsProto.downloadChart = function () {
                var name, option;
                for (var i = 0, j = arguments.length; i < j && i < 2; i++) {
                    if (!name && typeof arguments[i] === 'string')
                        name = arguments[i];
                    if (!option && typeof arguments[i] === 'object')
                        option = arguments[i];
                }
                option = option && option.dataURLOpts && option.dataURLOpts.type ? option : echarts.util.extend(option || {}, { dataURLOpts: { type: 'png' } });
                var dupChart = this.getDupECharts(option);
                setTimeout(function (name, dupChart, dataURLOpts) {
                    return function () {
                        downloadFile(name, dupChart.getDataURL(dataURLOpts));
                    };
                }((name || Date.parse(new Date())) + '.' + option.dataURLOpts.type, dupChart, option.dataURLOpts), 500);
            };
        }
        var echartAPI = [];
        var echartsInit = echarts.init;
        echarts.init = function (dom, theme, opts) {
            var chart = echartsInit(dom, theme, opts);
            echarts.util.each((LeEChartsConfig || new Config()).getEChartsAPIs(), function (api) {
                LeECharts.prototype[api] = function (api) {
                    return function () {
                        return this.le_chart[api].apply(this.le_chart, arguments);
                    };
                }(api);
            });
            echarts.util.extend(LeECharts.prototype, chart);
            return new LeECharts(chart, theme, opts);
        };
        var getImageDownloadURL = function (imgURL) {
            // atob to base64_decode the data-URI
            var image_data = atob(imgURL.split(',')[1]);
            // Use typed arrays to convert the binary data to a Blob
            var arraybuffer = new ArrayBuffer(image_data.length);
            var view = new Uint8Array(arraybuffer);
            for (var i = 0; i < image_data.length; i++) {
                view[i] = image_data.charCodeAt(i) & 255;
            }
            try {
                // This is the recommended method:
                var blob = new Blob([arraybuffer], { type: 'application/octet-stream' });
            } catch (e) {
                // The BlobBuilder API has been deprecated in favour of Blob, but older
                // browsers don't know about the Blob constructor
                // IE10 also supports BlobBuilder, but since the `Blob` constructor
                //  also works, there's no need to add `MSBlobBuilder`.
                var bb = new (window.WebKitBlobBuilder || window.MozBlobBuilder)();
                bb.append(arraybuffer);
                var blob = bb.getBlob('application/octet-stream');    // <-- Here's the Blob
            }
            // Use the URL object to create a temporary URL
            return (window.URL || window.webkitURL).createObjectURL(blob);    // location.href = url; // <-- Download!
        };
        var downloadFile = function (fileName, content) {
            var aLink = document.createElement('a');
            var evt = document.createEvent('MouseEvents');
            evt.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            aLink.download = fileName;
            aLink.href = getImageDownloadURL(content);
            aLink.dispatchEvent(evt);
        };
        return new Config();
    }();})();
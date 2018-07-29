// 引入SDK核心类
var QQMapWX = require('../../common/libs/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({ key: 'M52BZ-2D7K2-VEEUR-CIRWO-OGLES-FLBUO' });
var regionchangeTimes = -1;

Component({
    properties: {
        // 这里定义了innerText属性，属性值可以在组件使用时指定
        innerText: {
            type: String,
            value: 'default value',
        }
    },
    data: {
        mapCenterLocation: '',
        handle_mapCenterLocation: '',
        targetMoving: false
    },
    attached: function () {
        console.log('attached');
        this.mapCtx = wx.createMapContext('select_point');
    }, 
    ready: function () {
        console.log('ready')
        // this.mapCtx = wx.createMapContext('select_point');
    },
    methods: {
        _regionchange: function (e, ctx) {
            if (regionchangeTimes !== -1) {
                this.setData({
                    targetMoving: true,
                    mapCenterLocation: "",
                    handle_mapCenterLocation: ""
                });
            } else {
                this.setData({
                    targetMoving: true,
                    mapCenterLocation: "",
                    handle_mapCenterLocation: ""
                });
                this._dealTargetMark();
            }
            if (regionchangeTimes == 1) {
                this._dealTargetMark();
                regionchangeTimes = 0;
                return;
            }
            regionchangeTimes++;
        },
        _dealTargetMark: function () {
            var that = this;
            this.mapCtx.getCenterLocation({
                success: function (res) {
                    qqmapsdk.reverseGeocoder({
                        latitude: res.latitude,
                        longitude: res.longitude
                    })
                        .then(function (locationInfo) {
                            var recommend_detail = locationInfo["result"]["formatted_addresses"]["recommend"]

                            if (recommend_detail == "") {
                                recommend_detail = '区域未知'
                            }
                            //暂存当前位置的描述信息
                            that.setData({
                                mapCenterLocation: recommend_detail,
                                handle_mapCenterLocation: recommend_detail.length > 9 ? recommend_detail.substr(0, 9) + '...' : recommend_detail,
                                targetMoving: false
                            });
                        });
                }
            });
        },
    }
})
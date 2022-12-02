// 基于div初始化echarts实例
import echarts from ('echarts')

        let mEcharts = echarts.init(document.getElementById('map'),'dark')

        // 每个城市的空气质量
        let DataPM = [
            {name: '台湾', value: 39.4},
            {name: '河北', value: 56},
            {name: '山西', value: 79},
            {name: '内蒙古', value: 60},
            {name: '安徽', value: 78},
            {name: '澳门', value: 99.4},
            {name: '北京', value: 25.6},
            {name: '重庆', value: 54.3},
            {name: '福建', value: 5.7},
            {name: '甘肃', value: 6.9},
            {name: '广东', value: 158.4},
            {name: '广西', value: 167.9},
            {name: '贵州', value: 94.7},
            {name: '海南', value: 6.1},
            {name: '黑龙江', value: 108.3},
            {name: '河南', value: 72.5},
            {name: '湖北', value: 194},
            {name: '湖南', value: 85.6},
            {name: '江苏', value: 94.1},
            {name: '江西', value: 24.5},
            {name: '吉林', value: 98},
            {name: '辽宁', value: 175},
            {name: '宁夏', value: 15.4},
            {name: '青海', value: 78.6},
            {name: '山东', value: 38.9},
            {name: '上海', value: 54.6},
            {name: '四川', value: 24},
            {name: '天津', value: 68},
            {name: '香港', value: 174},
            {name: '新疆', value: 10.1},
            {name: '西藏', value: 2.6},
            {name: '云南', value: 6.1},
            {name: '浙江', value: 54.3},
            {name: '陕西', value: 76.2},
        ]
        // 涟漪特效的坐标
        let scatterData = [
            {value: [123.429096, 41.796767]},
            {value: [114.298572, 30.584355]}
        ]

        // 使用axios获取中国地图的json数据，获取成功之后，调用回调函数
        $.get('json/map/china.json', function(ret) {
            // echarts全局注册中国地图
            echarts.registerMap('china', ret)
            let option = {
                geo: {
                    // 类型为地图
                    type: 'map',
                    // 地图的数据，必须和echarts全局中注册的china名称一致
                    map: 'china',
                    // 显示地图各个省份的名称
                    label: {
                        show: true
                    },
                    // 地图的缩放比例
                    zoom:1,
                    // 设置允许拖动缩放
                    roam: true,
                    // 以经纬度作为地图的中心点
                    // center: [121.509062, 25.044332]
                },
                series: [
                    {
                        // 每个省的空气质量数据
                        data: DataPM,
                        // 将空气质量的数据和geo进行关联
                        geoIndex: 0,
                        // 关联的类型
                        type: 'map'
                    },
                    {
                        // 图形类型为涟漪图
                        type: 'effectScatter',
                        // 涟漪的坐标数据
                        data: scatterData,
                        // 以geo为坐标进行显示
                        coordinateSystem: 'geo',
                        // 涟漪特效的配置
                        rippleEffect: {
                            // 特效的缩放比例
                            scale: 5
                        }
                    }
                ],
                //
                visualMap: {
                    // 指定最小值
                    min: 0,
                    // 指定最大值
                    max: 200,
                    // 指定空气质量变化的颜色
                    inRange: {
                        color: ['white', 'red']
                    },
                    // 出现滑块，过滤空气质量的城市
                    calculable: true
                }
            }
            // 指定配置及数据到echarts中
            mEcharts.setOption(option)
        })

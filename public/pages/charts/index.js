;(function() {
    "use strict";

    require.config({
        baseUrl:"../../js/",
        paths:{
            vue:"libs/vue",
            echarts:"libs/echarts",
            ELEMENT:"libs/elm-2.1.0"
        }
    }); 
    
    require(["vue" , "ELEMENT" , "echarts"] , function (Vue , ELEMENT , echarts) {
        ELEMENT.install(Vue);
        window.vm = new Vue({
            el:"#app",
            data:{
                
            },
            created:function () {
                this.$on("onglobalsearch" , result => {
                    this.$message("当前页面监听到全局搜索事件:"+result.value);
                });
            },
            mounted:function () {
                const els = document.querySelectorAll(".chart-box");
                this.initLineChart(els[0]);
                this.initBarChart(els[1]);
            },
            methods:{
                initLineChart:function (el) {
                    const myChart = echarts.init(el);
                    let options = {
                        title: {
                            text: '一周温度变化情况'
                        },
                        tooltip: {
                            trigger: 'axis'
                        },
                        legend:{
                            data:["max","min"]
                        },
                        xAxis:{
                            type: 'category',
                            boundaryGap: false,
                            data: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series:[
                            {
                                name:"max",
                                type:'line',
                                smooth: true,
                                data:[25, 16, 17, 27, 30, 16, 32]
                            },
                            {
                                name:"min",
                                type:'line',
                                smooth: true,
                                data:[9, 5, 10 , 12, 18, 2, 20]
                            }
                        ]
                    }
                    myChart.setOption(options);
                },
                initBarChart:function (el) {
                    const myChart = echarts.init(el);
                    let options = {
                        title: {
                            text: '一周各营销渠道访问量'
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        legend: {
                            data: ['直接访问', '邮件营销','联盟广告','视频广告','搜索引擎']
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis:  {
                            type: 'category',
                            data: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        series: [
                            {
                                name: '直接访问',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideRight'
                                    }
                                },
                                data: [320, 302, 301, 334, 390, 330, 320]
                            },
                            {
                                name: '邮件营销',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideRight'
                                    }
                                },
                                data: [120, 132, 101, 134, 90, 230, 210]
                            },
                            {
                                name: '联盟广告',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideRight'
                                    }
                                },
                                data: [220, 182, 191, 234, 290, 330, 310]
                            },
                            {
                                name: '视频广告',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideRight'
                                    }
                                },
                                data: [150, 212, 201, 154, 190, 330, 410]
                            },
                            {
                                name: '搜索引擎',
                                type: 'bar',
                                stack: '总量',
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'insideRight'
                                    }
                                },
                                data: [820, 832, 901, 934, 1290, 1330, 1320]
                            }
                        ]
                    };
                    myChart.setOption(options);
                }
            }
        })
    });
})();
<template>
    <div id="tempEcharts" class="tempEcharts"></div>
</template>

<script>
import * as echarts from 'echarts'
import { onMounted, onBeforeUnmount, ref } from 'vue';
import axios from 'axios';
export default {
    setup() {
        const timer = ref("")
        let echartDataArray = []
        let demo = []
        let time = []
        let demo1 = []
        let time1 = []

        onMounted(() => {
            tempEcharts()
        })
        const tempEcharts = () => {
            const chartDom = document.getElementById('tempEcharts');
            const tempEcharts = echarts.init(chartDom);
            window.onresize = tempEcharts.resize;

            const option = {
                title: {
                    text: '温度检测',
                    x: 'left',
                    padding: [10, 0, 0, 50],
                    textStyle: {
                        "fontSize": 25,
                        fontWeight: 'normal',
                    },
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'category',
                    // axisLabel: {
                    //     rotate: 45,
                    // },
                    data: []
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: [],
                        type: 'line'
                    }
                ]
            };
            timer.value = setInterval(() => {
                console.log("111")
                axios({
                    url: 'http://localhost:8888/echartData',
                    method: 'POST'
                }).then((res) => {
                    echartDataArray = JSON.parse(JSON.stringify(res.data))
                    echartDataArray.forEach(element => {
                        demo1.push(parseFloat(element.temp))
                    });
                    echartDataArray.forEach(e => {
                        time1.push(e.time)
                    })
                    time = time1.reverse()
                    demo = demo1.reverse()
                })

                tempEcharts.setOption({
                    xAxis: {
                        data: time
                    },
                    series: [
                        {
                            data: demo
                        }
                    ]
                });
                for (var i = 0; i < 5; i++) {
                    time.shift();
                    demo.shift()
                }
            }, 1000);
            option && tempEcharts.setOption(option);
            window.addEventListener("resize", function () {
                tempEcharts.resize();
            });
            onBeforeUnmount(() => {
                console.log("temp定时器被消除了")
                clearInterval(timer.value)
            })
        }
        return {
            time
        }
    }
}
</script>
<style lang="scss" scoped>
.tempEcharts {
    width: 100%;
    height: 100%;
}
</style>
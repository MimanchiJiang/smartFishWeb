<template>
    <div id="qualityEcharts" class="qualityEcharts">
    </div>
</template>
<script>
import * as echarts from 'echarts'
import { onMounted, ref, watch } from 'vue';
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
            qualityEcharts()
        })
        const qualityEcharts = () => {
            const chartDom = document.getElementById('qualityEcharts');
            const qualityEcharts = echarts.init(chartDom);

            const option = {
                title: {
                    text: '水质检测',
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
                    axisLabel: {
                        rotate: 45,
                    },
                    data: []
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: [],
                        type: 'line'
                    }
                ]
            };
            setInterval(function () {
                axios({
                    url: 'http://localhost:8888/echartData',
                    method: 'POST'
                }).then((res) => {
                    echartDataArray = JSON.parse(JSON.stringify(res.data))
                    echartDataArray.forEach(element => {
                        demo1.push(parseFloat(element.quality))
                    });
                    echartDataArray.forEach(e => {
                        time1.push(e.time)
                    })
                    time = time1.reverse()
                    demo = demo1.reverse()
                })

                qualityEcharts.setOption({
                    xAxis: {
                        data: time
                    },
                    series: [
                        {
                            data: demo
                        }
                    ]
                });
                for (var i = 0; i < 10; i++) {
                    time.shift();
                    demo.shift()
                }
            }, 1000);
            option && qualityEcharts.setOption(option);
            window.addEventListener("resize", function () {
                qualityEcharts.resize();
            });

        }
    }
}
</script>

<style lang="scss" scoped>
.qualityEcharts {
    width: 100%;
    height: 100%;
}
</style>
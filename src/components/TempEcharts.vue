<template>
    <div id="tempEcharts" class="tempEcharts"></div>
</template>

<script>
import * as echarts from 'echarts'
import { onMounted, onBeforeUnmount, ref } from 'vue';
import axios from 'axios';
export default {
    props: {
        echartDataArray: Array
    },
    setup(props) {
        const timer = ref("")
        let temp = []
        let time = []
        let tempReverse = []
        let timeReverse = []

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

                props.echartDataArray.forEach(element => {
                    temp.push(parseFloat(element.temp))
                });
                props.echartDataArray.forEach(e => {
                    time.push(e.time)
                })
                timeReverse = time.reverse()
                tempReverse = temp.reverse()


                tempEcharts.setOption({
                    xAxis: {
                        data: timeReverse
                    },
                    series: [
                        {
                            data: tempReverse
                        }
                    ]
                });
                for (var i = 0; i < 5; i++) {
                    timeReverse.shift();
                    tempReverse.shift()
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
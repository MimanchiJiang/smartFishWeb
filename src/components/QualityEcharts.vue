<template>
    <div id="qualityEcharts" class="qualityEcharts">
    </div>
</template>
<script>
import * as echarts from 'echarts'
import { onMounted, ref, onBeforeUnmount } from 'vue';
import axios from 'axios';
export default {
    props: {
        echartDataArray: Array
    },
    setup(props) {
        const timer = ref("")
        let quality = []
        let time = []
        let qualityReverse = []
        let timeReverse = []

        onMounted(() => {
            qualityEcharts()
            console.log(props.echartDataArray)
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
                    // axisLabel: {
                    //     rotate: 45,
                    // },
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
            timer.value = setInterval(() => {
                props.echartDataArray.forEach(element => {
                    quality.push(parseFloat(element.quality))
                });
                props.echartDataArray.forEach(e => {
                    time.push(e.time)
                })
                timeReverse = time.reverse()
                qualityReverse = quality.reverse()
                qualityEcharts.setOption({
                    xAxis: {
                        data: timeReverse
                    },
                    series: [
                        {
                            data: qualityReverse
                        }
                    ]
                });
                for (var i = 0; i < 5; i++) {
                    timeReverse.shift();
                    qualityReverse.shift()
                }
            }, 1000);
            option && qualityEcharts.setOption(option);
            window.addEventListener("resize", function () {
                qualityEcharts.resize();
            });
            onBeforeUnmount(() => {
                console.log(props.echartDataArray)
                clearInterval(timer.value)
            })

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
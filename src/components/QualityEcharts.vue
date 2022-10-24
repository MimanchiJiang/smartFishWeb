<template>
    <div id="qualityEcharts" class="qualityEcharts">
    </div>
</template>

<script>
import * as echarts from 'echarts'
import { onMounted } from 'vue';
export default {
    setup() {
        onMounted(() => {
            qualityEcharts()
        })
        const qualityEcharts = () => {
            const chartDom = document.getElementById('qualityEcharts');
            const qualityEcharts = echarts.init(chartDom);
            let data = [];
            let now = new Date(1997, 9, 3);
            let oneDay = 24 * 3600 * 1000;
            let value = Math.random() * 1000;
            const randomData = () => {
                now = new Date(+now + oneDay);
                value = value + Math.random() * 21 - 10;
                return {
                    name: now.toString(),
                    value: [
                        [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
                        Math.round(value)
                    ]
                };
            }
            for (var i = 0; i < 1000; i++) {
                data.push(randomData());
            }

            const option = {
                title: {
                    text: '水质检测'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        params = params[0];
                        var date = new Date(params.name);
                        return (
                            date.getDate() +
                            '/' +
                            (date.getMonth() + 1) +
                            '/' +
                            date.getFullYear() +
                            ' : ' +
                            params.value[1]
                        );
                    },
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'time',
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%'],
                    splitLine: {
                        show: false
                    }
                },
                series: [
                    {
                        name: 'Fake Data',
                        type: 'line',
                        showSymbol: false,
                        data: data
                    }
                ]
            };
            setInterval(function () {
                for (var i = 0; i < 5; i++) {
                    data.shift();
                    data.push(randomData());
                }
                qualityEcharts.setOption({
                    series: [
                        {
                            data: data
                        }
                    ]
                });
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
<template>
    <div class="equipment">
        <div class="equipment-echarts">
            <div class="equipment-echarts-topnav">
                <div class="mqtt-status">
                    <span>mqtt:</span>
                    <div :class="mqttStatus ? 'mqtt-status-greenCircle' : 'mqtt-status-redCircle'"></div>
                </div>
                <div class="equipment-echarts-topnav-title">
                    智能鱼缸设备展示页面
                </div>
            </div>
            <div class="echarts-quality">
                <QualityEcharts :echartDataArray="echartDataArray" />
            </div>
            <div class="echarts-temp">
                <TempEcharts :echartDataArray="echartDataArray" />
            </div>
        </div>
        <div class="equipment-sideBar">
            <div class="equipment-status">
                <div class="equipment-status-top">
                    <span>设备状态显示模块</span>
                </div>
                <div class="equipment-status-content">
                    <div class="equipment-status-content-light">
                        <span>灯光</span>
                        <div class="light-status"></div>
                    </div>
                    <div class="equipment-status-content-temp">
                        <span>温度传感器</span>
                        <div class="temp-status"></div>
                    </div>
                    <div class="equipment-status-content-servo">
                        <span>舵机</span>
                        <div class="servo-status"></div>
                    </div>
                    <div class="equipment-status-content-quality">
                        <span>水质传感器</span>
                        <div class="quality-status"></div>
                    </div>
                    <div class="equipment-status-content-pump">
                        <span>水泵</span>
                        <div class="pump-status"></div>
                    </div>
                </div>
            </div>
            <div class="equipment-control">
                <div class="equipment-control-top">
                    <span>设备控制模块</span>
                </div>
                <div class="equipment-control-content">
                    <div class="equipment-control-content-light">
                        <span>灯带开关</span>
                        <div>
                            <el-switch v-model="lightStatus" @click="lightControl" />
                        </div>
                    </div>
                    <div class="equipment-control-content-pump">
                        <span>水泵开关</span>
                        <div>
                            <el-switch v-model="pumpStatus" @click="pumpControl" />
                        </div>
                    </div>
                    <div class="equipment-control-content-servo">
                        <div>
                            <span>定时喂食（h）</span>
                            <el-input-number v-model="servoTime" :min="1" :max="10" @change="handleChange" />
                        </div>
                        <el-button type="success" round @click="TimingFeed">发送</el-button>
                    </div>
                    <span>自动模式开关</span>
                    <el-switch v-model="autoStatus" @click="autoControl" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import QualityEcharts from './QualityEcharts.vue';
import TempEcharts from './TempEcharts.vue';
import { ref, onMounted, onBeforeUnmount, onBeforeMount, toRefs } from 'vue'
import axios from 'axios'
export default {
    components: { QualityEcharts, TempEcharts },
    setup() {
        const lightStatus = ref(true)
        const pumpStatus = ref(true)
        const servoTime = ref(1)
        const mqttStatus = ref(false)
        const timer = ref("")
        const autoStatus = ref(true)

        let echartDataArray = ref([])

        const lightControl = () => {
            axios({
                url: 'http://localhost:8888/light',
                method: 'POST',
                responseType: 'json',
                data: JSON.stringify({ light: lightStatus.value, pump: pumpStatus.value, temp: echartDataArray.value[4].temp, quality: echartDataArray.value[4].quality })
            })
            console.log(lightStatus.value)

        }
        const autoControl = () => {
            axios({
                url: 'http://localhost:8888/autoControl',
                method: 'POST',
                data: JSON.stringify({ autoStatus: autoStatus.value })
            })
        }
        const TimingFeed = () => {
            axios({
                url: 'http://localhost:8888/TimingFeed',
                method: 'POST',
                data: JSON.stringify({ servoTime: servoTime.value })
            }).then((res) => {
                console.log(res)
                window.alert(`定时成功，将在${servoTime.value}小时后进行喂食`)
            })
        }

        const pumpControl = () => {
            axios({
                url: 'http://localhost:8888/pump',
                method: 'POST',
                responseType: 'json',
                data: JSON.stringify({ light: lightStatus.value, pump: pumpStatus.value, temp: echartDataArray.value[4].temp, quality: echartDataArray.value[4].quality })
            })
        }
        onBeforeMount(() => {
            axios({
                url: 'http://localhost:8888/mqtt',
                method: 'POST',
            }).then((res) => {
                console.log(res.data)
                if (res.data == 'connected') { mqttStatus.value = true } else {
                    mqttStatus.value = false
                }
            })
        })

        onMounted(() => {
            timer.value = setInterval(() => {
                axios({
                    url: 'http://localhost:8888/echartData',
                    method: 'POST'
                }).then((res) => {
                    echartDataArray.value = JSON.parse(JSON.stringify(res.data))
                    console.log(echartDataArray.value[4].temp)
                })


                axios({
                    url: 'http://localhost:8888/data',
                    method: 'POST'
                }).then((res) => {
                    if (res.data[0].light == '0') {
                        lightStatus.value = false
                    }
                    if (res.data[0].light == '1') {
                        lightStatus.value = true
                    }
                    if (res.data[0].pump == '0') {
                        pumpStatus.value = false
                    }
                    if (res.data[0].pump == '1') {
                        pumpStatus.value = true
                    }
                    if (res.data[0].autoControl == '0') {
                        autoStatus.value = false
                    }
                    if (res.data[0].autoControl == '1') {
                        autoStatus.value = true
                    }
                })
            }, 1000)
        })

        onBeforeUnmount(() => {
            clearInterval(timer.value)
        })

        return {
            lightStatus, pumpStatus, servoTime, mqttStatus, echartDataArray, autoStatus, lightControl, pumpControl, TimingFeed, autoControl
        }
    }
}
</script>
<style lang="scss" scoped>
.equipment {
    display: flex;
    width: 100%;


    .equipment-echarts {
        display: flex;
        height: 90vh;
        flex-grow: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &-topnav {
            display: flex;
            align-items: center;
            width: 100%;

            .mqtt-status {
                display: flex;
                justify-content: center;
                align-items: center;

                >span {
                    font-size: 20px;
                    margin-right: 5px;
                }


                &-greenCircle {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: green;
                    background-image: radial-gradient(lime, transparent);
                    background-size: 5px 5px;
                }

                &-redCircle {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: rgb(221, 3, 3);
                    background-image: radial-gradient(rgb(255, 153, 0), transparent);
                    background-size: 5px 5px;
                }
            }

            &-title {
                flex-grow: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
                font-size: 25px;
                font-weight: bolder;
                margin-right: 100px;
            }
        }



        .echarts-temp {
            background-color: #fff;
            border-radius: 50px;
            width: 90%;
            height: 40%;
            margin-top: 20px;
        }

        .echarts-quality {
            width: 90%;
            height: 40%;
            margin-top: 20px;
            background-color: #fff;
            border-radius: 50px;

        }
    }

    .equipment-sideBar {
        width: 30%;
        height: 90vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .equipment-status {
            width: 100%;
            height: 50%;
            display: flex;
            flex-direction: column;


            &-top {
                height: 10%;
                text-align: center;
                line-height: 52px;
                font-size: 20px;
                font-weight: bolder;
            }

            &-content {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                &-light {
                    height: 15%;
                    width: 80%;
                    background-color: #fff;
                    border-radius: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    >span {
                        width: 6rem;
                        text-align: center;
                        font-size: 20px;
                        margin-right: 20px;
                    }

                    >div {
                        background: green;
                        background-image: radial-gradient(lime, transparent);
                        background-size: 5px 5px;
                        width: 25px;
                        height: 25px;
                        border-radius: 50%;
                    }
                }

                &-temp {
                    height: 15%;
                    width: 80%;
                    margin-top: 20px;
                    background-color: #fff;
                    border-radius: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    >span {
                        width: 6rem;
                        text-align: center;
                        margin-right: 20px;
                        font-size: 20px;
                    }

                    >div {
                        background: green;
                        background-image: radial-gradient(lime, transparent);
                        background-size: 5px 5px;
                        width: 25px;
                        height: 25px;
                        border-radius: 50%;
                    }
                }

                &-servo {
                    height: 15%;
                    width: 80%;
                    margin-top: 20px;
                    background-color: #fff;
                    border-radius: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    >span {
                        width: 6rem;
                        font-size: 20px;
                        margin-right: 20px;
                        text-align: center;
                    }

                    >div {
                        background: green;
                        background-image: radial-gradient(lime, transparent);
                        background-size: 5px 5px;
                        width: 25px;
                        height: 25px;
                        border-radius: 50%;
                    }
                }

                &-quality {
                    height: 15%;
                    width: 80%;
                    margin-top: 20px;
                    background-color: #fff;
                    border-radius: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    >span {
                        width: 6rem;
                        font-size: 20px;
                        margin-right: 20px;
                        text-align: center;
                    }

                    >div {
                        background: green;
                        background-image: radial-gradient(lime, transparent);
                        background-size: 5px 5px;
                        width: 25px;
                        height: 25px;
                        border-radius: 50%;
                    }
                }

                &-pump {
                    height: 15%;
                    width: 80%;
                    margin-top: 20px;
                    background-color: #fff;
                    border-radius: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    >span {
                        width: 6rem;
                        font-size: 20px;
                        margin-right: 20px;
                        text-align: center;
                    }

                    >div {
                        background: green;
                        background-image: radial-gradient(lime, transparent);
                        background-size: 5px 5px;
                        width: 25px;
                        height: 25px;
                        border-radius: 50%;
                    }
                }
            }
        }

        .equipment-control {
            width: 100%;
            height: 50%;
            display: flex;
            flex-direction: column;

            &-top {
                height: 10%;
                text-align: center;
                border-radius: 5px;
                font-size: 20px;
                line-height: 52px;
                font-weight: bolder;
            }

            &-content {
                flex-grow: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;

                &-light {
                    width: 80%;
                    height: 15%;
                    margin-top: 5%;
                    background-color: #fff;
                    border-radius: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    >span {
                        width: 6rem;
                        font-size: 20px;
                        margin-right: 20px;
                        text-align: center;
                    }
                }

                &-pump {
                    width: 80%;
                    height: 15%;
                    margin-top: 5%;
                    background-color: #fff;
                    border-radius: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    >span {
                        width: 6rem;
                        font-size: 20px;
                        margin-right: 20px;
                        text-align: center;
                    }
                }

                &-servo {
                    width: 80%;
                    height: 15%;
                    margin: 5% 0;
                    background-color: #fff;
                    border-radius: 30px;
                    flex-grow: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;

                    >div {
                        padding: 20px;
                        margin-bottom: 20px;
                        justify-content: space-around;
                        font-size: 20px;
                        display: flex;
                    }

                }

            }
        }
    }
}
</style>
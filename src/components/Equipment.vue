<template>
    <div class="equipment">
        <div class="equipment-echarts">
            <div class="equipment-echarts-topnav">
                <div class="mqtt-status">
                    <span>mqtt:</span>
                    <div :class="mqttStatus ? 'mqtt-status-greenCircle' : 'mqtt-status-redCircle'"></div>
                </div>
                <div class="equipment-echarts-topnav-title">
                    智能鱼缸设备数据展示页面
                    <div class="helpIcon">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-bangzhu"></use>
                        </svg>
                        <div class="introduction">
                            <div>
                                <ul>
                                    <li>
                                        <h3>水质</h3>
                                    </li>
                                    <li><span>正常水质系数为25-40之间；若系数低于25但高于10，则说明有些浑浊，需换水；若系数低于10，则说明需要马上换水</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul>
                                    <li>
                                        <h3>水温</h3>
                                    </li>
                                    <li><span>
                                            金鱼等常见鱼类适宜水温为0℃-30℃，20℃-24℃最适合鱼类生活；若饲养的鱼类为热带鱼类，水温则需达到20℃-30℃
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

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
            <div class="equipment-control">
                <div class="equipment-control-top">
                    <span>设备控制模块</span>
                </div>
                <div class="equipment-control-content">
                    <div class="equipment-control-content-auto">
                        <span>自动模式开关</span>
                        <div>
                            <el-switch v-model="autoStatus" @click="autoControl" />
                        </div>
                    </div>
                    <div class="equipment-control-content-light">
                        <div class="lightContent">
                            <span>灯带开关</span>
                            <div>
                                <el-switch v-model="lightStatus" @click="lightControl" />
                            </div>
                        </div>
                    </div>
                    <div class="equipment-control-content-light">
                        <el-button class="lightShowModel" @click="lightState">灯带照明模式{{ lightShowModel }}</el-button>
                    </div>
                    <div class="equipment-control-content-pump">
                        <span>加水开关</span>
                        <div>
                            <el-switch v-model="pumpInStatus" @click="pumpInControl" />
                        </div>
                    </div>
                    <div class="equipment-control-content-pump">
                        <span>抽水开关</span>
                        <div>
                            <el-switch v-model="pumpOutStatus" @click="pumpOutControl" />
                        </div>
                    </div>

                    <div class="equipment-control-content-pump">
                        <span>充氧开关</span>
                        <div>
                            <el-switch v-model="airPumpStatus" @click="airPumpControl" />
                        </div>
                    </div>
                    <div class="equipment-control-content-pump">
                        <span>加热开关</span>
                        <div>
                            <el-switch v-model="heatStatus" @click="heatControl" />
                        </div>
                    </div>
                    <div class="equipment-control-content-servo">
                        <div>
                            <span>定时喂食(h)</span>
                            <el-input-number v-model="servoTime" :min="1" :max="10" @change="handleChange" />
                        </div>
                        <div>
                            <el-button type="success" round @click="feedNow">立即喂食</el-button>
                            <el-button type="success" round @click="TimingFeed">定时喂食</el-button>
                        </div>

                    </div>
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
import { useRoute } from 'vue-router'
export default {
    components: { QualityEcharts, TempEcharts },
    setup() {
        const lightStatus = ref(true)
        const pumpInStatus = ref(true)
        const pumpOutStatus = ref(true)
        const mqttStatus = ref(false)
        const autoStatus = ref(true)
        const feedStatus = ref(true)
        const heatStatus = ref(false)
        const airPumpStatus = ref(false)
        const timer = ref("")
        const servoTime = ref(1)
        const lightShowState = ref(1)
        const lightShowModel = ref(1)
        let echartDataArray = ref([])
        const username = useRoute().query.username



        const lightState = () => {
            console.log("111")
            axios({
                url: 'http://localhost:8888/lightState',
                method: 'POST',
                responseType: 'json',
                data: JSON.stringify({ lightShowState: lightShowState.value })
            })
            console.log(lightStatus.value)
            if (lightShowState.value < 3) {
                lightShowState.value++;
                lightShowModel.value++;
            } else {
                lightShowState.value = 1
                lightShowModel.value = 1
            }


        }
        const heatControl = () => {
            axios({
                url: 'http://localhost:8888/heat',
                method: 'POST',
                responseType: 'json',
                data: JSON.stringify({ light: lightStatus.value, heat: heatStatus.value, username, airPump: airPumpStatus.value, lightShowState: lightShowState.value, pumpin: pumpInStatus.value, pumpout: pumpOutStatus.value, temp: echartDataArray.value[4].temp, quality: echartDataArray.value[4].quality })
            })
            console.log(lightStatus.value)
        }


        const lightControl = () => {
            axios({
                url: 'http://localhost:8888/light',
                method: 'POST',
                responseType: 'json',
                data: JSON.stringify({ light: lightStatus.value, heat: heatStatus.value, username, airPump: airPumpStatus.value, lightShowState: lightShowState.value, pumpin: pumpInStatus.value, pumpout: pumpOutStatus.value, temp: echartDataArray.value[4].temp, quality: echartDataArray.value[4].quality })
            })
            console.log(lightStatus.value)
        }

        const airPumpControl = () => {
            axios({
                url: 'http://localhost:8888/airPump',
                method: 'POST',
                responseType: 'json',
                data: JSON.stringify({ light: lightStatus.value, heat: heatStatus.value, username, airPump: airPumpStatus.value, lightShowState: lightShowState.value, pumpin: pumpInStatus.value, pumpout: pumpOutStatus.value, temp: echartDataArray.value[4].temp, quality: echartDataArray.value[4].quality })
            })
            console.log(lightStatus.value)
        }

        const autoControl = () => {
            axios({
                url: 'http://localhost:8888/autoControl',
                method: 'POST',
                data: JSON.stringify({ autoStatus: autoStatus.value }),

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
        const feedNow = () => {
            axios({
                url: 'http://localhost:8888/Feed',
                method: 'POST',
                data: JSON.stringify({ feedState: feedStatus.value })
            }).then((res) => {
                console.log(res)
            })
        }

        const pumpInControl = () => {
            axios({
                url: 'http://localhost:8888/pumpin',
                method: 'POST',
                responseType: 'json',
                data: JSON.stringify({ light: lightStatus.value, heat: heatStatus.value, username, airPump: airPumpStatus.value, lightShowState: lightShowState.value, pumpin: pumpInStatus.value, pumpout: pumpOutStatus.value, temp: echartDataArray.value[4].temp, quality: echartDataArray.value[4].quality })
            })
        }
        const pumpOutControl = () => {
            axios({
                url: 'http://localhost:8888/pumpout',
                method: 'POST',
                responseType: 'json',
                data: JSON.stringify({ light: lightStatus.value, heat: heatStatus.value, username, airPump: airPumpStatus.value, lightShowState: lightShowState.value, pumpin: pumpInStatus.value, pumpout: pumpOutStatus.value, temp: echartDataArray.value[4].temp, quality: echartDataArray.value[4].quality })
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
                    // 宽带
                    // url: 'http://10.149.3.126:8888/echartData',
                    method: 'POST'
                }).then((res) => {
                    echartDataArray.value = JSON.parse(JSON.stringify(res.data))
                })


                axios({
                    url: 'http://localhost:8888/data',
                    method: 'POST'
                }).then((res) => {
                    console.log(res)
                    if (res.data[0].light == '0') {
                        lightStatus.value = false
                    }
                    if (res.data[0].light == '1') {
                        lightStatus.value = true
                    }
                    if (res.data[0].pump == '0') {
                        pumpInStatus.value = false
                    }
                    if (res.data[0].pump == '1') {
                        pumpInStatus.value = true
                    }
                    if (res.data[0].pumpout == '0') {
                        pumpOutStatus.value = false
                    }
                    if (res.data[0].pumpout == '1') {
                        pumpOutStatus.value = true
                    }
                    if (res.data[0].autoControl == '0') {
                        autoStatus.value = false
                    }
                    if (res.data[0].autoControl == '1') {
                        autoStatus.value = true
                    }
                    if (res.data[0].airPump == '0') {
                        airPumpStatus.value = false
                    }
                    if (res.data[0].airPump == '1') {
                        airPumpStatus.value = true
                    }
                    if (res.data[0].heat == '0') {
                        heatStatus.value = false
                    }
                    if (res.data[0].heat == '1') {
                        heatStatus.value = true
                    }

                })
            }, 1000)
        })

        onBeforeUnmount(() => {
            clearInterval(timer.value)
        })

        return {
            lightStatus, lightShowState, lightShowModel, feedStatus, pumpInStatus, pumpOutStatus, servoTime, mqttStatus, airPumpStatus, echartDataArray, autoStatus, heatStatus, lightControl, feedNow, pumpInControl, pumpOutControl, TimingFeed, autoControl, lightState, airPumpControl, heatControl
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

                .introduction {
                    font-weight: 300;
                    font-size: 15px;
                    z-index: 99;
                    background-color: rgb(249, 249, 249);
                    position: absolute;
                    top: 17%;
                    left: 45%;
                    display: none;
                    padding: 20px;
                    width: 300px;
                }

                .helpIcon {
                    svg {
                        width: 25px;
                        height: 25px;
                        margin-left: 5px;
                    }

                    &:hover .introduction {
                        display: block;
                    }
                }
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
        height: 95vh;
        display: flex;
        flex-direction: column;
        margin-top: 45px;
        /* justify-content: center;
        align-items: center; */

        .equipment-status {
            width: 100%;
            height: 70%;
            display: flex;
            flex-direction: column;


            &-top {
                height: 10%;
                text-align: center;
                line-height: 52px;
                font-size: 25px;
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
            height: 85%;
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

                &-auto {
                    width: 80%;
                    height: 15%;
                    margin-top: 5%;
                    background-color: #fff;
                    border-radius: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    >span {
                        width: 10rem;
                        font-size: 20px;
                        margin-right: 20px;
                        text-align: center;
                    }
                }

                &-light {
                    width: 80%;
                    height: 15%;
                    margin-top: 5%;
                    background-color: #fff;
                    border-radius: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;

                    .lightShowModel {
                        font-size: 20px;
                    }

                    .lightContent {
                        display: flex;
                        flex-direction: row;

                        >span {
                            width: 10rem;
                            font-size: 20px;
                            margin-right: 20px;
                            text-align: center;
                        }
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
                        width: 10rem;
                        font-size: 20px;
                        margin-right: 20px;
                        text-align: center;
                    }
                }

                &-servo {
                    width: 80%;
                    height: 30%;
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
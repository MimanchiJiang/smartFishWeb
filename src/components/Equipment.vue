<template>
    <div class="equipment">
        <div class="equipment-echarts">
            <div class="echarts-quality">
                <QualityEcharts />
            </div>
            <div class="echarts-temp">
                <TempEcharts />
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
                            <el-switch v-model="value1" />
                        </div>
                    </div>
                    <div class="equipment-control-content-pump">
                        <span>水泵开关</span>
                        <div>
                            <el-switch v-model="value2" />
                        </div>
                    </div>
                    <div class="equipment-control-content-servo">
                        <span>舵机开关</span>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import QualityEcharts from './QualityEcharts.vue';
import TempEcharts from './TempEcharts.vue';
import { ref } from 'vue'
export default {
    components: { QualityEcharts, TempEcharts },
    setup() {
        const value1 = ref(true)
        const value2 = ref(true)

        return {
            value1, value2
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
                        background-color: green;
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
                        background-color: green;
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
                        background-color: green;
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
                        background-color: green;
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
                        background-color: green;
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
                    margin: 5% 0;
                    flex-grow: 1;
                    background-color: #fff;
                    border-radius: 30px;
                }

            }
        }
    }
}
</style>
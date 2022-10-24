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
                    equipment-status-topBar
                </div>
                <div class="equipment-status-content">
                    <div class="equipment-status-content-light"></div>
                    <div class="equipment-status-content-temp"></div>
                    <div class="equipment-status-content-servo"></div>
                    <div class="equipment-status-content-quality"></div>
                    <div class="equipment-status-content-pump"></div>
                </div>
            </div>
            <div class="equipment-control">
                <div class="equipment-control-top">
                    equipment-control-top
                </div>
                <div class="equipment-control-content">
                    <div class="equipment-control-content-light"></div>
                    <div class="equipment-control-content-pump"></div>
                    <div class="equipment-control-content-servo"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import QualityEcharts from './QualityEcharts.vue';
import TempEcharts from './TempEcharts.vue';
export default {
    components: { QualityEcharts, TempEcharts },
}
</script>
<style lang="scss" scoped>
.equipment {
    border: 1px solid red;
    display: flex;
    width: 100%;

    .equipment-echarts {
        border: 1px solid red;
        display: flex;
        height: 90vh;
        flex-grow: 1;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .echarts-temp {
            border: 1px solid red;
            width: 90%;
            height: 40%;
            margin-top: 20px;
        }

        .echarts-quality {
            border: 1px solid red;
            width: 90%;
            height: 40%;
            margin-top: 20px;

        }
    }

    .equipment-sideBar {
        width: 30%;
        height: 90vh;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .equipment-status {
            border: 1px solid red;
            width: 100%;
            height: 50%;
            display: flex;
            flex-direction: column;

            &-top {
                border: 1px solid gold;
                height: 10%;
            }

            &-content {
                flex-grow: 1;
                border: 1px solid red;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                &-light {
                    border: 1px solid black;
                    height: 15%;
                    width: 80%;
                }

                &-temp {
                    border: 1px solid black;
                    height: 15%;
                    width: 80%;
                    margin-top: 20px;

                }

                &-servo {
                    border: 1px solid black;
                    height: 15%;
                    width: 80%;
                    margin-top: 20px;

                }

                &-quality {
                    border: 1px solid black;
                    height: 15%;
                    width: 80%;
                    margin-top: 20px;

                }

                &-pump {
                    border: 1px solid black;
                    height: 15%;
                    width: 80%;
                    margin-top: 20px;
                }
            }
        }

        .equipment-control {
            border: 1px solid red;
            width: 100%;
            height: 50%;
            display: flex;
            flex-direction: column;

            &-top {
                border: 1px solid gold;
                height: 10%;
            }

            &-content {
                flex-grow: 1;
                border: 1px solid red;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;

                &-light {
                    border: 1px solid red;
                    width: 80%;
                    height: 15%;
                    margin-top: 5%;
                }

                &-pump {
                    border: 1px solid red;
                    width: 80%;
                    height: 15%;
                    margin-top: 5%;

                }

                &-servo {
                    border: 1px solid red;
                    width: 80%;
                    margin: 5% 0;
                    flex-grow: 1;
                }

            }
        }
    }
}
</style>
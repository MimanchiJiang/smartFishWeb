<template>
    <div class="history">
        <div class="history-top">
            <span>关键字:</span>
            <el-input v-model="input" placeholder="Please input" clearable @clear="history" @keydown.enter="select" />
            <el-button @click="select()">查询</el-button>
        </div>
        <div class="history-data">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="" label="" width="200" />
                <el-table-column prop="light" label="灯带" width="200" />
                <el-table-column prop="pump" label="水泵" width="200" />
                <el-table-column prop="feed" label="舵机" width="200" />
                <el-table-column prop="quality" label="水质" width="200" />
                <el-table-column prop="temp" label="温度" width="200" />
                <el-table-column prop="time" label="时间" />
            </el-table>
            <div class="fixed"><a href="#top">Back</a></div>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'
const input = ref('')
const tableData = ref([])




const select = () => {
    axios({
        url: 'http://localhost:8888/select',
        method: 'POST',
        responseType: 'json',
        data: JSON.stringify({ input: input.value })
    }).then((res) => {
        tableData.value = res.data
    })
}
const history = () => {
    axios({
        url: 'http://localhost:8888/history',
        method: 'POST',
    }).then((res) => {
        console.log(res)
        tableData.value = res.data
    })
}

onMounted(() => {
    history()
})
</script>
<style lang="scss" scoped>
.history {
    display: flex;
    width: 100%;
    flex-direction: column;


    &-top {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-top: 50px;

        >span {
            width: 130px;
            font-size: 20px;
        }
    }

    &-data {
        margin-top: 50px;
    }

    .fixed {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        position: fixed;
        right: 0;
        bottom: 0;
        background-color: #fff;
        line-height: 100px;
        text-align: center;
    }
}
</style>
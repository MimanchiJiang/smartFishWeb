<template>
    <div class="history">
        <div class="history-top">
            <el-radio-group v-model="radio" @change="select" size="large">
                <el-radio size="large" border label="all">全部</el-radio>
                <el-radio label="light" border>灯带</el-radio>
                <el-radio label="pump" border>水泵</el-radio>
                <el-radio label="feed" border>舵机</el-radio>
                <el-radio label="quality" border>水质</el-radio>
                <el-radio label="temp" border>温度</el-radio>

            </el-radio-group>
        </div>
        <div class="history-data">
            <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%">
                <el-table-column prop="" label="" width="100" />
                <el-table-column prop="light" label="灯带" align="center" width="200" />
                <el-table-column prop="pump" label="水泵" align="center" width="200" />
                <el-table-column prop="feed" label="舵机" align="center" width="200" />
                <el-table-column prop="quality" label="水质" align="center" width="200" />
                <el-table-column prop="temp" label="温度" align="center" width="200" />
                <el-table-column prop="time" label="时间" align="center" width="200" sortable />
            </el-table>
            <el-pagination layout=" prev, pager, next, jumper" :total="tableData.length" @size-change="handleSizeChange"
                @current-change="handleCurrentChange" :page-size="pageSize">
            </el-pagination>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'
const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(20)
const radio = ref("")

const timestampToTime = (timestamp) => {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = date.getDate() + ' ';
    var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
    return Y + M + D + h + m + s;
}


const select = () => {
    if (radio.value != 'all') {
        axios({
            url: 'http://localhost:8888/select',
            method: 'POST',
            responseType: 'json',
            data: JSON.stringify({ input: radio.value })
        }).then((res) => {
            tableData.value = res.data
            console.log(tableData.value)
            pretreatment(res.data)
        })
    } else {
        axios({
            url: 'http://localhost:8888/history',
            method: 'POST',
        }).then((res) => {
            tableData.value = res.data
            pretreatment(res.data)
        })
    }

    console.log(radio.value)
}
const pretreatment = (tableData) => {
    tableData.forEach((e) => {
        //@ts-ignore
        e.time = timestampToTime(Date.parse(e.time))
        //@ts-ignore
        if (e.light && e.light == '0') {
            //@ts-ignore
            e.light = '关闭'
        } else if (e.light && e.light == '1') {
            //@ts-ignore
            e.light = '开启'
        }
        //@ts-ignore
        if (e.pump && e.pump == '0') {
            //@ts-ignore
            e.pump = '关闭'
        } else if (e.pump && e.pump == '1') {
            //@ts-ignore
            e.pump = '开启'
        }
        //@ts-ignore
        if (e.feed && e.feed == '0') {
            //@ts-ignore
            e.feed = '关闭'
        } else if (e.feed && e.feed == '1') {
            //@ts-ignore
            e.feed = '开启'
        }
    })
    tableData.value = tableData
}
const history = () => {
    axios({
        url: 'http://localhost:8888/history',
        method: 'POST',
    }).then((res) => {
        tableData.value = res.data
        console.log(tableData.value)
        pretreatment(res.data)
    })
}

const handleSizeChange = (val) => {
    console.log(`每页 ${val} 条`);
    currentPage.value = 1;
    pageSize.value = val;
}

const handleCurrentChange = (val) => {
    console.log(`当前页: ${val}`);
    currentPage.value = val;
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
        margin-top: 30px;

        >span {
            width: 130px;
            font-size: 20px;
        }
    }

    &-data {
        margin-top: 50px;
    }
}
</style>
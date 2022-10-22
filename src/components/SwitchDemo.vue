<template>
    <h1>Switch 示例</h1>
    <div>
        <Demo :component="Switch1Demo"></Demo>
        <Demo :component="Switch2Demo"></Demo>

    </div>
</template>
<script lang="ts">
import Switch1Demo from './Switch1.demo.vue'
import Switch2Demo from './Switch2.demo.vue'
import Demo from './Demo.vue'
export default {
    components: {
        Demo
    },
    setup() {
        return {
            Switch1Demo, Switch2Demo
        }
    },
}
</script>

<style lang="scss" scoped>
h1 {
    text-shadow: 0 2px 6px rgb(0 0 0 / 20%);
}
</style>
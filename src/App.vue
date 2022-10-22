<template>
  <router-view />
</template>

<script>
import { provide, ref } from 'vue';
import { router } from './router';


export default {
  name: 'App',
  setup() {
    const width = document.documentElement.clientWidth
    const asideVisible = ref(width <= 800 ? false : true)
    provide('asideVisible', asideVisible) //标记 子组件可以使用
    router.afterEach(() => {
      if (width <= 800) {
        asideVisible.value = false
      }
    })
  }
}
</script>

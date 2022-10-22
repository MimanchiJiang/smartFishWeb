<demo>
常规使用
</demo>
<template>
    <Button @click="toggle">打开对话框</Button>
    <Dialog v-model:visible="x" :closeOnClickOverlay="false" :ok="f1" :cancel="f2">
        <template v-slot:content>
            <h1>hi</h1>
            <div>some content</div>
        </template>
        <template v-slot:title>
            <strong>加粗的标题</strong>
        </template>
    </Dialog>
</template>
<script lang="ts">
import Button from '../lib/Button.vue'
import Dialog from '../lib/Dialog.vue'
import { openDialog } from '../lib/openDialog';
import { ref } from 'vue';

export default {
    components: {
        Button, Dialog
    },
    setup() {
        const x = ref(false)
        const toggle = () => {
            x.value = !x.value
        }
        const f1 = () => {
            return true
        }
        const f2 = () => { }
        return {
            x,
            toggle,
            f1,
            f2
        }
    }
}
</script>
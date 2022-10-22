<template>
    <article class="markdown-body markdown" v-html="content">
    </article>
</template>

<script lang="ts">
export default {
    props: {
        content: {
            type: String,
            required: true
        }
    },

}
</script>
<style lang="scss" scoped>
.markdown {
    font-size: 16px;
    padding: 10px 0 10px 15px;
}
</style>
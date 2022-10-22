<template>
    <div class="topnav">
        <div class="logo">
            <router-link to="/">
                <svg class="icon">
                    <use xlink:href="#icon-logo"></use>
                </svg>
            </router-link>
        </div>
        <ul class="menu">
            <li>
                <a href="https://github.com/MimanchiJiang/xue-vue3" target="_blank">GitHub</a>
            </li>
            <li>
                <a href="https://i.csdn.net/#/user-center/profile?spm=1000.2115.3001.5111" target="_blank">CSDN</a>
            </li>
            <li>
                <a href="https://www.zhihu.com/people/jiu-chi-25-63" target="_blank">知乎</a>
            </li>
            <li>
                <router-link to="/">首页</router-link>
            </li>


        </ul>
        <span class="toggleAside" @click="toggleMenu">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-caidan"></use>
            </svg>
        </span>
    </div>
</template>

<script lang="ts">
import { inject, Ref } from 'vue';

export default {
    props: {
        toggleMenuButtonVisible: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const asideVisible = inject<Ref<boolean>>('asideVisible') //get
        const toggleMenu = () => {
            asideVisible!.value = !asideVisible!.value
        }
        return {
            toggleMenu
        }
    },
}
</script>
<style lang="scss" scoped>
$color: rgba(17, 17, 17, 0.85);

.topnav {
    /* border: 1px solid red; */
    text-shadow: 0 0 12px rgb(110 159 193 / 36%), 0 0 12px rgb(110 159 193 / 36%);
    color: #fff;
    background-color: $color;
    display: flex;
    padding: 16px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;

    >.logo {
        max-width: 6em;
        margin-right: auto;
        user-select: none;
        color: white;

        >svg {
            width: 32px;
            height: 32px;
        }
    }

    >.menu {
        display: flex;
        white-space: nowrap;
        flex-wrap: nowrap;
        margin-right: 100px;

        >li {
            margin: 0px 1em;
        }
    }

    >.toggleAside {
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        display: none;
        width: 32px;
        height: 32px;
        background: $color;


    }

    @media (max-width:800px) {
        background-color: rgb(17, 17, 17);

        >.menu {
            display: none;
        }

        >.logo {
            margin-right: 30px;
        }

        >.toggleAside {
            display: inline-block;
        }
    }

}
</style>
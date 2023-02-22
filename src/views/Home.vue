<template>
    <Topnav />
    <div class="topNavAndBanner">
        <div class="banner">
            <h1>智能生态鱼缸</h1>
            <h2>我像只鱼儿在你的荷塘，只为和你守候那皎白月光</h2>
            <p class="actions" @click="toggle">
                <a></a>
            </p>
        </div>
    </div>
    <div class="features">
        <ul>
            <li>
                <svg>
                    <use xlink:href="#icon-Vue"></use>
                </svg>
                <h3>基于 Vue 3</h3>
                <p>使用了 Vue 3 Composition API</p>
            </li>
            <li>
                <svg>
                    <use xlink:href="#icon-nodejs"></use>
                </svg>
                <h3>基于 NodeJS </h3>
                <p>后端代码采用 NodeJS 书写</p>
            </li>
            <li>
                <svg>
                    <use xlink:href="#icon-Fish1"></use>
                </svg>
                <h3>代码易读</h3>
                <p>每个组件的源代码都极其简洁</p>
            </li>
        </ul>

    </div>
    <Dialog v-model:visible="x" :closeOnClickOverlay="false" :ok="f1" :cancel="f2">
        <template v-slot:content>
            <Login />
        </template>
        <template v-slot:title>
            <strong>加粗的标题</strong>
        </template>
    </Dialog>
    <!-- <Login :v-show=false /> -->
</template>
<script lang="ts">
import Topnav from "../components/topnav.vue"
import Login from './Login.vue'
import { ref } from 'vue'
import Dialog from '../lib/Dialog.vue'

export default {
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
    },
    components: { Topnav, Login, Dialog }
}
</script>
<style lang="scss" scoped>
$green: #02bcb0;
$border-radius: 4px;
$color: #1bb9b2;


.features {
    margin: 64px auto;
    padding: 0 16px;

    @media (max-width: 800px) {
        >ul {
            display: flex;
            align-items: center;
            justify-content: center;

            >li {
                font-size: 15px;

                >svg {
                    width: 30px;
                    height: 30px;
                }

                >h3 {
                    font-size: 20px;
                }



            }
        }
    }

    /* 800-1200 */
    @media (min-width: 800px) {

        >ul {
            >li {
                width: 50%;
            }
        }
    }

    /* 1200以上 */
    @media (min-width: 1200px) {
        width: 1200px;

        >ul {
            >li {
                width: 33.333333%;
            }
        }
    }

    >ul {
        display: flex;
        flex-wrap: wrap;

        >li {
            width: 400px;
            margin: 16px 0;
            display: grid;
            justify-content: start;
            align-content: space-between;
            grid-template-areas:
                "icon title"
                "icon text";
            grid-template-columns: 80px auto;
            grid-template-rows: 1fr auto;

            >svg {
                grid-area: icon;
                width: 64px;
                height: 64px;

                @media (max-width: 800px) {
                    width: 50px;
                    height: 50px;
                    margin-left: 10px;
                    margin-top: 5px;
                    grid-area: icon;
                }
            }

            >h3 {
                grid-area: title;
                font-size: 28px;

                @media (max-width: 800px) {
                    grid-area: title;
                    font-size: 20px;
                }
            }

            >p {
                grid-area: text
            }

        }
    }
}



.topNavAndBanner {
    animation-duration: 15s, 80s;
    animation-timing-function: linear, linear;
    animation-delay: 0s, 0s;
    animation-iteration-count: infinite, infinite;
    animation-direction: normal, normal;
    animation-fill-mode: none, none;
    animation-play-state: running, running;
    animation-name: breath;
    background: url(../assets/background.png);
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
    /* background: linear-gradient(145deg, rgba(227, 255, 253, 1) 0%, rgba(183, 233, 230, 1) 100%); */
    clip-path: ellipse(80% 60% at 50% 40%);

    @keyframes breath {
        0% {
            background-position: 0% 0%
        }

        25% {
            background-position: 15% 15%
        }

        50% {
            background-position: 30% 30%
        }

        75% {
            background-position: 15% 15%
        }

        100% {
            background-position: 0% 0%
        }
    }
}

.banner {
    /* color: $color; */
    color: #fff;
    padding: 270px 0;
    margin-right: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 20px;

    @media (max-width: 800px) {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        padding: 100px 0;
        padding-left: 20px;
        margin-right: 30px;
        font-size: 10px;
        text-align: center;
        color: rgb(1, 132, 127);
    }

    >.actions {
        width: 356px;
        height: 76px;
        padding: 8px 0;
        background: url(../assets/action.png) no-repeat center center;

        @media (max-width: 800px) {
            width: 178px;
            height: 38px;
            background-size: cover;
        }

        >a {
            width: 48px;
            height: 48px;
            position: relative;
            display: block;
            margin: 14px auto 0;
            border-radius: 50%;
            border: 0;
            background: #fff;
            font-size: 0;
            cursor: pointer;
            outline: none;

            &::before {
                content: '';
                display: block;
                position: absolute;
                left: 50%;
                top: 50%;
                width: 28px;
                height: 28px;
                transform: translate(-50%, -50%);
                background: url(../assets/actionButtonBlack.png) no-repeat;
                transition: background 250ms linear;
            }

            &:hover::before {
                background: url(../assets/actionButtonWhite.png);

            }

            &:hover {
                text-decoration: none;
                background: transparent;
                background-position: center top;
            }

            @media (max-width: 800px) {
                width: 35px;
                height: 35px;
                margin: 1px auto 0;

                &::before {
                    width: 20px;
                    height: 20px;
                    background-size: cover;
                }
            }
        }
    }
}
</style>
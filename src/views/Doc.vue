<template>
    <div class="layout">
        <Topnav toggleMenuButtonVisible class="nav" />
        <div class="content">
            <div class="asideContent">
                <aside v-if="asideVisible">

                    <ol>
                        <li>
                            <!-- <router-link to=/doc/equipment>设备展示
                            </router-link> -->
                            <router-link :to="{ name: 'shebei' }">设备展示
                            </router-link>
                        </li>
                        <li>
                            <router-link to=/doc/history>历史记录
                            </router-link>
                        </li>
                    </ol>
                </aside>
            </div>
            <main>
                <router-view />
            </main>
        </div>
    </div>
</template>
<script lang="ts">
import Topnav from '../components/topnav.vue'
import { inject, Ref, onMounted, ref } from 'vue';

export default {
    components: { Topnav },
    setup() {
        const asideVisible = inject<Ref<boolean>>('asideVisible') //get

        return {
            asideVisible
        }
    },
}
</script>

<style lang="scss" scoped>
.layout {
    height: 100%;

    >.nav {
        flex-shrink: 0;
    }

    >.content {
        flex-grow: 1;
        padding-top: 60px;
        padding-left: 156px;

        @media (max-width: 800px) {
            padding-left: 0;
        }
    }
}

.content {
    display: flex;

    >aside {
        flex-shrink: 0;
    }

    >main {
        flex-grow: 1;
        padding: 16px 100px 16px 200px;
        background-color: rgb(242, 242, 244);

        @media (max-width: 800px) {
            padding: 16px 20px;


        }
    }
}

aside {
    scrollbar-width: none;
    /* firefox */
    -ms-overflow-style: none;
    /* IE 10+ */
    border-right: #000;
    background-color: rgb(156, 156, 156);
    width: 300px;
    padding: 100px 0;
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    overflow: scroll;

    @media (max-width: 800px) {
        background: rgba(194, 194, 194, 1);
        z-index: 1;
        font-size: 13px;
    }

    /* Firefox */
    >h2 {
        text-shadow: 0 2px 6px rgb(0 0 0 / 20%);
        color: rgb(1, 1, 1);
        margin-bottom: 4px;
        padding: 15px 0 0 58px;
    }

    >ol {
        >li {
            >a {
                background: url(../assets/sideBar-unselected.png) no-repeat;
                background-position-x: 18px;
                background-position-y: center;
                display: block;
                padding: 15px 60px;
                text-shadow: 0 2px 6px rgb(0 0 0 / 20%);
                color: rgb(1, 1, 1);
                font-size: 18px;


                @media (max-width: 800px) {
                    font-size: 13px;
                }

            }

            .router-link-active {
                background: url(../assets/sideBar-selected.png);
                background-position-x: left;
                background-position-y: center;
                color: #fff;

                &::after {
                    content: '';
                    position: absolute;
                    width: 5px;
                    height: 57px;
                    right: 0;
                    background-color: rgba(87, 87, 87, 0.5);
                    margin-top: -15px;

                }
            }

        }
    }

    li::after {
        position: absolute;
        top: 0;
        left: 37px;
        content: '';
        width: 2px;
        height: 1280px;
        background: rgba(255, 255, 255, 0.14);

    }
}

main {
    overflow: auto;
}
</style>
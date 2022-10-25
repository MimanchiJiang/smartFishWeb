<template>
    <template v-if="visible">
        <Teleport to="body">
            <div class="xue-dialog-overlay" @click="onClickOverlay"></div>
            <div class="xue-dialog-wrapper">
                <div class="xue-dialog">
                    <main>
                        <svg @click="ok">
                            <use xlink:href="#icon-back"></use>
                        </svg>
                        <slot name="content"></slot>
                    </main>
                </div>
            </div>
        </Teleport>

    </template>

</template>
<script lang="ts">
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        closeOnClickOverlay: {
            type: Boolean,
            default: true

        },
        ok: {
            type: Function,
        },
        cancel: {
            type: Function
        }

    },
    setup(props, context) {
        const onClickOverlay = () => {
            if (props.closeOnClickOverlay) {
                close()
            }
        }
        const close = () => {
            context.emit('update:visible', false)
        }
        const ok = () => {
            if (props.ok?.() !== false) {
                close()
            }
        }

        const cancel = () => {
            props.cancel?.()
            close()
        }
        return {
            close, onClickOverlay, ok, cancel
        }
    },

}
</script>
<style lang="scss">
$radius: 4px;
$border-color: #d9d9d9;

.xue-dialog {
    border-radius: $radius;



    &-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: fade_out(black, 0.5);
        z-index: 10;
    }

    &-wrapper {
        width: 500px;
        height: 500px;
        position: fixed;
        left: 50%;
        top: 50%;
        margin-top: -250px;
        margin-left: -430px;
        z-index: 11;
    }

    >header {
        padding: 12px 16px;
        border-bottom: 1px solid $border-color;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 20px;
    }

    >main {
        padding: 12px 16px;

        svg {
            position: absolute;
            width: 30px;
            height: 30px;
            margin: 15px 10px 10px 10px;
        }
    }

    &-close {
        position: relative;
        display: inline-block;
        width: 16px;
        height: 16px;
        cursor: pointer;

        &::before,
        &::after {
            content: '';
            position: absolute;
            height: 1px;
            background: black;
            width: 100%;
            top: 50%;
            left: 50%;
        }

        &::before {
            transform: translate(-50%, -50%) rotate(-45deg);
        }

        &::after {
            transform: translate(-50%, -50%) rotate(45deg);
        }
    }
}
</style>
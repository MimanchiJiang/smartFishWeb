import Dialog from './Dialog.vue'
import { createApp, h } from 'vue'
export const openDialog = (options) => {
    const { title, content, ok, cancel } = options
    const close = () => {
        app.unmount()
        div.remove()
    }
    const div = document.createElement('div')
    document.body.appendChild(div)
    const app = createApp({
        render() {
            return h(Dialog, {
                visible: true, 'onUpdate:visible': (newVisible) => {
                    if (newVisible == false) {
                        close()
                    }
                },
                ok, cancel
            }, { title, content })
        }
    })
    app.mount(div)
}
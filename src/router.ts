import { createWebHashHistory, createRouter } from 'vue-router'
import Home from './views/Home.vue'
import Doc from './views/Doc.vue'
import Login from "./views/Login.vue"
import Equipment from './components/Equipment.vue'
import HistoryData from './components/HistoryData.vue'
const history = createWebHashHistory()
export const router = createRouter({
    history: history,
    routes: [
        { path: '/', component: Home },
        {
            path: '/doc', component: Doc, children: [
                { path: '', redirect: '/doc/equipment' },
                { path: 'equipment', component: Equipment },
                { path: 'history', component: HistoryData }

            ]
        },
        { path: '/login', component: Login }
    ]
})
router.afterEach(() => {

})
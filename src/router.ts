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
                { name: 'shebei', path: 'equipment', component: Equipment },
                { path: 'history', component: HistoryData }

            ]
        },
        { path: '/login', component: Login }
    ]
})
router.afterEach(() => {

})
router.beforeEach((to, from, next) => {
    if (to.path == '/') {
        // 登录或者注册才可以往下进行
        next();
    } else {
        // 获取 token
        const token = localStorage.getItem('username');
        // token 不存在
        if (token === null || token === '') {
            window.alert('您还没有登录，请先登录');
            next('/');
        } else {
            next();
        }
    }
});

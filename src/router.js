import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: process.env.IS_ELECTRON ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: () => import('./views/Dashboard.vue')
        },
        {
            path: '/note',
            name: 'note',
            component: () => import('./views/Note.vue')
        },
        {
            path: '/system',
            name: 'system',
            component: () => import('./views/System.vue')
        }
    ]
})

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
            path: '/view/:id',
            name: 'view',
            component: () => import('./views/View.vue')
        },     
        {
            path: '/edit/:id',
            name: 'edit',
            component: () => import('./views/Edit.vue')
        },
        {
            path: '/history/:id',
            name: 'history',
            component: () => import('./views/History.vue')
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('./views/Settings.vue')
        }        
    ]
})

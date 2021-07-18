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
            path: '/view-note/:id',
            name: 'view-note',
            component: () => import('./views/ViewNote.vue')
        },     
        {
            path: '/edit-note/:id',
            name: 'edit-note',
            component: () => import('./views/EditNote.vue')
        },        
        {
            path: '/settings',
            name: 'settings',
            component: () => import('./views/Settings.vue')
        }        
    ]
})

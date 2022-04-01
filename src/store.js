import Vue from 'vue'
import Vuex from 'vuex'

import Theme from "@/core/Theme"
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        theme: Theme.get(),
        searchQuery: "",
        dashboardScroll: 0
    },
    mutations: {
        setTheme(state, theme) {
            state.theme = theme
        },
        setSearchQuery(state, query) {
            state.searchQuery = query
        },
        setDashboardScroll(state, scrollY) {
            state.dashboardScroll = scrollY
        }
    },
    actions: {
        setTheme(context, theme) {
            Theme.set(theme);
            context.commit("setTheme", theme);
        }
    },
    getters: {
        theme: (state) => state.theme,
        isSearch: (state) => state.searchQuery.trim().length > 0,
        searchQuery: (state) => state.searchQuery,
        dashboardScroll: (state) => state.dashboardScroll
    }
})

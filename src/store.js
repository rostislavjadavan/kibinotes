import Vue from 'vue'
import Vuex from 'vuex'

import Theme from "@/core/Theme"
import Settings from "@/core/Settings"
import { defaultDbPath } from "@/core/Database"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        dbPath: Settings.get('db', defaultDbPath),
        theme: Theme.get(),        
        searchQuery: "",
        dashboardScroll: 0
    },
    mutations: {
        setDbPath(state, dbPath) {
            state.dbPath = dbPath
        },
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
        setDbPath(context, dbPath) {
            Settings.set('db', dbPath);
            context.commit("setDbPath", dbPath);
        },
        setTheme(context, theme) {
            Theme.set(theme);
            context.commit("setTheme", theme);
        }        
    },
    getters: {
        dbPath: (state) => state.dbPath,
        theme: (state) => state.theme,
        isSearch: (state) => state.searchQuery.trim().length > 0,
        searchQuery: (state) => state.searchQuery,
        dashboardScroll: (state) => state.dashboardScroll
    }
})

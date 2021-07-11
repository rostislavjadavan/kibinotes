import Vue from 'vue'
import Vuex from 'vuex'

import debounce from "@/libs/debounce";
import Theme from "@/core/Theme"
import Notes from "@/core/Notes";
Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        theme: Theme.get(),        
        searchQuery: "",
        searchResultList: [],        
    },
    mutations: {        
        setTheme(state, theme) {
            state.theme = theme;            
        }
    },
    actions: {        
        updateSearchResult(context) {
            /*debounce(
                () =>
                    NoteIndexService.search(context.state.searchQuery, function (err, rows) {
                        if (typeof rows !== 'undefined') {
                            context.commit(SET_SEARCH_RESULT, rows);
                        }
                    }),
                150
            )();
            */
        },
        setTheme(context, theme) {
            Theme.set(theme);
            context.commit("setTheme", theme);
        }        
    },
    getters: {
        getTheme: (state) => {
            return state.theme
        }
    }
})

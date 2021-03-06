import Vue from 'vue'
import Vuex from 'vuex'

import debounce from "@/libs/debounce";
import ThemeService from "@/libs/ThemeService"
import NoteService from "@/libs/NoteService";
import NoteIndexService from '@/libs/NoteIndexService';
import {
    SET_NOTE_LIST,
    SET_ACTIVE_NOTE,
    SET_EDIT_MODE,    
    SET_SEARCH_QUERY,
    SET_SEARCH_RESULT,
    SET_NOTE_SCROLL,
    SET_THEME
} from "@/mutations_names";

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        theme: ThemeService.getTheme(),
        activeNote: null,
        editMode: false,
        editTitle: null,
        noteList: [],
        searchQuery: "",
        searchResultList: [],
        noteScroll: {
            noteId: null,
            scrollY: null,
            positionStart: null,
            positionEnd: null,
            cursorPos: null
        }
    },
    mutations: {
        [SET_NOTE_LIST](state, noteList) {
            state.noteList = noteList;
        },
        [SET_ACTIVE_NOTE](state, note) {
            state.activeNote = note;
            state.edit = false;
        },
        [SET_EDIT_MODE](state, editMode) {
            state.editMode = editMode;
        },        
        [SET_SEARCH_QUERY](state, searchQuery) {
            state.searchQuery = searchQuery;
        },
        [SET_SEARCH_RESULT](state, searchResultList) {
            state.searchResultList = searchResultList;
        },
        [SET_NOTE_SCROLL](state, position) {
            state.noteScroll = position;
        },
        [SET_THEME](state, theme) {
            state.theme = theme;            
        }
    },
    actions: {
        reloadNotesList(context) {
            NoteService.list((err, rows) => {
                if (err) {
                    console.error(err);
                }
                context.commit(SET_NOTE_LIST, rows);
            });
        },
        updateSearchResult(context) {
            debounce(
                () =>
                    NoteIndexService.search(context.state.searchQuery, function (err, rows) {
                        if (typeof rows !== 'undefined') {
                            context.commit(SET_SEARCH_RESULT, rows);
                        }
                    }),
                150
            )();
        },
        setTheme(context, theme) {
            ThemeService.setTheme(theme);                    
            context.commit(SET_THEME, theme);
        }        
    }
})

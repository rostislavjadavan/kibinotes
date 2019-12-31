import Vue from 'vue'
import Vuex from 'vuex'

import debounce from "@/libs/debounce";
import NoteService from "@/libs/NoteService";
import NoteIndexService from '@/libs/NoteIndexService';
import {
    SET_NOTE_LIST,
    SET_ACTIVE_NOTE,
    SET_EDIT_MODE,
    SET_SEARCH_QUERY,
    SET_SEARCH_RESULT
} from "@/mutations_names";

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        activeNote: null,
        editMode: false,
        noteList: [],
        searchQuery: "",
        searchResultList: []
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
        }
    },
    actions: {
        reloadNotesList(context) {
            NoteService.list((err, rows) => {
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
        }
    }
})

import Vue from 'vue'
import Vuex from 'vuex'

import Storage from "@/libs/storage";
import { SET_NOTE_LIST, SET_ACTIVE_NOTE, SET_EDIT_MODE } from "@/mutations_names";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        activeNote: null,
        editMode: false,
        noteList: [],        
        storage: new Storage()
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
        }
    },
    actions: {

    }
})

<template>
    <div class="dashboard view">
        <div class="columns is-centered">
            <div class="app-logo" />
        </div>
        <div class="columns is-centered">
            <div class="column is-half">
                <b-field>
                    <b-input v-model="searchQuery" placeholder="Search..." size="is-medium"></b-input>
                </b-field>
            </div>
        </div>
        <div class="columns is-centered">
            <button class="button is-large" v-on:click="onCreateNote()">
                <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                </span>
                <span>New note</span>
            </button>
        </div>
        <notes-list
            v-if="searchQuery.length == 0"
            v-on:delete="onDeleteNote"
            v-on:select="onSelectNoteById"
        />
        <notes-search-results 
            :query.sync="searchQuery"
            v-if="searchQuery.length > 0" 
            v-on:select="onSelectNoteById" 
            />
    </div>
</template>

<script>
import { SET_ACTIVE_NOTE, SET_EDIT_MODE } from "@/mutations_names";
import NoteService from "@/libs/NoteService";
import NotesList from "@/components/NotesList";
import NotesSearchResults from "@/components/NotesSearchResults";
export default {
    components: {
        NotesList,
        NotesSearchResults
    },
    methods: {
        onSelectNoteById(noteId) {            
            NoteService.get(noteId, (err, row) => {
                if (err) {
                    vueThis.$buefy.toast.open({
                        message: "Error :( " + err,
                        type: "is-danger"
                    });
                } else {
                    this.$store.commit(SET_ACTIVE_NOTE, row);
                    this.active = row.id;
                    this.$router.push({ name: "note" });
                }
            });
        },
        onDeleteNote(note) {
            this.$buefy.dialog.confirm({
                message:
                    "Are you sure you want to delete note <b>" +
                    note.title +
                    "</b>",
                confirmText: "Yes, delete",
                type: "is-danger",
                scroll: "keep",
                onConfirm: () => {
                    NoteService.remove(note);
                    this.$store.dispatch("reloadNotesList");
                    this.$buefy.toast.open(
                        "Note <b>" + note.title + "</b> deleted!"
                    );
                }
            });
        },
        onCreateNote() {
            var vueThis = this;
            NoteService.create(function(err, noteId) {
                if (err) {
                    vueThis.$buefy.toast.open({
                        message: "Error :( " + err,
                        type: "is-danger"
                    });
                } else {
                    NoteService.get(noteId, (err, row) => {
                        vueThis.$store.commit(SET_EDIT_MODE, true);
                        vueThis.$store.commit(SET_ACTIVE_NOTE, row);
                        vueThis.active = row.id;
                        vueThis.$router.push({ name: "note" });
                    });
                }
            });
        }
    },
    data() {
        return {
            searchQuery: ""
        };
    },
    mounted() {
        this.$store.dispatch("reloadNotesList");
    }
};
</script>


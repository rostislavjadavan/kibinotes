<template>
    <div class="dashboard view">
        <div class="columns is-centered">
            <div class="app-logo" />
        </div>
        <div class="columns is-centered">
            <div class="column is-half">
                <b-field>
                    <div class="control is-medium is-clearfix is-expanded">
                        <input
                            ref="search"
                            v-model="searchQuery"
                            type="text"
                            autocomplete="on"
                            placeholder="Search..."
                            class="input is-medium"
                        />
                    </div>
                    <p class="control" v-if="isSearch">
                        <button class="button is-medium" v-on:click="onClearSearchQuery()">
                            <span class="icon is-small">
                                <i class="fas fa-times"></i>
                            </span>
                        </button>
                    </p>
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
            v-if="!isSearch"
            v-on:delete="onDeleteNote"
            v-on:select="onSelectNoteById"
        />
        <notes-search-results v-if="isSearch" v-on:select="onSelectNoteById" />
    </div>
</template>

<script>
import {
    SET_ACTIVE_NOTE,
    SET_EDIT_MODE,
    SET_SEARCH_QUERY,
    SET_SEARCH_RESULT
} from "@/mutations_names";
import NoteService from "@/libs/NoteService";
import NotesList from "@/components/NotesList";
import NotesSearchResults from "@/components/NotesSearchResults";
import KeyboardShortcutsService from "@/libs/KeyboardShortcutsService";
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
        },
        onClearSearchQuery() {
            this.searchQuery = "";
            this.$refs.search.focus();
        }
    },
    data() {
        return {
            searchQuery: ""
        };
    },
    mounted() {
        this.$store.dispatch("reloadNotesList");
        this.$refs.search.focus();
        this.searchQuery = this.$store.state.searchQuery;

        this.$store.subscribe((mutation, state) => {
            if (mutation.type === SET_SEARCH_RESULT) {
                let index = 1;
                do {
                    KeyboardShortcutsService.bindSearchResult(
                        this.$refs.search,
                        index,
                        index => {
                            const noteId =
                                state.searchResultList[index - 1].note_id;
                            this.onSelectNoteById(noteId);
                        }
                    );
                    index++;
                } while (index <= state.searchResultList.length && index < 10);
            }
        });

        KeyboardShortcutsService.bindCreateNewNote(this.$refs.search, this.onCreateNote);
    },
    watch: {
        searchQuery: function(val) {
            this.$store.commit(SET_SEARCH_QUERY, this.searchQuery);
            this.$store.dispatch("updateSearchResult");
        }
    },
    computed: {
        isSearch: function() {
            return this.searchQuery.length > 0;
        }
    }
};
</script>

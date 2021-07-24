<template>
    <div class="dashboard view">
        <div class="note-editor-nav">
            <div class="buttons">
                <button
                    class="button is-small"
                    v-on:click="$router.push({ name: 'settings' })"
                >
                    <span class="icon is-small">
                        <i class="fas fa-cog"></i>
                    </span>
                    <span>Settings</span>
                </button>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="app-logo" />
        </div>
        <div class="columns is-centered">
            <div class="column is-half">
                <b-field grouped>
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
                        <button
                            class="button is-medium"
                            v-on:click="onClearSearchQuery()"
                        >
                            <span class="icon is-small">
                                <i class="fas fa-times"></i>
                            </span>
                        </button>
                    </p>
                </b-field>
            </div>
        </div>
        <div class="columns is-centered">
            <div class="column is-narrow">
                <button class="button is-large" v-on:click="onCreateNote()">
                    <span class="icon is-small">
                        <i class="fas fa-plus"></i>
                    </span>
                    <span>New note</span>
                </button>
            </div>
        </div>
        <notes-list v-if="!isSearch" />
        <notes-search-results v-if="isSearch" v-bind:query="searchQuery" />
        <app-footer />
    </div>
</template>

<script>
import NotesList from "@/components/NotesList";
import AppFooter from "@/components/AppFooter";
import NotesSearchResults from "@/components/NotesSearchResults";
import Notes from "@/core/Notes";

export default {
    components: {
        NotesList,
        NotesSearchResults,
        AppFooter,
    },
    methods: {
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
                    this.$buefy.toast.open(
                        "Note <b>" + note.title + "</b> deleted!"
                    );
                },
            });
        },
        onCreateNote() {
            let note = Notes.create()
            this.$router.push(`edit-note/${note.id}`);
        },
        onClearSearchQuery() {
            this.searchQuery = "";
            this.$refs.search.focus();
        }        
    },
    data() {
        return {
            searchQuery: "",
        };
    },
    mounted() {        
        this.$refs.search.focus()
        this.searchQuery = this.$store.getters.searchQuery
    },
    watch: {
        searchQuery: function (value) {            
            this.$store.commit("setSearchQuery", value)
        },
    },
    computed: {
        isSearch: function () {
            return this.searchQuery.length > 0
        },
    },
};
</script>

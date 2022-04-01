<template>
    <div class="view">
        <nav class="navbar is-fixed-top">
            <div class="navbar-brand">
                <div class="navbar-item">
                    <div class="app-logo" />
                </div>
                <div class="navbar-item">
                    <input
                        ref="search"
                        v-model="searchQuery"
                        type="text"
                        autocomplete="on"
                        placeholder="Search..."
                        class="input"
                    />
                    <span class="control" v-show="isSearch">
                        <button
                            class="button"
                            v-on:click="onClearSearchQuery()"
                        >
                            <span class="icon is-small">
                                <i class="fas fa-times"></i>
                            </span>
                        </button>
                    </span>
                    <button
                        class="button is-primary mx-2"
                        v-on:click="onCreateNote()"
                    >
                        <span class="icon is-small">
                            <i class="fas fa-plus"></i>
                        </span>
                        <span>New note</span>
                    </button>
                    <button
                        class="button mx-2"
                        v-on:click="$router.push('/settings')"
                    >
                        <span class="icon is-small">
                            <i class="fas fa-cog"></i>
                        </span>
                        <span>Settings</span>
                    </button>
                </div>
            </div>
        </nav>

        <notes-list v-show="!isSearch" />
        <notes-search-results v-show="isSearch" v-bind:query="searchQuery" />
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
            let note = Notes.create();
            this.$router.push(`edit/${note.id}`);
        },
        onClearSearchQuery() {
            this.searchQuery = "";
            this.$refs.search.focus();
        },
        handleScroll(event) {
            console.log(window.scrollY)
            this.$store.commit('setDashboardScroll', window.scrollY)
        },
    },
    data() {
        return {
            searchQuery: "",
        };
    },
    mounted() {
        this.$refs.search.focus();
        this.searchQuery = this.$store.getters.searchQuery;

        window.addEventListener("scroll", this.handleScroll);
    },
    watch: {
        searchQuery: function (value) {
            this.$store.commit("setSearchQuery", value);
        },
    },
    computed: {
        isSearch: function () {
            return this.searchQuery.length > 0;
        },
    },    
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    },
};
</script>

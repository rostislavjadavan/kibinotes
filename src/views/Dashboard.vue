<template>
    <div class="dashboard view">
        <div class="columns is-centered">
            <div class="app-logo" />
        </div>
        <div class="columns is-centered">
            <div class="column is-half">
                <b-field>
                    <b-input placeholder="Search..." size="is-medium"></b-input>
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
        <div class="columns">
            <div class="column is-10 is-offset-1">
                <table class="table is-fullwidth">
                    <tbody>
                        <tr v-for="note in this.$store.state.noteList" v-bind:key="note.id">
                            <td
                                class="note-title-cell"
                                v-on:click="onSelectNote(note)"
                            >{{note.title}}</td>
                            <td class="note-actions-cell" align="right">
                                <a href="#" v-on:click="onDeleteNote(note)">
                                    <span class="icon">
                                        <i class="fas fa-trash-alt"></i>
                                    </span>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import { SET_ACTIVE_NOTE, SET_EDIT_MODE } from "@/mutations_names";
export default {
    methods: {
        onSelectNote(note) {
            this.$store.state.storage.get(note.id, (err, row) => {
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
                    this.$store.state.storage.remove(note);
                    this.$store.dispatch("reloadNotesList");
                    this.$buefy.toast.open(
                        "Note <b>" + note.title + "</b> deleted!"
                    );
                }
            });
        },
        onCreateNote() {
            var vueThis = this;
            this.$store.state.storage.create(function(err) {
                if (err) {
                    vueThis.$buefy.toast.open({
                        message: "Error :( " + err,
                        type: "is-danger"
                    });
                } else {
                    vueThis.$store.state.storage.get(
                        this.lastID,
                        (err, row) => {
                            vueThis.$store.commit(SET_EDIT_MODE, true);
                            vueThis.$store.commit(SET_ACTIVE_NOTE, row);
                            vueThis.active = row.id;
                            vueThis.$router.push({ name: "note" });
                            vueThis.$buefy.toast.open("New note created!");
                        }
                    );
                }
            });
        }
    },
    data() {
        return {};
    },
    mounted() {
        this.$store.dispatch("reloadNotesList");
    }
};
</script>


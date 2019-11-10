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
            <button class="button is-large">
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
                            <td class="note-title-cell" v-on:click="onSelectNote(note)">{{note.title}}</td>
                            <td class="note-actions-cell" align="right">
                                <a href="#">
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
import { SET_ACTIVE_NOTE } from "@/mutations_names";
export default {
    methods: {
        onSelectNote(note) {
            this.$store.state.storage.get(note.id, (err, row) => {
                this.$store.commit(SET_ACTIVE_NOTE, row);
                this.active = row.id;
                this.$router.push({ name: "note" });
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


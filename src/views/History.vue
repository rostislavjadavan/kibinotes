<template>
    <div class="view">
        <nav class="navbar is-fixed-top">
            <div class="navbar-brand">
                <div class="navbar-item">
                    <a class="app-logo" v-on:click="$router.push('/')" />
                </div>
                <div class="navbar-item">
                    <a
                        class="button"
                        v-on:click="$router.push(`/view/${note.id}`)"
                    >
                        <span class="icon is-small">
                            <i class="fas fa-long-arrow-alt-left"></i>
                        </span>
                        <span>Back to note</span>
                    </a>
                </div>
            </div>
        </nav>

        <div class="content">
            <h1>{{ note.title }} history</h1>
        </div>
        <table class="table is-fullwidth">
            <tbody>
                <tr v-for="note in notes" v-bind:key="note.id">
                    <td class="note-title-cell" v-on:click="onSelect(note)">
                        {{ formatTs(note) }}
                        <span class="tag is-primary is-light">{{
                            formatTsRelative(note)
                        }}</span>
                    </td>
                </tr>
            </tbody>
        </table>

        <b-modal
            v-model="isModal"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            aria-label="Note"
            aria-modal
        >
            <template>
                <div class="modal-card">
                    <pre>{{ content }}</pre>
                </div>
            </template>
        </b-modal>
    </div>
</template>


<script>
import moment from "moment";
import Notes from "../core/Notes";

export default {
    data() {
        return {
            note: "",
            notes: [],
            isModal: false,
            content: "",
        };
    },
    beforeMount() {
        if (!this.$route.params.id) {
            this.$router.push(`/`);
        }
        this.note = Notes.getById(this.$route.params.id);
        this.notes = Notes.listHistory(this.note);
    },
    methods: {
        onSelect(note) {
            const historicNote = Notes.getHistoricById(note.id);
            this.content = historicNote.content;
            this.isModal = true;
        },
        formatTs(note) {
            return moment(note.last_update_ts, "x").format(
                "dddd, MMMM Do YYYY, HH:mm:ss"
            );
        },
        formatTsRelative(note) {
            return moment(note.last_update_ts, "x").fromNow();
        },
    },
};
</script>

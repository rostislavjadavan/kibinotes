<template>
    <div>
        <div class="notes-list" v-for="note in this.$store.state.noteList" v-bind:key="note.id">
            <a v-on:click="onSelectNote(note)">{{note.title}}</a>
        </div>
    </div>
</template>

<script>
import { SET_ACTIVE_NOTE } from "@/mutations_names";
export default {
    methods: {
        onSelectNote(note) {
            this.$store.commit(SET_ACTIVE_NOTE, note);
        }
    }
};
</script>
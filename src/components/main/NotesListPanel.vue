<template>
    <div class="notes-list">
        <a
            href="#"
            v-on:click="onSelectNote(note)"
            class="item"
            v-for="note in this.$store.state.noteList"
            v-bind:key="note.id"
        >
            <span class="name">
                <i class="far fa-file"></i>
                {{note.title}}
            </span>
        </a>
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
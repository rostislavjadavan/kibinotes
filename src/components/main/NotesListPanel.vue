<template>
    <div class="notes-list">
        <a
            href="#"
            v-on:click="onSelectNote(note)"
            :class="itemClass(note)"
            v-for="note in this.$store.state.noteList"
            v-bind:key="note.id"
        >
            <span class="icon">
                <i class="far fa-file"></i>
            </span>
            <span class="name">{{note.title}}</span>
        </a>
    </div>
</template>

<script>
import { SET_ACTIVE_NOTE } from "@/mutations_names";
export default {
    data() {
        return {
            active: null
        };
    },
    methods: {
        onSelectNote(note) {
            this.$store.commit(SET_ACTIVE_NOTE, note);
            this.active = note.id;
        },
        itemClass(note) {
            return this.active == note.id ? "item item-active" : "item";
        }
    }
};
</script>
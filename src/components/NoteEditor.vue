<template>
    <div v-if="this.$store.state.activeNote != null">
        <div class="nav">
            <button v-on:click="switchmode" v-html="this.$store.state.editMode ? 'Save' : 'Edit'"></button>
            <button v-on:click="dashboard">Go to Dashboard</button>
        </div>

        <div v-if="this.$store.state.editMode">
            <div class="note-title">
                <b-field label="Title">
                    <b-input size="is-medium" v-model="title"></b-input>
                </b-field>
            </div>
            <editor
                v-bind:content="this.$store.state.activeNote.content"
                v-on:change="editorContentChange"
                v-on:save="editorSave"
            />
        </div>
        <div v-if="!this.$store.state.editMode">
            <div class="note-title">
                <h1>{{this.$store.state.activeNote.title}}</h1>
            </div>
            <markdown v-bind:content="this.$store.state.activeNote.content" />
        </div>
    </div>
</template>

<script>
import Markdown from "@/components/Markdown";
import Editor from "@/components/Editor";
import Mousetrap from "mousetrap";
import { SET_EDIT_MODE, SET_ACTIVE_NOTE } from "@/mutations_names";

export default {
    components: {
        Markdown,
        Editor
    },
    data() {
        return {
            editButtonCaption: "Edit",
            title: "",
            content: ""
        };
    },
    methods: {
        editorContentChange(content) {
            this.content = content;
            this.saveNoteContent(content);
        },
        editorSave(content) {
            this.content = content;
            this.switchmode();
        },
        switchmode() {
            this.title = this.$store.state.activeNote.title;
            this.content = this.$store.state.activeNote.content;
            this.saveNoteContent(this.content);
            this.$store.commit(SET_EDIT_MODE, !this.$store.state.editMode);
        },
        saveNoteContent(content) {
            let note = JSON.parse(JSON.stringify(this.$store.state.activeNote));
            note.content = content;
            note.title = this.title;

            this.$store.state.storage.save(note);
            this.$store.commit(SET_ACTIVE_NOTE, note);
            this.$store.dispatch("reloadNotesList");
        },
        dashboard() {
            this.title = this.$store.state.activeNote.title;
            this.content = this.$store.state.activeNote.content;
            this.saveNoteContent(this.content);
            this.$store.commit(SET_EDIT_MODE, false);
            this.$router.push({ name: "dashboard" });
        }
    },
    mounted() {
        Mousetrap.bind("command+s", () => this.switchmode());
        Mousetrap.bind("command+d", () => this.dashboard());
    }
};
</script>

<style>
.nav {
    position: fixed;
    right: 10px;
    z-index: 100;
}
</style>
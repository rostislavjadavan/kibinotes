<template>
    <div v-if="this.$store.state.activeNote != null">
        <div class="note-editor-nav">
            <div class="buttons">
                <button class="button" v-on:click="switchmode" v-if="this.$store.state.editMode">
                    <span class="icon is-small">
                        <i class="fas fa-paragraph"></i>
                    </span>
                    <span>View</span>
                </button>

                <button class="button" v-on:click="switchmode" v-if="!this.$store.state.editMode">
                    <span class="icon is-small">
                        <i class="fas fa-pen"></i>
                    </span>
                    <span>Edit</span>
                </button>

                <button class="button" v-on:click="dashboard">
                    <span class="icon is-small">
                        <i class="fas fa-align-justify"></i>
                    </span>
                    <span>Go to Dashboard</span>
                </button>
            </div>
        </div>

        <div v-if="this.$store.state.editMode">
            <note-editor-title v-on:change="titleContentChange" />
            <editor
                v-bind:content="this.$store.state.activeNote.content"
                v-on:change="editorContentChange"
                v-on:save="editorSave"
            />
        </div>
        <div v-if="!this.$store.state.editMode">
            <note-editor-title />
            <markdown v-bind:content="this.$store.state.activeNote.content" />
        </div>
    </div>
</template>

<script>
import NoteEditorTitle from "@/components/NoteEditorTitle";
import Markdown from "@/components/Markdown";
import Editor from "@/components/Editor";
import NoteService from '@/libs/NoteService'
import Mousetrap from "mousetrap";
import { SET_EDIT_MODE, SET_ACTIVE_NOTE } from "@/mutations_names";
import debounce from "@/libs/debounce";

export default {
    components: {
        NoteEditorTitle,
        Markdown,
        Editor
    },
    methods: {
        titleContentChange(title) {
            this.saveNote({ title: title });
        },
        editorContentChange(content) {
            this.saveNote({ content: content });
        },
        editorSave(content) {
            this.saveNote({ content: content });
            this.switchmode();
        },
        switchmode() {
            this.$store.commit(SET_EDIT_MODE, !this.$store.state.editMode);
        },
        saveNote(newNote) {
            let note = JSON.parse(JSON.stringify(this.$store.state.activeNote));
            if (newNote.hasOwnProperty("title")) {
                note.title = newNote.title;
            }
            if (newNote.hasOwnProperty("content")) {
                note.content = newNote.content;
            }

            debounce(() => NoteService.save(note), 250)();

            this.$store.commit(SET_ACTIVE_NOTE, note);
        },
        dashboard() {
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
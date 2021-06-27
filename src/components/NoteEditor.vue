<template>
    <div v-if="this.$store.state.activeNote != null">
        <div class="note-editor-nav">
            <div class="buttons">
                <button class="button" v-on:click="onSwitchMode" v-if="this.$store.state.editMode">
                    <span class="icon is-small">
                        <i class="fas fa-paragraph"></i>
                    </span>
                    <span>View</span>
                </button>

                <button class="button" v-on:click="onSwitchMode" v-if="!this.$store.state.editMode">
                    <span class="icon is-small">
                        <i class="fas fa-pen"></i>
                    </span>
                    <span>Edit</span>
                </button>

                <button class="button" v-on:click="onDelete">
                    <span class="icon is-small">
                        <i class="fas fa-trash-alt"></i>
                    </span>
                    <span>Delete</span>
                </button>

                <button class="button" v-on:click="onDashboard">
                    <span class="icon is-small">
                        <i class="fas fa-align-justify"></i>
                    </span>
                    <span>Go to Dashboard</span>
                </button>
            </div>
        </div>

        <div v-if="this.$store.state.editMode">
            <note-editor-title v-on:change="onTitleContentChange" />
            <editor-code-jar
                v-bind:content="this.$store.state.activeNote.content"
                v-on:change="onEditorContentChange"
                v-on:save="onEditorSave"
                v-on:dashboard="onDashboard"
            />
        </div>
        <div v-if="!this.$store.state.editMode">
            <note-editor-title />
            <markdown-remark v-bind:content="this.$store.state.activeNote.content" />
        </div>
    </div>
</template>

<script>
import NoteEditorTitle from "@/components/NoteEditorTitle";
import MarkdownRemark from "@/components/MarkdownRemark";
import EditorCodeJar from "@/components/EditorCodeJar";
import NoteService from '@/libs/NoteService'
import { SET_EDIT_MODE, SET_ACTIVE_NOTE } from "@/mutations_names";
import debounce from "@/libs/debounce";

export default {
    components: {
        NoteEditorTitle,
        MarkdownRemark,        
        EditorCodeJar
    },
    methods: {
        onTitleContentChange(title) {
            this.saveNote({ title: title });
        },
        onEditorContentChange(content) {
            this.saveNote({ content: content });
        },
        onEditorSave(content) {
            this.saveNote({ content: content });
            this.onSwitchMode();
        },
        onSwitchMode() {
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
        onDashboard() {            
            this.$router.push({ name: "dashboard" });
        },
        onDelete() {
            const note = this.$store.state.activeNote;
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
                    this.$router.push({ name: "dashboard" });
                    this.$store.dispatch("reloadNotesList");
                    this.$buefy.toast.open(
                        "Note <b>" + note.title + "</b> deleted!"
                    );
                }
            });
        }
    }
};
</script>
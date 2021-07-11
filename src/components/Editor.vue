<template>
    <div class="is-fullheight">
        <div class="note-editor-nav">
            <div class="buttons">
                <button class="button">
                    <span class="icon is-small">
                        <i class="fas fa-save"></i>
                    </span>
                    <span>Save</span>
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

        <pre id="editor" class="editor" v-html="note.content"></pre>
    </div>
</template>

<script>
import ui from "@/libs/mdwiki_ui"
import Notes from "@/core/Notes";

export default {
    props: ["id"],
    data() {
        return {
            note: null,
            editor: null
        };
    },
    beforeMount() {
        this.note = Notes.getById(this.id);        
    },
    mounted() {
        this.editor = ui.editor('#editor');
        this.editor.focus();
    },
    methods: {
        onEditorContentChange(content) {
            //this.saveNote({ content: content });
        },
        onEditorSave(content) {
            //this.saveNote({ content: content });
            //this.onSwitchMode();
        },
        onSwitchMode() {
            //this.$store.commit(SET_EDIT_MODE, !this.$store.state.editMode);
        },
        saveNote(newNote) {
            /*
            let note = JSON.parse(JSON.stringify(this.$store.state.activeNote));
            if (newNote.hasOwnProperty("title")) {
                note.title = newNote.title;
            }
            if (newNote.hasOwnProperty("content")) {
                note.content = newNote.content;
            }

            debounce(() => NoteService.save(note), 250)();

            this.$store.commit(SET_ACTIVE_NOTE, note);
            */
        },
        onDashboard() {
            this.$router.push({ name: "dashboard" });
        },
        onDelete() {
            this.$buefy.dialog.confirm({
                message:
                    "Are you sure you want to delete note <b>" +
                    note.title +
                    "</b>",
                confirmText: "Yes, delete",
                type: "is-danger",
                scroll: "keep",
                onConfirm: () => {
                    Notes.delete(this.note);
                    this.$router.push({ name: "dashboard" });
                    this.$buefy.toast.open(
                        "Note <b>" + note.title + "</b> deleted!"
                    );
                },
            });
        },
    },
};
</script>

<style type="text/css" scoped>
pre.editor {
    white-space: pre;
    tab-size: 4;
    -moz-tab-size: 4;
    font-family: monospace;
    font-size: 14px;
    font-weight: 400;
    height: calc(100vh - 115px);
    letter-spacing: normal;
    line-height: 20px;
    padding: 10px;
    margin: 0;
    background-color: #fafbfc;
}
*:focus {
    outline: none;
}
</style>

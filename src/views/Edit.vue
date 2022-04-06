<template>
    <div class="view">
        <nav class="navbar is-fixed-top">
            <div class="navbar-brand">
                <div class="navbar-item">
                    <a class="app-logo" v-on:click="$router.push('/')" />
                </div>
                <div class="navbar-item">
                    <a class="button is-success mx-2" v-on:click="onSave">
                        <span class="icon is-small">
                            <i class="fas fa-save"></i>
                        </span>
                        <span>Save</span>
                    </a>

                    <a class="button is-warning mx-2" v-on:click="onCancel">
                        <span class="icon is-small">
                            <i class="fas fa-ban"></i>
                        </span>
                        <span>Cancel</span>
                    </a>
                    <a class="button is-danger mx-2" v-on:click="onDelete">
                        <span class="icon is-small">
                            <i class="fas fa-trash-alt"></i>
                        </span>
                        <span>Delete</span>
                    </a>
                </div>
            </div>
        </nav>

        <pre
            id="editor"
            class="editor"
            @input="onContentChange"
            v-html="content"
        ></pre>
    </div>
</template>

<script>
import ui from "@/libs/mdwiki_ui";
import Notes from "@/core/Notes";
import escape from "escape-html";

export default {
    data() {
        return {
            note: null,
            editor: null,
            content: "",
        };
    },
    beforeMount() {
        if (!this.$route.params.id) {
            this.$router.push(`/`);
        }
        this.note = Notes.getById(this.$route.params.id);
        this.content = escape(this.note.content);

        window.scroll({
            top: 0,
            left: 0,
        });
    },
    mounted() {
        this.editor = ui.editor("#editor");
        this.editor.focus();
    },
    methods: {
        onContentChange(e) {
            this.note.content = e.target.innerText;
        },
        onSave() {
            Notes.update(this.note);
            this.$router.push(`/view/${this.note.id}`);
            this.$buefy.toast.open("Note saved");
        },
        onCancel() {
            this.$router.push(`/view/${this.note.id}`);
        },
        onDelete() {
            this.$buefy.dialog.confirm({
                message:
                    "Are you sure you want to delete note <b>" +
                    this.note.title +
                    "</b>",
                confirmText: "Yes, delete",
                type: "is-danger",
                scroll: "keep",
                onConfirm: () => {
                    Notes.delete(this.note);
                    this.$router.push("/");
                    this.$buefy.toast.open(
                        "Note <b>" + this.note.title + "</b> deleted!"
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
    height: calc(100vh - 112px);
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

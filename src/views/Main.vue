<template>
    <div class="columns is-mobile">
        <div class="is-main-panel has-background-warning hero is-fullheight">
            <div class="main-panel">
                <div class="app-logo" />
                <div class="compose has-text-centered">
                    <a class="button is-danger is-block is-bold">
                        <span class="compose">New note</span>
                    </a>
                </div>
                <NotesListPanel />
            </div>
        </div>
        <div class="column is-rest main-content hero is-fullheight">
            <EditorPanel />
        </div>
    </div>
</template>

<script>
import NotesListPanel from "@/components/main/NotesListPanel";
import EditorPanel from "@/components/main/EditorPanel";
import { SET_NOTE_LIST } from "@/mutations_names";

export default {
    components: {
        NotesListPanel,
        EditorPanel
    },
    mounted() {
        this.$store.dispatch("reloadNotesList");
    }
};
</script>
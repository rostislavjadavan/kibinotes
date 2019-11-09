<template>
    <div class="app">
        <div class="is-main-panel">
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
        <div class=" is-rest main-content">
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
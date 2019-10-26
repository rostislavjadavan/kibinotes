<template>
    <div class="columns is-mobile is-fullheight">
        <div class="column is-2 has-background-white-ter hero is-fullheight">
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
        <div class="column is-10 main-content hero is-fullheight">
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
        const storage = this.$store.state.storage;
        this.$store.commit(SET_NOTE_LIST, storage.list());
    }
};
</script>
<template>
    <div class="container">
        <div class="panel-250">
            <div class="panel-fixed">
                <NotesListPanel />
            </div>
        </div>
        <div class="panel">            
            <EditorPanel />
        </div>
    </div>
</template>

<script>
import NotesListPanel from "@/components/main/NotesListPanel"
import EditorPanel from "@/components/main/EditorPanel"
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
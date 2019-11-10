<template>
    <div class="note view">
        <NoteEditor />
    </div>
</template>

<script>
import NoteEditor from "@/components/NoteEditor";

export default {
    components: {
        NoteEditor
    },
    mounted() {
        if (this.$store.state.activeNote == null) {
            this.$router.push({ name: "dashboard" });
        }
    }
};
</script>
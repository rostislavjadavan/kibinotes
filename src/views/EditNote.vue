<template>
    <div class="note view">
        <Editor v-bind:id="$route.params.id" />
    </div>
</template>

<script>
import Editor from "@/components/Editor";

export default {
    components: {
        Editor
    },
    mounted() {        
        if (!this.$route.params.id) {
            this.$router.push(`/dashboard`);
        }        
    }
};
</script>

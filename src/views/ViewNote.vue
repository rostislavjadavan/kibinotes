<template>
    <div class="note view">
        <view-markdown v-bind:id="$route.params.id" />
    </div>
</template>

<script>
import ViewMarkdown from "../components/ViewMarkdown"

export default {
    components: {
        ViewMarkdown
    },
    beforeMount() {        
        if (!this.$route.params.id) {
            this.$router.push(`/dashboard`);
        }        
    }
};
</script>

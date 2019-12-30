<template>
    <div ref="markdown" class="markdown-body" v-html="markdownOutput" />
</template>

<script>
import Markdown from "markdown-it";
import Mark from "@/libs/mark";

export default {
    props: {
        content: String
    },
    data() {
        return {
            outputContent: "",
            md: new Markdown({
                html: true,
                linkify: true,
                typographer: true
            })
        };
    },
    computed: {
        markdownOutput: function() {
            if (this.content != null) {
                return this.md.render(this.content);
            }
            return "";
        }
    },
    mounted() {
        if (this.$store.state.searchQuery) {
            var markInstance = new Mark(this.$refs.markdown);
            var options = {
                acrossElements: true,
                separateWordSearch: true,
                diacritics: true
            };
            markInstance.mark(this.$store.state.searchQuery, options);
        }
    }
};
</script>
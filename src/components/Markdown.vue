<template>
    <div class="markdown-body" v-html="markdownOutput" />
</template>

<script>
import Markdown from "markdown-it";

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
            return this.md.render(this.content);
        }
    }    
};
</script>
<template>
    <div class="content">
        <div ref="markdown" class="markdown-body" v-html="markdownOutput" />
    </div>
</template>

<script>
import Markdown from "markdown-it";
import MarkdownEmoji from "markdown-it-emoji";
import MarkdownTaskList from "markdown-it-task-lists";
import Mark from "@/libs/mark";
import { SET_NOTE_SCROLL } from "@/mutations_names";

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
    methods: {
        handleScroll() {            
            let rect = document.querySelector("body").getBoundingClientRect();
            this.$store.commit(SET_NOTE_SCROLL, {
                scrollY: window.scrollY,
                positionStart: (Math.abs(rect.top) / rect.height) * 100,
                positionEnd: ((Math.abs(rect.top) + window.innerHeight) / rect.height) * 100
            });
        }
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
        this.md.use(MarkdownEmoji);
        this.md.use(MarkdownTaskList);

        if (this.$store.state.searchQuery) {
            var markInstance = new Mark(this.$refs.markdown);
            var options = {
                acrossElements: true,
                separateWordSearch: true,
                diacritics: true
            };
            markInstance.mark(this.$store.state.searchQuery, options);
        }

        let scroll = this.$store.state.noteScroll;
        if (scroll.scrollY != null) {
            window.scrollTo(0, scroll.scrollY);
        }

        window.addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    }
};
</script>

<style>
.task-list-item-checkbox {
    font-size: 3rem;
}
</style>
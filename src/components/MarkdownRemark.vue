<template>
    <div class="content">
        <div ref="markdown" class="markdown-body" v-html="markdownOutput" />
    </div>
</template>

<script>
import Unified from "unified";
import RemarkParse from "remark-parse";
import RemartRehype from "remark-rehype";
import RehypeFormat from "rehype-format";
import RehypeStringify from "rehype-stringify";
import RehypeRaw from "rehype-raw";
import RemarkExternalLinks from "remark-external-links";
import RemarkEmoji from "remark-gemoji";
import RemarkTodoPlugin from "@/libs/remark_todo_plugin";
import Mark from "@/libs/mark";
import { SET_NOTE_SCROLL } from "@/mutations_names";

export default {
    props: {
        content: String,
    },
    data() {
        return {
            outputContent: "",
            processor: null,
        };
    },
    methods: {
        initScroll() {
            let scroll = this.$store.state.noteScroll;
            if (scroll.noteId == null || scroll.noteId != this.$store.state.activeNote.id) {
                scroll.noteId = this.$store.state.activeNote.id;
            } else if (scroll.scrollY != null) {
                window.scrollTo(0, scroll.scrollY);
            }
        },
        handleScroll() {
            // calc position on page, range=[0..1]
            let rect = document.querySelector("body").getBoundingClientRect();
            let start = (Math.abs(rect.top) / rect.height);
            let end = ((Math.abs(rect.top) + window.innerHeight) / rect.height);
            
            // update scroll information
            let scroll = this.$store.state.noteScroll;

            scroll.scrollY = window.scrollY;
            scroll.start = start;
            scroll.middle = (start + end) / 2;
            scroll.end = end;                        
            
            this.$store.commit(SET_NOTE_SCROLL, scroll);
        },
        highlightSearchQuery() {
            if (this.$store.state.searchQuery) {
            var markInstance = new Mark(this.$refs.markdown);
            var options = {
                acrossElements: true,
                separateWordSearch: true,
                diacritics: true,
            };
            markInstance.mark(this.$store.state.searchQuery, options);
        }
        }
    },
    computed: {
        markdownOutput: function () {
            if (this.content != null) {
                return this.processor.processSync(this.content).toString();
            }
            return "";
        },
    },
    beforeMount() {
        this.processor = Unified()
            .use(RemarkParse)
            .use(RemarkExternalLinks, { target: "_blank" })
            .use(RemarkTodoPlugin)
            .use(RemarkEmoji)
            .use(RemartRehype)
            .use(RehypeRaw)
            .use(RehypeFormat)
            .use(RehypeStringify);
    },
    mounted() {        
        this.highlightSearchQuery();
        this.initScroll();
        window.addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    },
};
</script>
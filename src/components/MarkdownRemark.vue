<template>
    <div class="content">
        <div ref="markdown" class="markdown-body" v-html="markdownOutput" />
    </div>
</template>

<script>
import Unified from "unified";
import RemarkParse from "remark-parse";
import RemarkHtml from "remark-html";
import RemarkExternalLinks from "remark-external-links";
import RemarkEmoji from 'remark-gemoji';
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
        handleScroll() {
            let rect = document.querySelector("body").getBoundingClientRect();
            this.$store.commit(SET_NOTE_SCROLL, {
                scrollY: window.scrollY,
                positionStart: (Math.abs(rect.top) / rect.height) * 100,
                positionEnd:
                    ((Math.abs(rect.top) + window.innerHeight) / rect.height) *
                    100,
            });
        },
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
            .use(RemarkEmoji)
            .use(RemarkHtml);
    },
    mounted() {
        let scroll = this.$store.state.noteScroll;
        if (scroll.scrollY != null) {
            window.scrollTo(0, scroll.scrollY);
        }

        window.addEventListener("scroll", this.handleScroll);
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    },
};
</script>
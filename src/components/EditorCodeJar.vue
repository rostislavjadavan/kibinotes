<template>
    <section>
        <div class="editor" ref="editor"></div>
    </section>
</template>

<script>
import { CodeJar } from "codejar";
import ContentSelect from "ContentSelect";
import EventBus from "@/libs/event_bus.js";
import { SET_NOTE_SCROLL } from "@/mutations_names";

export default {
    props: {
        content: String,
    },
    data() {
        return {
            jar: null,
        };
    },
    methods: {
        initScroll() {
            let scroll = this.$store.state.noteScroll;
            if (scroll.scrollY != null && scroll.middle != null) {
                var f = scroll.middle;

                // stick to the begining of the document
                if (scroll.start < 0.05) {
                    f = 0;
                }
                // stick to the end of the document
                if (f > 0.95) {
                    f = 1;
                }

                var lines = this.content.split(/\r\n|\r|\n/);

                var calcCursorOffset = (f) => {
                    var offset = 0;
                    var lineCounter = 0;
                    while (lineCounter < f * lines.length) {
                        offset += lines[lineCounter].length;
                        lineCounter++;
                    }
                    return offset;
                };

                // if cursor was within current scroll position set to it's original position
                // Otherwise find some middle position within current scroll
                var offset = calcCursorOffset(f) + 1;
                if (
                    scroll.cursorPos != null &&
                    scroll.cursorPos._from >= calcCursorOffset(scroll.start) &&
                    scroll.cursorPos._from <= calcCursorOffset(scroll.end)
                ) {
                    offset = scroll.cursorPos._from;
                }

                var pos = this.content.length * f;
                var range = new ContentSelect.Range(offset, offset);
                range.select(this.$refs.editor);

                // Scroll document
                let rect = document
                    .querySelector("body")
                    .getBoundingClientRect();
                window.scrollTo(0, rect.height * f);
            }
        },
        handleCursorPosition() {
            // update cursor position
            let scroll = this.$store.state.noteScroll;

            scroll.cursorPos = ContentSelect.Range.query(this.$refs.editor);

            this.$store.commit(SET_NOTE_SCROLL, scroll);
        },
    },
    mounted() {
        this.jar = CodeJar(this.$refs.editor, (c) => c);
        this.jar.updateCode(this.content || "");
        this.jar.onUpdate((code) => {
            this.$emit("change", code);
        });
        this.$refs.editor.focus();

        this.initScroll();
        window.addEventListener("keyup", this.handleCursorPosition);
        this.$refs.editor.addEventListener("click", this.handleCursorPosition);
    },
    beforeDestroy() {
        this.jar.destroy();
        window.removeEventListener("keyup", this.handleCursorPosition);
        this.$refs.editor.removeEventListener(
            "click",
            this.handleCursorPosition
        );
    },
};
</script>

<style lang="css" scoped>
.editor {
    overflow: hidden;
    font-family: "Source Code Pro", monospace;
    height: 100%;
    tab-size: 4;
    resize: none !important;
}
</style>

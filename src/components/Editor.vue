<template>
    <section>
        <div class="editor" ref="wrapper">
            <textarea ref="editor" value></textarea>
        </div>
    </section>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror.js";
import CodeMirrorSearch from "codemirror/addon/search/searchcursor.js";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/markdown/markdown.js";

export default {
    props: {
        content: String
    },
    data() {
        return {
            instance: null,
            options: {
                value: "",
                mode: "markdown",
                theme: "app",
                lineNumbers: true
            }
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.instance = CodeMirror.fromTextArea(
                this.$refs.editor,
                this.options
            );

            this.instance.setValue(this.options.value || this.content || "");
            this.instance.on("change", cm => {
                this.$emit("change", cm.getValue());
            });

            this.instance.focus();

            let scroll = this.$store.state.noteScroll;            
            if (scroll.positionStart != null && scroll.positionEnd != null) {
                let avg = (scroll.positionStart + scroll.positionEnd) / 2;
                let startLine = Math.round(
                    (this.instance.lineCount() * scroll.positionStart) / 100
                );
                let line = Math.round((this.instance.lineCount() * avg) / 100);

                if (startLine < 10) {
                    this.instance.setCursor(startLine, 0);
                    this.instance.scrollIntoView(
                        { line: startLine, char: 0 },
                        window.innerHeight / 2
                    );
                } else {
                    this.instance.setCursor(line, 0);
                    this.instance.scrollIntoView(
                        { line: line, char: 0 },
                        window.innerHeight / 2
                    );
                }
            }

            this.instance.setOption("extraKeys", {
                "Cmd-S": instance => {
                    this.$emit("save", instance.getValue());
                },
                "Cmd-D": instance => {
                    this.$emit("dashboard");
                }
            });

            if (this.$store.state.searchQuery) {
                let cursor = this.instance.getSearchCursor(
                    this.$store.state.searchQuery
                );
                while (cursor.findNext()) {
                    this.instance.markText(cursor.from(), cursor.to(), {
                        className: "highlight"
                    });
                }
            }
        }
    }
};
</script>


<style>
@import "../assets/codemirror.css";

.CodeMirror {
    height: auto;
}
</style>
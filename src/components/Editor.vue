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
            //this.instance.setCursor(this.instance.lineCount(), 0);

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
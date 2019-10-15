<template>
    <section>
        <div class="editor">
            <textarea ref="editor" value></textarea>
        </div>
    </section>
</template>

<script>
import CodeMirror from "codemirror/lib/codemirror.js";
import "codemirror/lib/codemirror.css";

export default {
    props: {
        content: String
    },
    data() {
        return {
            instance: null,
            options: {
                value: "",
                theme: "github-light"
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
            this.instance.setValue(this.options.value || this.content);
            this.instance.on("change", cm => {
                this.$emit("change", cm.getValue());
            });
            this.instance.focus();
            this.instance.setCursor(this.instance.lineCount(), 0);
        }
    }
};
</script>


<style>
@import "../assets/github-codemirror-theme.css";

.CodeMirror {
    height: auto;
}
</style>
<template>
    <section>
        <div class="editor" ref="editor"></div>
    </section>
</template>

<script>
import { CodeJar } from "codejar";
import EventBus from "@/libs/event_bus.js";

export default {
    props: {
        content: String,
    },
    data() {
        return {
            jar: null,
        };
    },
    mounted() {
        this.jar = CodeJar(this.$refs.editor, (c) => c);
        this.jar.updateCode(this.content || "");
        this.jar.onUpdate((code) => {
            this.$emit("change", code);
        });
        this.$refs.editor.focus();
    },
    beforeDestroy() {
        this.jar.destroy();
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

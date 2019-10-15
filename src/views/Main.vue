<template>
    <div class="main">   
        <div class="nav">
            <button v-on:click="switchmode">{{editButtonCaption}}</button>
        </div>     
        <div v-if="edit">
            <editor v-bind:content="content" v-on:change="editorcontentchange" />
        </div>
        <div v-if="!edit">
            <markdown v-bind:content="content" />
        </div>
    </div>
</template>

<script>
import Markdown from "@/components/Markdown";
import Editor from "@/components/Editor";

export default {
    components: {
        Markdown,
        Editor
    },
    data() {
        return {        
            content: "# Content \n Test content",
            edit: false,
            editButtonCaption: "Edit"
        };
    },
    methods: {
        editorcontentchange(content) {
            this.content = content;
        },
        switchmode() {
            this.edit = !this.edit;
            this.editButtonCaption = this.edit ? "Save" : "Edit";
        }
    },
    mounted() {
        
    }
};
</script>

<style>
.nav {
    position: fixed;
    right: 10px;
    z-index: 100;
}
</style>
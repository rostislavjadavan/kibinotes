<template>
    <div class="main">   
        <div class="nav">
            <button v-on:click="switchmode">{{editButtonCaption}}</button>
        </div>     
        <div v-if="edit">
            <editor v-bind:content="content" v-on:change="editorContentChange" v-on:save="editorSave" />
        </div>
        <div v-if="!edit">
            <markdown v-bind:content="content" />
        </div>
    </div>
</template>

<script>
import Markdown from "@/components/Markdown";
import Editor from "@/components/Editor";
import Storage from "@/libs/storage";
import Mousetrap from 'mousetrap';

export default {
    components: {
        Markdown,
        Editor
    },
    data() {
        return {        
            content: "",
            edit: false,
            editButtonCaption: "Edit",
            storage: new Storage
        };
    },
    methods: {
        editorContentChange(content) {
            this.content = content;
        },
        editorSave(content) {
            this.content = content;
            this.switchmode();
        },
        switchmode() {
            this.edit = !this.edit;
            this.editButtonCaption = this.edit ? "Save" : "Edit";

            if (!this.edit) {
                this.storage.save(this.content);
            }
        }
    },
    mounted() {        
        this.content = this.storage.load();

        Mousetrap.bind("command+s", () => this.switchmode());
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
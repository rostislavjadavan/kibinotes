<template>
    <div v-if="this.$store.state.activeNote != null">                
        
        <div class="nav">
            <button v-on:click="switchmode" v-html="this.$store.state.editMode ? 'Save' : 'Edit'"></button>
        </div>

        <div v-if="this.$store.state.editMode">
            <editor
                v-bind:content="this.$store.state.activeNote.content"
                v-on:change="editorContentChange"
                v-on:save="editorSave"
            />
        </div>
        <div v-if="!this.$store.state.editMode">
            <markdown v-bind:content="this.$store.state.activeNote.content" />
        </div>
        
    </div>
</template>

<script>
import Markdown from "@/components/Markdown";
import Editor from "@/components/Editor";
import Mousetrap from 'mousetrap';
import { SET_EDIT_MODE } from "@/mutations_names"

export default {    
    components: {
        Markdown,
        Editor
    },
    data() {
        return {
            editButtonCaption: "Edit"
        }
    },
    methods: {
        editorContentChange(content) {
            //this.content = content;
        },
        editorSave(content) {
            //this.content = content;
            this.switchmode();
        },
        switchmode() {
            this.$store.commit(SET_EDIT_MODE, !this.$store.state.editMode);            
        }
    },
    mounted() {
        Mousetrap.bind("command+s", () => this.switchmode());
    }
}
</script>

<style>
.nav {
    position: fixed;
    right: 10px;
    z-index: 100;
}
</style>
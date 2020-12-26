<template>
    <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
            <li>
                <a href="#" v-on:click="dashboard()">Dashboard</a>
            </li>
            <li class="is-active" v-if="!this.$store.state.editMode">
                <a href="#" aria-current="page">{{this.$store.state.activeNote.title}}</a>
            </li>
            <li class="is-active" v-if="this.$store.state.editMode">
                <b-input ref="title" class="ml1" size="is-small" v-model="title"></b-input>
            </li>
        </ul>
    </nav>
</template>

<script>
import { SET_EDIT_TITLE } from "@/mutations_names";
import KeyboardShortcutsService from "@/libs/KeyboardShortcutsService";
export default {
    data() {
        return {
            title: ""
        };
    },
    methods: {
        dashboard() {
            this.$router.push({ name: "dashboard" });
        }
    },
    watch: {
        title: function(val) {
            this.$emit("change", val);
        }
    },
    mounted() {
        this.title = this.$store.state.activeNote.title;
        this.$root.$on('focus_note_title', () => {
            this.$refs.title.focus();
        });        
    }
};
</script>
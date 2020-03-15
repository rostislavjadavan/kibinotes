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
        const focusTitleInput = () => {
            this.$store.commit(SET_EDIT_TITLE, this.$refs.title);
            if (this.$refs.title) {
                KeyboardShortcutsService.bindGoToDashboard(
                    this.$refs.title.$el,
                    () => {
                        this.$router.push({ name: "dashboard" });
                    }
                );
            }
        };

        if (this.$store.state.editMode) {
            focusTitleInput()
        }

        this.title = this.$store.state.activeNote.title;
        this.$store.watch(
            (state, getters) => state.editMode,
            (newValue, oldValue) => focusTitleInput()
        );
    }
};
</script>
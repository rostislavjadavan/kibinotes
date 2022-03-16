<template>
    <div class="columns">
        <div class="column is-10 is-offset-1">
            <div class="content">
                <div
                    class="note-seach-result-box"
                    v-for="res in results"
                    v-bind:key="res.note_id"
                >
                    <strong><a v-on:click="onSelect(res)">{{res.title}}</a></strong>
                    <pre v-on:click="onSelect(res)" v-html="res.content" />
                </div>                
            </div>
        </div>
    </div>
</template>

<script>
import debounce from "../libs/debounce";
import Notes from "../core/Notes";

export default {
    props: ["query"],
    data() {
        return {
            results: [],
        };
    },
    methods: {
        onSelect(res) {
            this.$router.push(`/view/${res.note_id}`);
        },
    },
    watch: {
        query: function (value) {
            debounce(() => (this.results = Notes.search(value)), 150)();
        },
    },
};
</script>

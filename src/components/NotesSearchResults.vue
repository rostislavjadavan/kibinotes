<template>
    <div class="columns">
        <div class="column is-10 is-offset-1">
            <div class="content">
                <h3 class="has-text-centered">
                    Search results for "{{ query }}"
                </h3>
                <div
                    class="note-seach-result-box"
                    v-for="res in results"
                    v-bind:key="res.note_id"
                >
                    <pre v-on:click="onSelect(res)" v-html="res.content" />
                </div>
                <p class="is-size-6 has-text-centered">
                    {{ results.length }} results found
                </p>
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

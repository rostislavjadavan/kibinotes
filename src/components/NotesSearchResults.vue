<template>
    <div class="columns">
        <div class="column is-10 is-offset-1">
            <div class="content">
                <h3 class="has-text-centered">Search results for "{{query}}"</h3>
                <div
                    class="box note-seach-result-box"
                    v-for="res in results"
                    v-bind:key="res.note_id"
                >
                    <div class="media-content" v-on:click="onSelect(res)">
                        <div class="content">
                            <p>                                
                                <span class="note-content-preview" v-html="res.content" />
                            </p>
                        </div>
                    </div>
                </div>
                <p
                    class="is-size-6 has-text-centered"
                >{{results.length}} results found</p>
            </div>
        </div>
    </div>
</template>

<script>
import debounce from "@/libs/debounce";
import Notes from "@/core/Notes";

export default {
    props: ["query"],
    data() {
        return {
            results: []
        }
    },
    methods: {
        onSelect(res) {            
            this.$router.push(`/view-note/${res.note_id}`)
        },        
    },
    watch: {
        query: function(value) {            
            debounce(
                () => this.results = Notes.search(value),
                150
            )();            
        }
    }
};
</script>

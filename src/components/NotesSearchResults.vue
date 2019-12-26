<template>
    <div class="columns">
        <div class="column is-10 is-offset-1">
            <div class="content">
                <h3 class="has-text-centered">Search results for "{{this.$store.state.searchQuery}}"</h3>
                <div
                    class="box note-seach-result-box"
                    v-for="note in this.$store.state.searchResultList"
                    v-bind:key="note.id"
                >
                    <div class="media-content" v-on:click="onSelect(note)">
                        <div class="content">
                            <p>
                                <strong v-html="note.title" />
                                <br />
                                <span class="note-content-preview" v-html="note.content" />
                            </p>
                        </div>
                    </div>
                </div>
                <p class="is-size-6 has-text-centered">{{this.$store.state.searchResultList.length}} results found</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        onSelect(note) {
            this.$emit("select", note.note_id);
        }
    }
};
</script>
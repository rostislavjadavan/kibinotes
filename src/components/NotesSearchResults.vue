<template>
    <div class="columns">
        <div class="column is-10 is-offset-1">
            <table class="table is-fullwidth">
                <tbody>
                    <div v-for="note in this.results" v-bind:key="note.id">
                        <tr>
                            <td
                                class="note-title-cell"
                                v-on:click="onSelect(note)"
                                v-html="note.title"
                            />
                        </tr>
                        <tr>
                            <td
                                class="note-content-preview-cell"                                
                                v-html="note.content"
                            />
                        </tr>
                    </div>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import NoteService from "@/libs/NoteService";
export default {
    props: {
        query: String
    },
    data() {
        return {
            results: []
        };
    },
    methods: {
        onSelect(note) {
            this.$emit("select", note.note_id);
        }
    },
    watch: {
        query: function(val) {
            this.results = [];
            let vueThis = this;
            NoteService.search(val, function(err, rows) {
                vueThis.results = rows;
            });
        }
    }
};
</script>
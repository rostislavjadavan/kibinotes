<template>
    <div class="columns">
        <div class="column is-10 is-offset-1">
            <table class="table is-fullwidth">
                <tbody>
                    <tr v-for="note in this.$store.state.noteList" v-bind:key="note.id">
                        <td class="note-title-cell" v-on:click="onSelect(note)">{{note.title}}</td>
                        <td class="note-actions-cell" align="right">
                            <a href="#" v-on:click="onDelete(note)">
                                <span class="icon">
                                    <i class="fas fa-trash-alt"></i>
                                </span>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        onDelete(note) {
            this.$emit("delete", note);
        },
        onSelect(note) {            
            this.$emit("select", note.id);
        }
    }
}
</script>
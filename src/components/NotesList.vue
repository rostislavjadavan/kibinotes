<template>
    <div class="columns">
        <div class="column is-10 is-offset-1">
            <table class="table is-fullwidth">
                <tbody>
                    <tr v-for="note in notes" v-bind:key="note.id">
                        <td class="note-title-cell" v-on:click="onSelect(note)">
                            {{ note.title }}
                        </td>
                        <td class="note-actions-cell" align="right">
                            <a href="#" v-on:click="onEdit(note)">
                                <span class="icon">
                                    <i class="fas fa-edit"></i>
                                </span>
                            </a>                        
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
import Notes from "@/core/Notes";
export default {
    data() {
        return {
            notes: [],
        };
    },
    mounted() {
        this.reloadNotes();
    },
    methods: {
        reloadNotes() {
            this.notes = Notes.list();         
        },
        onDelete(note) {
            this.$buefy.dialog.confirm({
                message:
                    "Are you sure you want to delete note <b>" +
                    note.title +
                    "</b>",
                confirmText: "Yes, delete",
                type: "is-danger",
                scroll: "keep",
                onConfirm: () => {
                    Notes.delete(note);
                    this.reloadNotes();
                    this.$buefy.toast.open(
                        "Note <b>" + note.title + "</b> deleted!"
                    );
                },
            });
        },
        onEdit(note) {
            this.$router.push(`/edit/${note.id}`);
        },
        onSelect(note) {
            this.$router.push(`/view/${note.id}`);
        },
    },
};
</script>

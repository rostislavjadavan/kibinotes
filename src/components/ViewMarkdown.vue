<template>
    <div class="content">
        <div class="note-editor-nav">
            <div class="buttons">
                <button class="button is-success" v-on:click="onEdit">
                    <span class="icon is-small">
                        <i class="fas fa-edit"></i>
                    </span>
                    <span>Edit</span>
                </button>

                <button class="button is-danger" v-on:click="onDelete">
                    <span class="icon is-small">
                        <i class="fas fa-trash-alt"></i>
                    </span>
                    <span>Delete</span>
                </button>

                <button class="button" v-on:click="onDashboard">
                    <span class="icon is-small">
                        <i class="fas fa-align-justify"></i>
                    </span>
                    <span>Go to Dashboard</span>
                </button>
            </div>
        </div>

        <div ref="markdown" class="markdown-body" v-html="content" />
    </div>
</template>

<script>
import Unified from "unified";
import RemarkParse from "remark-parse";
import RemartRehype from "remark-rehype";
import RehypeFormat from "rehype-format";
import RehypeStringify from "rehype-stringify";
import RehypeRaw from "rehype-raw";
import RemarkExternalLinks from "remark-external-links";
import RemarkEmoji from "remark-gemoji";
import RemarkTodoPlugin from "@/libs/remark_todo_plugin";
import Mark from "@/libs/mark";
import Notes from "@/core/Notes";

export default {
    props: ["id"],
    data() {
        return {
            note: null,
            processor: null,
            content: "",
        };
    },
    methods: {
        highlightSearchQuery() {
            if (this.$store.state.searchQuery) {
                var markInstance = new Mark(this.$refs.markdown);
                var options = {
                    acrossElements: true,
                    separateWordSearch: true,
                    diacritics: true,
                };
                markInstance.mark(this.$store.state.searchQuery, options);
            }
        },
        onEdit() {            
            this.$router.push(`/edit-note/${this.note.id}`)
        },        
        onDashboard() {
            this.$router.push({ name: "dashboard" })
        },
        onDelete() {
            this.$buefy.dialog.confirm({
                message:
                    "Are you sure you want to delete note <b>" +
                    note.title +
                    "</b>",
                confirmText: "Yes, delete",
                type: "is-danger",
                scroll: "keep",
                onConfirm: () => {
                    Notes.delete(this.note)
                    this.$router.push({ name: "dashboard" })
                    this.$buefy.toast.open(
                        "Note <b>" + note.title + "</b> deleted!"
                    )
                },
            })
        },
    },
    beforeMount() {
        this.processor = Unified()
            .use(RemarkParse)
            .use(RemarkExternalLinks, { target: "_blank" })
            .use(RemarkTodoPlugin)
            .use(RemarkEmoji)
            .use(RemartRehype)
            .use(RehypeRaw)
            .use(RehypeFormat)
            .use(RehypeStringify);

        this.note = Notes.getById(this.id);
        this.content = this.processor.processSync(this.note.content).toString();
    },
    mounted() {
        this.highlightSearchQuery();
    },
};
</script>

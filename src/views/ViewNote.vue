<template>
    <div class="view">
        <div class="note-editor-nav row">
            <div class="col-xs">
                <a class="button is-success" v-on:click="onEdit">
                    <span class="icon is-small">
                        <i class="fas fa-edit"></i>
                    </span>
                    <span>Edit</span>
                </a>
            </div>
            <div class="col-xs has-text-right">                
                <a class="button" v-on:click="$router.push('/')">
                    <span class="icon is-small">
                        <i class="fas fa-align-justify"></i>
                    </span>
                    <span>Dashboard</span>
                </a>
                <a class="button is-danger" v-on:click="onDelete">
                    <span class="icon is-small">
                        <i class="fas fa-trash-alt"></i>
                    </span>
                    <span>Delete</span>
                </a>
            </div>
        </div>

        <div ref="markdown" class="markdown-body content" v-html="content" />
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
            this.$router.push(`/edit-note/${this.note.id}`);
        },
        onDelete() {
            this.$buefy.dialog.confirm({
                message:
                    "Are you sure you want to delete note <b>" +
                    this.note.title +
                    "</b>",
                confirmText: "Yes, delete",
                type: "is-danger",
                scroll: "keep",
                onConfirm: () => {
                    Notes.delete(this.note);
                    this.$router.push("/");
                    this.$buefy.toast.open(
                        "Note <b>" + this.note.title + "</b> deleted!"
                    );
                },
            });
        },
    },
    beforeMount() {
        if (!this.$route.params.id) {
            this.$router.push(`/`);
        }
        this.note = Notes.getById(this.$route.params.id);

        this.processor = Unified()
            .use(RemarkParse)
            .use(RemarkExternalLinks, { target: "_blank" })
            .use(RemarkTodoPlugin)
            .use(RemarkEmoji)
            .use(RemartRehype)
            .use(RehypeRaw)
            .use(RehypeFormat)
            .use(RehypeStringify);

        this.content = this.processor.processSync(this.note.content).toString();
    },
    mounted() {
        this.highlightSearchQuery();
    },
};
</script>

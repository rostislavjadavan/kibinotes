<template>
    <div class="view">
        <nav class="navbar is-fixed-top">
            <div class="navbar-brand">
                <div class="navbar-item">
                    <a class="app-logo" v-on:click="$router.push('/')" />
                </div>
                <div class="navbar-item">
                    <a class="button is-success mx-2" v-on:click="onEdit">
                        <span class="icon is-small">
                            <i class="fas fa-edit"></i>
                        </span>
                        <span>Edit</span>
                    </a>

                    <a class="button mx-2" v-on:click="onHistory">
                        <span class="icon is-small">
                            <i class="fas fa-history"></i>
                        </span>
                        <span>History</span>
                    </a>
                    <a class="button is-danger mx-2" v-on:click="onDelete">
                        <span class="icon is-small">
                            <i class="fas fa-trash-alt"></i>
                        </span>
                        <span>Delete</span>
                    </a>
                </div>
            </div>
        </nav>

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
            this.$router.push(`/edit/${this.note.id}`);
        },
        onHistory() {
            this.$router.push(`/history/${this.note.id}`);
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

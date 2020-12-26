<template>
    <div class="settings view">
        <div class="note-editor-nav">
            <div class="buttons">
                <button
                    class="button"
                    v-on:click="$router.push({ name: 'dashboard' })"
                >
                    <span class="icon is-small">
                        <i class="fas fa-align-justify"></i>
                    </span>
                    <span>Go to Dashboard</span>
                </button>
            </div>
        </div>

        <nav class="breadcrumb" aria-label="breadcrumbs">
            <ul>
                <li>
                    <a href="#" v-on:click="$router.push({ name: 'dashboard' })"
                        >Dashboard</a
                    >
                </li>
                <li class="is-active">
                    <a href="#" aria-current="page">Settings</a>
                </li>
            </ul>
        </nav>
        <div class="content">
            <h1>Settings</h1>
            <h2>Theme</h2>

            <div class="field">
                <b-radio
                    v-on:input="onThemeChange"
                    v-model="theme"
                    native-value="light"
                    >Light (default)</b-radio
                >
            </div>
            <div class="field">
                <b-radio
                    v-on:input="onThemeChange"
                    v-model="theme"
                    native-value="dark"
                    >Dark</b-radio
                >
            </div>

            <hr />
            <h2>System stuff</h2>
            <h4>Search index</h4>
            <p>
                When search goes crazy you can fix it by rebuilding whole search
                index.
            </p>
            <div v-if="working">
                <b-progress></b-progress>
            </div>
            <div v-if="!working">
                <div class="mb1">
                    <button class="button" v-on:click="onRebuldIndex">
                        <span class="icon is-small">
                            <i class="fas fa-sync"></i>
                        </span>
                        <span>Rebuild note search index</span>
                    </button>
                </div>
            </div>
            <pre v-html="log" v-if="log" />

            <h4>Notes storage</h4>
            <p>Notes are stored in Sqlite3 database file. Current file location is:</p>
            <code v-html="dbpath" />
        </div>
    </div>
</template>

<script>
import NoteService from "@/libs/NoteService";
import NoteIndexService from "@/libs/NoteIndexService";
import * as Storage from "@/libs/storage";

export default {
    data() {
        return {
            theme: this.$store.state.theme,
            working: false,
            log: "",
            dbpath: Storage.path,
        };
    },
    methods: {
        onThemeChange(value) {
            this.$store.dispatch("setTheme", value);
            this.$buefy.toast.open("Theme changed to " + value);
        },
        onRebuldIndex() {
            let vueThis = this;
            this.working = true;
            this.log = "";
            NoteService.list((err, rows) => {
                if (err) {
                    vueThis.$buefy.toast.open({
                        message: "Error :( " + err,
                        type: "is-danger",
                    });
                } else {
                    rows.forEach((row) => {
                        vueThis.log += `processing ${row.id} ${row.title}\n`;
                        NoteService.get(row.id, (err, note) => {
                            NoteIndexService.remove(note, () => {
                                NoteIndexService.create(
                                    note.id,
                                    note.title,
                                    () => {
                                        vueThis.log += `done ${row.id}\n`;
                                        NoteIndexService.update(note);
                                    }
                                );
                            });
                        });
                    });
                    vueThis.working = false;
                }
            });
        },
    },
};
</script>
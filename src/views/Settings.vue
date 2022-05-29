<template>
    <div class="settings view">
        <nav class="navbar is-fixed-top">
            <div class="navbar-brand">
                <div class="navbar-item">
                    <a class="app-logo" v-on:click="$router.push('/')" />
                </div>
            </div>
        </nav>

        <div class="content">
            <h2>Theme</h2>

            <div class="field">
                <b-radio
                    v-on:input="onThemeChange"
                    v-model="theme"
                    native-value="light"
                    >Light</b-radio
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
            <div class="field">
                <b-radio
                    v-on:input="onThemeChange"
                    v-model="theme"
                    native-value="nord"
                    >Nord</b-radio
                >
            </div>

            <h2 class="mt-6">Notes database</h2>
            <b-field>
                <a class="button is-success" @click="onOpen()">
                    <span class="icon is-small">
                        <i class="fas fa-save"></i>
                    </span>
                    <span>Open</span>
                </a>

                <a class="button is-warning mx-2" @click="onCreate()">
                    <span class="icon is-small">
                        <i class="fas fa-plus"></i>
                    </span>
                    <span>Create new database</span>
                </a>
            </b-field>
            <b-field label="File path">
                <b-input
                    placeholder="Disabled"
                    is-disabled
                    v-model="dbPath"
                ></b-input>
            </b-field>

            <h2 class="mt-6">Source code</h2>
            <p>
                <a href="https://github.com/rostislavjadavan/kibinotes"
                    >https://github.com/rostislavjadavan/kibinotes</a
                >
            </p>
        </div>
    </div>
</template>

<script>
import DB from "../core/Database";
import electron from "../libs/electron";
export default {
    data() {
        return {
            theme: this.$store.getters.theme,
            dbPath: this.$store.getters.dbPath,
        };
    },
    methods: {
        onThemeChange(value) {
            this.$store.dispatch("setTheme", value);
            this.$buefy.toast.open("Theme changed to " + value);
        },
        onOpen() {
            const res = electron.remote.dialog.showOpenDialogSync({
                properties: ["openFile"],
            });

            if (typeof res == "undefined") {
                return;
            }

            const filepath = res[0];
            const dbRes = DB.open(filepath);

            if (!dbRes.success) {
                this.$buefy.toast.open({
                    message: `Error: ${dbRes.error}`,
                    type: "is-warning",
                });
            } else {
                this.$store.dispatch("setDbPath", filepath);
                this.$router.push("/");
                this.$buefy.toast.open(`${filepath} opened successfully!`);
            }
        },
        onCreate() {
            const filepath = electron.remote.dialog.showSaveDialogSync({
                properties: ["createDirectory"],
            });

            if (typeof filepath == "undefined") {
                return;
            }
            
            const dbRes = DB.create(filepath);

            if (!dbRes.success) {
                this.$buefy.toast.open({
                    message: `Error: ${dbRes.error}`,
                    type: "is-warning",
                });
            } else {
                this.$store.dispatch("setDbPath", filepath);
                this.$router.push("/");
                this.$buefy.toast.open(`${filepath} created successfully!`);
            }
        }
    },
};
</script>

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

            <h2>Notes database</h2>

            <b-field label="File path">
                <b-input
                    placeholder="Disabled"
                    is-disabled
                    v-model="dbPath"
                ></b-input>
            </b-field>
            <b-field>
                <a class="button is-success" @click="onOpen()">
                    <span class="icon is-small">
                        <i class="fas fa-save"></i>
                    </span>
                    <span>Open</span>
                </a>
            </b-field>

            <h2>Source code</h2>
            <p>
                <a href="https://github.com/rostislavjadavan/kibinotes">https://github.com/rostislavjadavan/kibinotes</a>
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
        async onOpen() {
            const res = await electron.remote.dialog.showOpenDialog({
                properties: ["openFile"],
            });

            if (res.filePaths.length == 0) {
                return;
            }

            const filepath = res.filePaths[0];
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
    },
};
</script>

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
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            theme: this.$store.getters.theme,
        };
    },
    methods: {
        onThemeChange(value) {
            this.$store.dispatch("setTheme", value);
            this.$buefy.toast.open("Theme changed to " + value);
        },
    },
};
</script>

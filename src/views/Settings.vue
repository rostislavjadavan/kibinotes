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
            theme: this.$store.getters.getTheme       
        };
    },
    methods: {
        onThemeChange(value) {
            this.$store.dispatch("setTheme", value);
            this.$buefy.toast.open("Theme changed to " + value);
        },        
    }
};
</script>

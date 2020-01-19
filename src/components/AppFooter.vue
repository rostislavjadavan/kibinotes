<template>
    <div>        
        <p class="is-size-7 has-text-centered"><b-switch v-model="darkMode">Dark mode</b-switch></p>
        <p class="is-size-7 has-text-centered">build v{{appVersion}}</p>
    </div>
</template>

<script>
import { SET_THEME } from "@/mutations_names";
export default {
    data() {
        return {
            darkMode: this.$store.state.theme == 'dark'
        }
    },
    watch: {
        darkMode: function(val) {                                
            let theme = val ? "dark" : "default";            
            document.body.id = theme;
            this.$store.commit(SET_THEME, theme);
        }
    },
    computed: {        
        appVersion: function() {
            return require('electron').remote.app.getVersion();
        }
    },
    mounted() {
        document.body.id = this.$store.state.theme;        
    }
}
</script>
<template>
    <div class="app">        
        <router-view />
    </div>
</template>

<script>
import { remote } from "@/libs/electron.js";
import "typeface-source-sans-pro";
import "@fortawesome/fontawesome-free/js/all.js";
import LoggingService from "@/libs/LoggingService";
import ThemeService from "@/libs/ThemeService"
export default {
    mounted() {
        const appVersion = remote.app.getVersion();
        const os = require("os");
        LoggingService.info(
            `application started, version=${appVersion}, os=${os.type()}, ${os.release()}, ${os.platform()}`
        );
        ThemeService.initTheme();
    },
    beforeDestroy() {
        LoggingService.info("application finished");
    },
};
</script>

<style>
@import "assets/app.css";
@import "assets/themes/dark.css";
@import "assets/themes/nord.css";
</style>
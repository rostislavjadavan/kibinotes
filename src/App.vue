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
export default {
    mounted() {
        const appVersion = remote.app.getVersion();
        const os = require("os");
        const path = require("path");
        LoggingService.info(
            `application started, version=${appVersion}, os=${os.type()}, ${os.release()}, ${os.platform()}`
        );        
    },
    beforeDestroy() {
        LoggingService.info("application finished");
    },
};
</script>

<style>
@import "assets/app.css";
@import "assets/dark.css";
</style>
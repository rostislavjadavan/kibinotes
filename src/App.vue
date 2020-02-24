<template>
    <router-view />
</template>

<script>
import "typeface-source-sans-pro";
import "@fortawesome/fontawesome-free/js/all.js";
import LoggingService from '@/libs/LoggingService'
export default {
    mounted() {
        var os = require('os');
        LoggingService.info("application started " + os.type() + ", " + os.release() + ", " + os.platform());
    },
    beforeDestroy() {
        LoggingService.info("application finished");
    }
};
</script>

<style>
@import "assets/app.css";
@import "assets/dark.css";
</style>
<template>
    <div class="app">        
        <router-view />
    </div>
</template>

<script>
import "typeface-source-sans-pro";
import "@fortawesome/fontawesome-free/js/all.js";
import Theme from "@/core/Theme"
export default {
    mounted() {          
        Theme.setup();
    },    
};
</script>

<style>
@import "assets/app.css";
@import "assets/themes/dark.css";
@import "assets/themes/nord.css";
</style>

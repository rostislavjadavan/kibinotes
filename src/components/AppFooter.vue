<template>
    <div>                
        <p class="is-size-7 has-text-centered">version {{appVersion}}</p>
    </div>
</template>

<script>
export default {
    computed: {        
        appVersion: function() {
            return require('electron').remote.app.getVersion();
        }
    }    
}
</script>

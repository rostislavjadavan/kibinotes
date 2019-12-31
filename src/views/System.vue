<template>
    <div class="system view">
        <div class="content">
            <h1>System</h1>
            <div class="mb1">
                <button class="button" v-on:click="$router.push({name:'dashboard'})">
                    <span class="icon is-small">
                        <i class="fas fa-align-justify"></i>
                    </span>
                    <span>Go to Dashboard</span>
                </button>
            </div>

            <div v-if="working">
                <b-progress></b-progress>
            </div>
            <div v-if="!working">
                <div class="mb1">
                    <button class="button" v-on:click="onRebuldIndex">
                        <span class="icon is-small">
                            <i class="fas fa-sync"></i>
                        </span>
                        <span>Rebuild note search index</span>
                    </button>
                </div>
            </div>
            <pre v-html="log" v-if="log" />
        </div>
    </div>
</template>

<script>
import NoteService from "@/libs/NoteService";
import NoteIndexService from "@/libs/NoteIndexService";

export default {
    data() {
        return {
            working: false,
            log: ""
        };
    },
    methods: {
        onRebuldIndex() {
            let vueThis = this;
            this.working = true;
            this.log = "";
            NoteService.list((err, rows) => {
                if (err) {
                    vueThis.$buefy.toast.open({
                        message: "Error :( " + err,
                        type: "is-danger"
                    });
                } else {
                    rows.forEach(row => {
                        vueThis.log += `processing ${row.id} ${row.title}\n`;
                        NoteService.get(row.id, (err, note) => {
                            NoteIndexService.remove(note, () => {                                                        
                                NoteIndexService.create(note.id, note.title, () => {
                                    vueThis.log += `done ${row.id}\n`
                                    NoteIndexService.update(note);
                                });
                            });
                        });
                    });
                    vueThis.working = false;
                }
            });
        }
    }
};
</script>
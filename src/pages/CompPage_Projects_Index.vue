<script>
    import { store } from "../store";
    import axios from "axios";
    import Comp_ViewAllProjects from "../components/Comp_ViewAllProjects.vue";
    export default
    {
        name        :   "CompPage_Projects_Index",
        components  :
        {
            Comp_ViewAllProjects
        },
        data()
        {
            return  {
                        store
                    }
        },
        created()
        {
            this.store.current_page = "projects_index";
            this.get_projects();
        },
        methods:
        {
            get_projects()
            {
                this.store.projects_updated.running = true;
                axios.get(`${this.store.api_url_root}/api/projects`)
                    .then( response =>
                        {
                            this.store.projects = response.data.projects;
                            this.store.projects_updated.running = false;
                            this.store.projects_updated.success = true;
                            console.log(this.store.projects);
                        })
                    .catch( error =>
                        {
                            this.store.projects_updated.running = false;
                            this.store.projects_updated.success = false;                                
                        });
                let now = new Date();
                this.store.projects_updated.date = now.toDateString();
                this.store.projects_updated.time = now.toTimeString();
            }
        }
    }
</script>

<template>

    <div 
     id="on_loading" 
     v-if="store.projects_updated.running">
        <h2>
            <i class="fa-solid fa-hourglass-start fa-spin-pulse"></i>
        </h2>
        <h3>Caricamento progetti in corso ...</h3>
    </div>

    <Comp_ViewAllProjects 
     v-else-if="store.projects_updated.success"
     :collection = "store.projects" 
     :items_per_row = "store.projects_per_row"
     :backup_img = "store.backup_img_path"
     :api_url_root = "store.api_url_root" />

     <div 
      id="loading_failed" 
      v-else>
        <h2 class="text-warning text-center pt-5">Errore nel caricamento o collezione vuota!</h2>
     </div>
</template>

<style scoped lang="scss">
    #on_loading
    {
        padding-top: 33vh;
        text-align: center;
        color: blue;
    }
</style>
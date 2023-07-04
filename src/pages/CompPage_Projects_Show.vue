<script>
    import { store } from "../AxiosStore";
    import Comp_ViewOneProject from "../components/Comp_ViewOneProject.vue";
    export default
    {
        name        :   "CompPage_Projects_Show",
        components  :
        {
            Comp_ViewOneProject
        },
        data()
        {
            return  {
                        store
                    } 
        },
        created()
        {
            this.store.current_page = "projects_show";
            this.store.get_single_project(this.$route.params.slug);
        }
    }
</script>

<template>
    <div v-if="store.projects_load_running" id="project_on_loading">
        <h2>
            <i class="fa-solid fa-hourglass-start fa-spin-pulse"></i>
        </h2>
        <h3>Attendere il caricamento del progetto selezionato ...</h3>
    </div>

    <div v-else-if="store.projects_load_success">
        <Comp_ViewOneProject 
             :is_single = "true"
             :project = "store.single_project"
             :backup_img = "store.backup_img_path"
             :api_url_root = "store.api_url_root" />
    </div>

     <div id="loading_failed" v-else>
        <h2 class="text-warning text-center pt-5">Errore nel caricamento o progetto inesistente!</h2>
     </div>
</template>

<style scoped lang="scss">
    #project_on_loading
    {
        padding-top: 33vh;
        text-align: center;
        color: white;
    }
</style>
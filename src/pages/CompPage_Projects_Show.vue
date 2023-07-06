<script>
    import { store } from "../AxiosStore";
    import Comp_ViewOneProject from "../components/Comp_ViewOneProject.vue";
    import Comp_OnLoading from "../components/Comp_OnLoading.vue";
    export default
    {
        name        :   "CompPage_Projects_Show",
        components  :
        {
            Comp_ViewOneProject,
            Comp_OnLoading
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
    <Comp_OnLoading 
     v-if="store.projects_load_running"
     :hg_color = "'lightblue'"
     :message = "'Attendere il caricamento del progetto selezionato ...'"
     :big = "true" />

    <Comp_ViewOneProject 
     v-else-if="store.projects_load_success"
     :is_single = "true"
     :project = "store.single_project"
     :backup_img = "store.backup_img_path"
     :api_url_root = "store.api_url_root" />

    <div v-else>
        {{ store.invoke_error_viewer(store.projects_load_error, 2000) }}
     </div>
</template>

<style scoped lang="scss">
</style>
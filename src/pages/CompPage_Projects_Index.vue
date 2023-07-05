<script>
    import { store } from "../AxiosStore";
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
                        store,
                    }
        },
        created()
        {
            this.store.current_page = "projects_index";
            this.get_all_projects();
        },
        methods:
        {
            get_all_projects()
            {
                this.store.axios_call_params = { page : 1 };
                this.store.categories_filter = this.store.categories.length + 1;
                this.store.init_tech_filter();
                this.store.get_projects();
            },

            show_project(project_slug)
            {
                console.log("chiamata pagina show: ", project_slug);
                this.$router.push({ name : 'projects_show', params : { slug : project_slug } });   
            }
        }
    }
</script>

<template>
    <div v-if="store.projects_load_running" id="on_loading">
        <h2>
            <i class="fa-solid fa-hourglass-start fa-spin-pulse"></i>
        </h2>
        <h3>Caricamento progetti in corso ...</h3>
    </div>

    <Comp_ViewAllProjects 
     v-else-if="store.projects_load_success"
     :collection = "store.projects" 
     :items_per_row = "store.projects_per_row"
     :backup_img = "store.backup_img_path"
     :api_url_root = "store.api_url_root"
     @rebounded_emit = "show_project" />

     <div id="loading_failed" v-else>
        {{ store.invoke_error_viewer(store.projects_load_error, 2000) }}
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
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
            this.axios_call();
        },
        methods:
        {
            axios_call()
            {
                axios.get(`${this.store.api_url_root}/api/projects`).then( response =>
                    {
                        this.store.projects = response.data.projects;
                        console.log(this.store.projects);
                    });
            }
        }
    }
</script>

<template>
    <Comp_ViewAllProjects 
     :collection = "store.projects" 
     :items_per_row = "store.projects_per_row" />
</template>

<style scoped lang="scss">
</style>
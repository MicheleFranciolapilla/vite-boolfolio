<script>
    import { store } from "../store";
    import Comp_Single_Project from "./Comp_Single_Project.vue";
    export default
    {
        name        : "Comp_Projects",
        components  :
        {
            Comp_Single_Project
        },
        data()
        {
            return {
                store
            }
        }
    }
</script>

<template>
    <div id="projects_collection">
        <div
         v-for="(single_project, index) in store.projects"
         :key="index">
            <Comp_Single_Project :project = "single_project" />
        </div>
    </div>    
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "../assets/style/main.scss" as *;
</style>
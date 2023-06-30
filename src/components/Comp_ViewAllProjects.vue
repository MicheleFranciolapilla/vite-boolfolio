<script>
    import Comp_ViewOneProject from "./Comp_ViewOneProject.vue";
    export default
    {
        name        : "Comp_ViewAllProjects",
        props       : ['collection', 'items_per_row'],
        components  :
        {
            Comp_ViewOneProject
        },
        data()
        {
            return {
            }
        }
    }
</script>

<template>
    <div id="projects_collection">
        <Comp_ViewOneProject 
         v-for="(collection_item, index) in collection" 
         :key="index" 
         :project = "collection_item" />
    </div>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "../assets/style/main.scss" as *;
</style>
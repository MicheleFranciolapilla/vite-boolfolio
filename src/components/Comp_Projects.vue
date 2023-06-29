<script>
    export default
    {
        name    : "Comp_Projects",
        props   : ['backup_img', 'projects_collection'],
    }
</script>

<template>
    <div id="projects_collection">
        <div class="card"
         v-for="(project, index) in projects_collection"
         :key="index">
            <img :src="backup_img" alt="">
            <h5>{{ project.title }}</h5>
        </div>
    </div>    
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "../assets/style/main.scss" as *;
</style>
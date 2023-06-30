<script>
    export default
    {
        name    : "Comp_ViewOneProject",
        props   : ['project'],
        data()
        {
            return {
            }
        }
    }
</script>

<template>
    <h1>----------------------------------</h1>
    <h3>{{ project.title }}</h3>
    <h4>{{ project.description }}</h4>
    <h1>----------------------------------</h1>
    <!-- <div class="card">
        <img :src="(project.cover_img !== null ? project.cover_img : store.backup_img_path)" alt="">
        <h5>{{ project.title }}</h5>
    </div> -->
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "../assets/style/main.scss" as *;
</style>
<script>
    import { store } from "../store";
    export default
    {
        name    : "Comp_Single_Project",
        props   : ['project'],
        data()
        {
            return {
                store
            }
        }
    }
</script>

<template>
    <div class="card">
        <img :src="(project.cover_img !== null ? project.cover_img : store.backup_img_path)" alt="">
        <h5>{{ project.title }}</h5>
    </div>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "../assets/style/main.scss" as *;
</style>
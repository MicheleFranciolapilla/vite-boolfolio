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
    <div class="card">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
    <!-- <h1>----------------------------------</h1>
    <h3>{{ project.title }}</h3>
    <h4>{{ project.description }}</h4>
    <h1>----------------------------------</h1> -->
    <!-- <div class="card">
        <img :src="(project.cover_img !== null ? project.cover_img : store.backup_img_path)" alt="">
        <h5>{{ project.title }}</h5>
    </div> -->
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "../assets/style/main.scss" as *;
</style>
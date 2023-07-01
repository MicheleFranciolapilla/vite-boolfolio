<script>
    export default
    {
        name    : "Comp_Footer",
        data()
        {
            return {

            }
        }
    }
</script>

<template>
    <footer class="fixed-bottom border border-3 border-info bg-light">
    </footer>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "../assets/style/main.scss" as *;
    footer
    {
        height: $footer_height;
        // background-color: $fixed_color;
    }
</style>
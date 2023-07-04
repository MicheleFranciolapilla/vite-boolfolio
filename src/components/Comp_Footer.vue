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
    <footer class="fixed-bottom border border-3 border-info bg-light d-flex justify-content-between align-items-center px-3">
        <h6>Portfolio progetti di Michele Franciolapilla - Boolean Academy, classe 93</h6>
        <h5 class="text-success">AKI A.c.p. 2023</h5>
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
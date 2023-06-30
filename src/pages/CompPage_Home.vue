<script>
    import { store } from "../store";
    export default
    {
        name    :   "CompPage_Home",
        data()
        {
            return  {
                        store
                    }
        },
        created()
        {
            this.store.current_page = "home";
        }
    }
</script>

<template>
</template>

<style scoped lang="scss">
</style>
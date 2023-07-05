<script>
    import { store } from '../AxiosStore';
    export default
    {
        name    : "Comp_ErrorViewer",
        data()
        {
            return {
                store
            }
        }
    }
</script>

<template>
    <div id="error_viewer" class="d-none px-4 py-3 border border-3 border-danger rounded-3 bg-warning">
        <h2 class="text-center text-danger">{{ store.error_message }}</h2>
    </div>
</template>

<style scoped lang="scss">
    #error_viewer
    {
        max-width: 75%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1010;
    }
</style>
<script>
    import { store } from "../store";
    export default
    {
        name    : "Comp_Manager",
        data()
        {
            return  {
                        store
                    }
        } 
    }
</script>

<template>
    <dir id="page_manager" class="border border-2 border-dark bg-info px-2">
        <div id="page_buttons">
        </div>
        <div id="info_box">
            <span id="full_length_title" class="d-none px-2 text-primary border border-1 border-light rounded-2 bg-dark"></span>
        </div>
    </dir>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "../assets/style/main.scss" as *;

    #page_manager
    {
        width: 100%;
        height: $page_manager_h;
        display: flex;
        justify-content: space-between;
        align-items: center;
        column-gap: 5rem;
        #page_buttons
        {

        }
        #info_box
        {
            max-width: calc(60%);
            height: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            #full_length_title
            {
                width: calc(100%);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: clip;
                height: 90%;
                display: flex;
                align-items: center;
            }
        }
    }
</style>
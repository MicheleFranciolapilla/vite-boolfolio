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
        },
        methods:
        {
            change_page(page_nr)
            {
                console.log("from paga manager");
                this.store.paging_events.change_page = true;
                this.store.paging_events.page_to_go = page_nr;
            }
        }
    }
</script>

<template>
    <dir id="page_manager" class="border border-2 border-dark bg-info px-2">
        <div id="page_buttons" class="d-flex justify-content-start align-items-center column-gap-3 ps-1">
            <button id="btn_first_page" class="paging_btn btn btn-light btn-outline-primary" type="button"
             :class="(store.api_paging_info.api_current_page == 1) ? 'disabled' : ''"
             v-on:click="change_page(1)">
                <i class="fa-solid fa-backward-fast"></i>
            </button>
            <button id="btn_prev_page" class="paging_btn btn btn-light btn-outline-primary" type="button"
             :class="(store.api_paging_info.api_current_page == 1) ? 'disabled' : ''"
             v-on:click="change_page(store.api_paging_info.api_current_page - 1)">
                <i class="fa-solid fa-caret-left"></i>
            </button>
            <div id="page_current" class="px-2 text-white bg-dark">
                <span>{{ store.api_paging_info.api_current_page }}</span>
            </div>
            <h5>/</h5>
            <div id="page_total" class="px-2 text-white bg-dark">
                <span>{{ store.api_paging_info.api_total_pages }}</span>
            </div>
            <button id="btn_next_page" class="paging_btn btn btn-light btn-outline-primary" type="button"
             :class="(store.api_paging_info.api_current_page == store.api_paging_info.api_total_pages) ? 'disabled' : ''"
             v-on:click="change_page(store.api_paging_info.api_current_page + 1)">
                <i class="fa-solid fa-caret-right"></i>
            </button>
            <button id="btn_last_page" class="paging_btn btn btn-light btn-outline-primary" type="button"
             :class="(store.api_paging_info.api_current_page == store.api_paging_info.api_total_pages) ? 'disabled' : ''"
             v-on:click="change_page(store.api_paging_info.api_total_pages)">
                <i class="fa-solid fa-forward-fast"></i>
            </button>
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
        column-gap: 3rem;
        #info_box
        {
            max-width: calc(75%);
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
<script>
    import { store } from "../AxiosStore";
    import Comp_ViewAllProjects from "../components/Comp_ViewAllProjects.vue";
    export default
    {
        name        :   "CompPage_Projects_Index",
        components  :
        {
            Comp_ViewAllProjects
        },
        data()
        {
            return  {
                        store,

                    }
        },
        created()
        {
            this.store.current_page = "projects_index";
            this.get_projects();
        },
        methods:
        {
            event_check()
            {
                if (this.store.paging_events.change_page)
                {
                    this.store.paging_events.change_page = false;
                    console.log("richiesta nuova pagina");
                    this.axios_call_params.page = this.store.paging_events.page_to_go;
                    this.get_projects();
                }
            },

            set_actual_categories_filter_value()
            {
                let found_checked = false;
                let index = 0;
                do
                {
                    let id_str = "category" + index.toString();
                    let current_id = document.getElementById(id_str); 
                    if (current_id.checked)
                    {
                        found_checked = true;
                        this.store.categories_filter = index;
                    }
                    index++;
                } while ((!found_checked) && (index < this.store.categories.length));
                if (!found_checked)
                {
                    if (document.getElementById("category-1").checked)
                        this.store.categories_filter = -1;
                    else
                        this.store.categories_filter = -2;
                }
            },

            get_filtered_projects()
            {   this.set_actual_categories_filter_value();
                let temp_params = { page : 1 };
                if (this.store.categories_filter != -2)
                {
                    if (this.store.categories_filter == -1)
                        temp_params.category_id = "";
                    else
                        temp_params.category_id = this.store.categories_filter + 1;
                }
                this.axios_call_params = temp_params;
                this.get_projects();
            },


        }
    }
</script>

<template>
    <div v-if="store.projects_load_running" id="on_loading">
        <h2>
            <i class="fa-solid fa-hourglass-start fa-spin-pulse"></i>
        </h2>
        <h3>Caricamento progetti in corso ...</h3>
    </div>

    <Comp_ViewAllProjects 
     v-else-if="store.projects_load_success"
     :collection = "store.projects" 
     :items_per_row = "store.projects_per_row"
     :backup_img = "store.backup_img_path"
     :api_url_root = "store.api_url_root" />

     <div 
      id="loading_failed" 
      v-else>
        <h2 class="text-warning text-center pt-5">Errore nel caricamento o collezione vuota!</h2>
     </div>
</template>

<style scoped lang="scss">
    #on_loading
    {
        padding-top: 33vh;
        text-align: center;
        color: blue;
    }
</style>
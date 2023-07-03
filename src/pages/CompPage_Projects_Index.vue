<script>
    import { store } from "../store";
    import axios from "axios";
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
                        axios_call_params       :   {
                                                        page    :   1 
                                                    }
                    }
        },
        created()
        {
            this.store.current_page = "projects_index";
            this.get_projects();
        },
        mounted()
        {
            this.add_paging_events_listener();
        },
        beforeUnmount()
        {
            this.remove_paging_events_listener();
        },
        methods:
        {
            add_paging_events_listener()
            {
                let btn_first = document.getElementById("btn_first_page");
                btn_first.addEventListener("click", this.event_check);
                let btn_prev = document.getElementById("btn_prev_page");
                btn_prev.addEventListener("click", this.event_check);
                let btn_next = document.getElementById("btn_next_page");
                btn_next.addEventListener("click", this.event_check);
                let btn_last = document.getElementById("btn_last_page");
                btn_last.addEventListener("click", this.event_check);
                
                let btn_filter = document.getElementById("btn_with_filters");
                btn_filter.addEventListener("click", this.get_filtered_projects);
            },

            remove_paging_events_listener()
            {
                let btn_first = document.getElementById("btn_first_page");
                btn_first.removeEventListener("click", this.event_check);
                let btn_prev = document.getElementById("btn_prev_page");
                btn_prev.removeEventListener("click", this.event_check);
                let btn_next = document.getElementById("btn_next_page");
                btn_next.removeEventListener("click", this.event_check);
                let btn_last = document.getElementById("btn_last_page");
                btn_last.removeEventListener("click", this.event_check);

                let btn_filter = document.getElementById("btn_with_filters");
                btn_filter.removeEventListener("click", this.get_filtered_projects);
            },

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

            get_projects()
            {
                console.log("chiamata axios");
                this.store.projects_updated.running = true;
                const params = this.axios_call_params;
                axios.get(`${this.store.api_url_root}/api/projects`,{ params })
                    .then( response =>
                        {
                            this.store.projects = response.data.projects.data;
                            this.store.api_paging_info.api_current_page = response.data.projects.current_page;
                            this.store.api_paging_info.api_total_pages = response.data.projects.last_page;
                            this.store.api_paging_info.api_total_projects = response.data.projects.total;
                            this.store.projects_updated.running = false;
                            this.store.projects_updated.success = true;
                            console.log("dati ricevuti da api",this.store.projects);
                        })
                    .catch( error =>
                        {
                            this.store.projects_updated.running = false;
                            this.store.projects_updated.success = false;                                
                        });
                let now = new Date();
                this.store.projects_updated.date = now.toDateString();
                this.store.projects_updated.time = now.toTimeString();
            }
        }
    }
</script>

<template>
    <div 
     id="on_loading" 
     v-if="store.projects_updated.running">
        <h2>
            <i class="fa-solid fa-hourglass-start fa-spin-pulse"></i>
        </h2>
        <h3>Caricamento progetti in corso ...</h3>
    </div>

    <Comp_ViewAllProjects 
     v-else-if="store.projects_updated.success"
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
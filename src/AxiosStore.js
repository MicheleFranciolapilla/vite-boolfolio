import { reactive } from "vue";
import axios from 'axios';

export const store = reactive(
    {
        session_start           :   true,
        projects                :   [],
        projects_load_running   :   false,
        projects_load_success   :   false,
        categories              :   [],
        // Valori per categories_filter:  0 = nessuna categoria; n+1 (n = categories.length) = tutte (default); 1......n come id in tabella
        categories_filter       :   -1,
        technologies            :   [], 
        current_page            :   '',
        api_url_root            :   'http://127.0.0.1:8000',
        api_paging_info         :   {
                                        api_current_page    :   0,
                                        api_total_pages     :   0
                                    },
        axios_call_params       :   {
                                        page    :   1 
                                    },
        backup_img_path         :   "../public/img/backup_img.png",
        side_panel_visible      :   true,
        projects_per_row        :   4, 

        get_categories()
        {
            axios.get(`${this.api_url_root}/api/categories`)
                .then( response =>
                  {
                    this.categories = response.data.categories;
                    this.categories_filter = this.categories.length + 1;
                  })
                .catch( error =>
                  {
                    console.log("errore con categories");
                  });
        },

        get_technologies()
        {
          axios.get(`${this.api_url_root}/api/technologies`)
            .then( response =>
              {
                this.technologies = response.data.technologies;
              })
            .catch( error =>
              {
                console.log("errore con technologies");
              });
        },

        get_projects()
        {
            this.projects_load_running = true;
            const params = this.axios_call_params;
            axios.get(`${this.api_url_root}/api/projects`,{ params })
                .then( response =>
                    {
                        this.projects = response.data.projects.data;
                        this.api_paging_info.api_current_page = response.data.projects.current_page;
                        this.api_paging_info.api_total_pages = response.data.projects.last_page;
                        this.projects_load_running = false;
                        this.projects_load_success = true;
                    })
                .catch( error =>
                    {
                        this.projects_load_running = false;
                        this.projects_load_success = false;
                    });
        },

        toggle_bool(bool_var_ref)
        {
            this[bool_var_ref] = !this[bool_var_ref];
        },
    })
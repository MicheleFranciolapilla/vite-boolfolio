import { reactive } from "vue";
import axios from 'axios';

export const store = reactive(
    {
        session_start           :   true,
        projects                :   [],
        single_project          :   {}, 
        projects_load_running   :   false,
        projects_load_success   :   false,
        projects_load_error     :   "", 
        categories              :   [],
        // Valori per categories_filter:  0 = nessuna categoria; n+1 (n = categories.length) = tutte (default); 1......n come id in tabella
        categories_filter       :   -1,
        technologies            :   [], 
        technologies_filter     :   [],
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
        search_only_title       :   true,
        search_str_min_length   :   5,
        search_string           :   "",
        error_message           :   "",

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
                this.init_tech_filter();
              })
            .catch( error =>
              {
                console.log("errore con technologies");
              });
        },

        get_projects()
        {
          this.projects_load_running = true;
          this.projects = [];
          let params = this.axios_call_params;
          axios.get(`${this.api_url_root}/api/projects`, { params })
            .then( response =>
              {
                this.projects = response.data.projects.data;
                this.api_paging_info.api_current_page = response.data.projects.current_page;
                this.api_paging_info.api_total_pages = response.data.projects.last_page;
                this.projects_load_running = false;
                this.projects_load_success = response.data.success;
                if (!response.data.success)
                  this.projects_load_error = response.data.error;
                console.log("response ",response);
              })
            .catch( error =>
              {
                this.projects_load_running = false;
                this.projects_load_success = false;
              });
        },

        get_single_project(slug)
        {
          this.projects_load_running = true;
          this.single_project = [];
          axios.get(`${this.api_url_root}/api/projects/${slug}`)
            .then( response =>
              {
                this.projects_load_running = false;
                this.projects_load_success = response.data.success;
                if (response.data.success)
                  this.single_project = response.data.project;
                else
                  this.projects_load_error = response.error;
              });
        },

        init_tech_filter()
        {
          this.technologies_filter = [];
          for (let i = 0; i < this.technologies.length; i++)
            this.technologies_filter.push(true);
        },

        toggle_bool(bool_var_ref)
        {
            this[bool_var_ref] = !this[bool_var_ref];
        },

        tech_filters_amount()
        {
          let amount = 0;
          this.technologies_filter.forEach( tech =>
            {
              if (tech)
                amount++;
            });
          return amount;
        },

        invoke_error_viewer(message, delay)
        {
          let error_viewer = document.getElementById("error_viewer");
          this.error_message = message;
          error_viewer.classList.remove("d-none");
          setTimeout(() =>
          {
            error_viewer.classList.add("d-none");
            this.error_message = "";
          }, delay);
        }
    })
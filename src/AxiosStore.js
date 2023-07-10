import { reactive } from "vue";
import axios from 'axios';

export const store = reactive(
    {
        session_start           :   true,
        first_api_calls_done    :   false,
        current_page            :   '',
        api_url_root            :   'http://127.0.0.1:8000',

        projects                :   [],
        single_project          :   {}, 
        projects_load_running   :   false,
        projects_load_success   :   false,
        projects_load_error     :   "", 
        api_paging_info         :   {
                                      api_current_page    :   0,
                                      api_total_pages     :   0
                                    },
        axios_call_params       :   {
                                      page    :   1 
                                    },
        search_only_title       :   true,
        search_str_min_length   :   5,
        search_string           :   "",


        categories              :   [],
        categories_load_running :   false,
        categories_load_success :   false,
        categories_load_error   :   "",
        // Valori per categories_filter:  0 = nessuna categoria; n+1 (n = categories.length) = tutte (default); 1......n come id in tabella
        categories_filter       :   -1,

        technologies            :   [], 
        techs_load_running      :   false,
        techs_load_success      :   false,
        techs_load_error        :   "",
        technologies_filter     :   [],

        page_size               :   0,
        // Si setta a true la variabile seguente, per pura precauzione
        first_action_running    :   true,
        first_action_error      :   false, 
        backup_img_path         :   "../public/img/backup_img.png",
        side_panel_visible      :   true,
        projects_per_row        :   8, 
        error_message           :   "",

        get_page_size()
        {
          this.first_action_running = true;
          this.first_action_error = false;
          axios.get(`${this.api_url_root}/api/pagination`)
            .then( response =>
              {
                this.first_action_error = !response.data.success;
                if (!this.first_action_error)
                  this.page_size = response.data.page_size;
                this.first_action_running = false;
              })
            .catch( error =>
              {
                this.first_action_error = true;
                this.first_action_running = false;
              });
        },

        get_categories(refresh = false)
        {
          this.categories_load_running = true;
          this.categories = [];
          axios.get(`${this.api_url_root}/api/categories`)
            .then( response =>
              {
                this.categories_load_success = response.data.success;
                if (this.categories_load_success)
                {
                  this.categories = response.data.categories;
                  this.categories_filter = this.categories.length + 1;
                  if (refresh)
                  {
                    this.axios_call_params = { page : 1 };
                    this.init_tech_filter();
                    this.init_projects_data;
                    this.get_projects();
                  }
                }
                else
                {
                  console.log("Errore direttamente dentro il .then con success false");
                }
                this.categories_load_running = false;
              })
            .catch( error =>
              {
                this.categories_load_success = false;
                if (error && 
                    error.response && 
                    error.response.data &&
                    typeof error.response.data.error_msg !== undefined)
                  this.categories_load_error = error.response.data.error_msg;
                this.categories_load_running = false;
              });
        },

        get_technologies(refresh = false)
        {
          this.techs_load_running = true;
          this.technologies = [];
          axios.get(`${this.api_url_root}/api/technologies`)
            .then( response =>
              {
                this.techs_load_success = response.data.success;
                if (this.techs_load_success)
                {
                  this.technologies = response.data.technologies;
                  this.init_tech_filter();
                  if (refresh)
                  {
                    this.axios_call_params = { page : 1 };
                    this.categories_filter = this.categories.length + 1;
                    this.init_projects_data();
                    this.get_projects();
                  }
                }
                else
                {
                  console.log("Errore direttamente dentro il .then con success false");
                }
                this.techs_load_running = false;
              })
            .catch( error =>
              {
                this.techs_load_success = false;
                if (error && 
                    error.response && 
                    error.response.data &&
                    typeof error.response.data.error_msg !== undefined)
                  this.techs_load_error = error.response.data.error_msg;
                this.techs_load_running = false;              
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
                this.projects_load_success = response.data.success;
                console.log("response.data: ",response.data);
                if (this.projects_load_success)
                {
                  this.projects = response.data.projects.data;
                  this.api_paging_info.api_current_page = response.data.projects.current_page;
                  this.api_paging_info.api_total_pages = response.data.projects.last_page;
                }
                else
                {
                  console.log("Errore direttamente dentro il .then con success false");
                }
                this.projects_load_running = false;
              })
            .catch( error =>
              {
                console.log("error occurred: ", error.response.data);
                this.projects_load_success = error.response.data.success;
                this.projects_load_error = error.response.data.error_msg;
                this.projects_load_running = false;
              });
        },

        get_single_project(slug)
        {
          this.projects_load_running = true;
          this.single_project = {};
          axios.get(`${this.api_url_root}/api/projects/${slug}`)
            .then( response =>
              {
                this.projects_load_success = response.data.success;
                if (this.projects_load_success)
                  this.single_project = response.data.project;
                else
                {
                  console.log("Errore direttamente dentro il .then con success false");
                }
                  this.projects_load_running = false;
              })
            .catch( error =>
              {
                this.projects_load_success = error.response.data.success;
                this.projects_load_error = error.response.data.error_msg;                
                this.projects_load_running = false;
              });
        },

        init_projects_data()
        {
          this.projects = [];
          this.single_project = {};
          this.api_paging_info.api_current_page = 0;
          this.api_paging_info.api_total_pages = 0;
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

        invoke_error_viewer(message, delay, quit_page = false)
        {
          let error_viewer = document.getElementById("error_viewer");
          this.error_message = message;
          error_viewer.classList.remove("d-none");
          setTimeout(() =>
          {
            error_viewer.classList.add("d-none");
            this.error_message = "";
            if (quit_page)
              window.close();
          }, delay);
        },

        quit_with_api_error()
        {
          this.invoke_error_viewer("Errore nella connessione al server. La pagina verrà abortita tra 5 secondi.", 5000, true);
        },
    })
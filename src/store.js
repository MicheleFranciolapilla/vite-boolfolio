// Importazione della funzione reactive
import { reactive } from "vue";
export const store = reactive(
    {
        session_start           :   true,
        projects                :   [],
        projects_updated        :   {
                                        running     :   false,
                                        success     :   false,
                                        date        :   "",
                                        time        :   "",
                                        error_msg   :   "" 
                                    },
        categories              :   [],
        categories_updated      :   {
                                        executed    :   false,
                                        success     :   false, 
                                        date        :   "", 
                                        time        :   "",
                                        error_msg   :   "" 
                                    },
        technologies            :   [], 
        technologies_updated    :   {
                                        executed    :   false,
                                        success     :   false,
                                        date        :   "", 
                                        time        :   "",
                                        error_msg   :   ""
                                    },
        current_page            :   '',
        api_url_root            :   'http://127.0.0.1:8000',
        api_paging_info         :   {
                                        api_projects_per_page   :   8,
                                        api_current_page        :   1,
                                        api_total_pages         :   0,
                                        api_total_projects      :   0
                                    },
        backup_img_path         :   "../public/img/backup_img.png",
        projects_per_row        :   4, 
        side_panel_visible      :   true,
        paging_events           :   {
                                        change_page :   false,
                                        page_to_go  :   0
                                    },
        // La variabile "categories_filter" contiene il valore di riferimento per la ricerca filtrata sulle categorie. Il valore "-2" indica "tutte" mentre "-1" consente una ricerca per "progetti senza categoria."
        categories_filter       :   -2,
        technologies_filter     :   [],

        about()
        {
            console.log("View non ancora implementata");
        },

        toggle_bool(bool_var_ref)
        {
            console.log("toggling");
            this[bool_var_ref] = !this[bool_var_ref];
        },

    })
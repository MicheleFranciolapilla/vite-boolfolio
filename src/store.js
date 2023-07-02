// Importazione della funzione reactive
import { reactive } from "vue";
export const store = reactive(
    {
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
        backup_img_path         :   "../public/img/backup_img.png",
        projects_per_row        :   5, 
        side_panel_visible      :   true,

        about()
        {
            console.log("Appena fatto!");
        },

        toggle_bool(bool_var_ref)
        {
            console.log("toggling");
            this[bool_var_ref] = !this[bool_var_ref];
        }
    })
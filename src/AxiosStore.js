import { reactive } from "vue";
import axios from 'axios';

export const store = reactive(
    {
        session_start           :   true,
        projects                :   [],
        categories              :   [],
        technologies            :   [], 
        current_page            :   '',
        api_url_root            :   'http://127.0.0.1:8000',
        axios_call_params       :   {
                                        page    :   1 
                                    },
        side_panel_visible      :   true,

        get_categories()
        {
            axios.get(`${this.api_url_root}/api/categories`)
                .then( response =>
                  {
                    this.categories = response.data.categories;
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

        toggle_bool(bool_var_ref)
        {
            this[bool_var_ref] = !this[bool_var_ref];
        },
    })
<script>
    import { store } from "../AxiosStore";
    export default
    {
        name    : "Comp_Header",
        data()
        {
            return  {
                        store,
                        current_item    :   null,
                        menu_items      :   [
                                                {
                                                    // Indice dell'item
                                                    item_id         :   0,
                                                    // Label dell'item
                                                    item_name       :   'Home',
                                                    // Tipologia di item
                                                    item_type       :   'route',
                                                    // Rotta di atterraggio
                                                    item_to         :   'home', 
                                                    // Array con tutte le pagine in cui l'item è presente
                                                    item_in_pages   :   [
                                                                            'projects_index',
                                                                            'projects_show'
                                                                        ]
                                                },
                                                {
                                                    item_id         :   1,
                                                    item_name       :   'About',
                                                    item_type       :   'js',
                                                    item_js_method()    {
                                                                            store.about();
                                                                        },
                                                    item_in_pages   :   [
                                                                            'home',
                                                                            'projects_index',
                                                                            'projects_show'
                                                                        ]
                                                },
                                                {
                                                    item_id         :   2,
                                                    item_name       :   'Progetti',
                                                    item_type       :   'dd',
                                                    item_dd_ref     :   'projects_dropdown',
                                                    item_in_pages   :   [
                                                                            'home',
                                                                            'projects_index',
                                                                            'projects_show'
                                                                        ],
                                                    item_children   :   [
                                                                            {
                                                                                item_id         :   201,
                                                                                item_name       :   'Carica tutti i progetti',
                                                                                item_type       :   'route',
                                                                                item_to         :   'projects_index',
                                                                                active_in_pages :   [
                                                                                                        'home',
                                                                                                        'projects_show'
                                                                                                    ]
                                                                            }
                                                                        ]
                                                },
                                                {
                                                    item_id         :   3,
                                                    item_name       :   'Opzioni',
                                                    item_type       :   'dd',
                                                    item_dd_ref     :   'options_dropdown',
                                                    item_in_pages   :   [
                                                                            'home',
                                                                            'projects_index',
                                                                            'projects_show'
                                                                        ],
                                                    item_children   :   [
                                                                            {
                                                                                item_id         :   301,
                                                                                bool_var_ref    :   'side_panel_visible',
                                                                                name_if_true    :   "Nascondi pannello filtri",
                                                                                name_if_false   :   "Mostra pannello filtri",
                                                                                item_type       :   'toggler',
                                                                                item_js_method()    {
                                                                                                        store.toggle_bool("side_panel_visible");
                                                                                                    },
                                                                                active_in_pages :   [
                                                                                                        'projects_index'
                                                                                                    ]
                                                                            }
                                                                        ]
                                                },
                                                {
                                                    item_id         :   10,
                                                    item_name       :   'Login / Registrazione',
                                                    item_type       :   'anchor',
                                                    item_to         :   store.api_url_root,
                                                    item_in_pages   :   [
                                                                            'home',
                                                                            'projects_index',
                                                                            'projects_show'
                                                                        ]
                                                }
                                            ],
                    }
        },
        computed:
        {
            set_list_item() 
            {
                return (bool_var_ref, name_if_true, name_if_false) =>
                    {
                        let var_ref = this.store[bool_var_ref];
                        return var_ref ? name_if_true : name_if_false;
                    };
            }
        },
        methods:
        {
            list_item_class_binder(item)
            {
                let li_classes = "nav-item";
                if (item.item_type == "dd")
                    li_classes += " dropdown";
                return li_classes;
            },

            link_class_binder(item)
            {
                let link_classes = "nav-link";
                if (item.item_type == "dd")
                    link_classes += " dropdown-toggle";
                return link_classes;
            },

            is_menu_item_in_page(item)
            {
                if (!item.item_in_pages.includes(this.store.current_page))
                 return false;
                this.current_item = item.item_type;
                return true;
            },

            search_text()
            {
                let check_str = this.store.search_string.trim();
                if (check_str.length < this.store.search_str_min_length)
                    this.store.invoke_error_viewer(`Il testo da cercare deve avere una lunghezza minima di ${this.store.search_str_min_length} caratteri!`, 3000);
                else
                {
                    let temp_params = { page : 1 };
                    temp_params.search_str = this.store.search_string;
                    this.store.axios_call_params = temp_params;
                    this.store.get_projects();
                }
            }
        } 
    }
</script>

<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <div id="nav_left" class="d-flex justify-content-center align-items-center column-gap-2 border border-1 border-dark ps-3">
                    <span>Powered by</span>
                    <a class="navbar-brand" href="#">
                        <img src="../assets//vue.svg" alt="Logo Vue">
                    </a>
                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapse_btn" aria-controls="collapse_btn" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="collapse_btn">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 ps-3">
                        <li 
                         v-for="(item) in menu_items" 
                         :key="item.item_id"
                         :class="list_item_class_binder(item)">
                            <div v-if="is_menu_item_in_page(item)">

                                <a 
                                 v-if="(current_item == 'js')" 
                                 v-on:click="item.item_js_method" 
                                 href="#"
                                 :class="link_class_binder(item)">
                                    {{ item.item_name }}
                                </a>

                                <a 
                                 v-else-if="(current_item == 'anchor')" 
                                 :href="item.item_to"
                                 :class="link_class_binder(item)">
                                    {{ item.item_name }}
                                </a>

                                <router-link 
                                 v-else-if="(current_item == 'route')"
                                 :to="{ name : item.item_to}"
                                 :class="link_class_binder(item)">
                                    {{ item.item_name }}
                                </router-link>

                                <div v-else-if="(current_item == 'dd')">
                                    <a 
                                     href="#" 
                                     :class="link_class_binder(item)" 
                                     :id="item.item_dd_ref" 
                                     role="button" 
                                     data-bs-toggle="dropdown" 
                                     aria-expanded="false">
                                        {{ item.item_name }}
                                    </a>
                                    <ul class="dropdown-menu" :aria-labelledby="item.item_dd_ref">
                                        <li 
                                         v-for="sub_item in item.item_children"
                                         :key="sub_item.item_id">

                                            <router-link 
                                             v-if="sub_item.item_type == 'route'" 
                                             :to="{ name : sub_item.item_to }" 
                                             class="dropdown-item"
                                             :class="(!sub_item.active_in_pages.includes(store.current_page)) ? ('disabled') : ('')">
                                                {{ sub_item.item_name }}
                                            </router-link>

                                            <a 
                                             v-else-if="sub_item.item_type == 'toggler'" 
                                             v-on:click="sub_item.item_js_method" 
                                             :id="`toggler${sub_item.item_id}`"
                                             href="#"
                                             class="dropdown-item"
                                             :class="(!sub_item.active_in_pages.includes(store.current_page)) ? ('disabled') : ('')">
                                                {{ set_list_item(sub_item.bool_var_ref, sub_item.name_if_true, sub_item.name_if_false) }}
                                            </a>

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <form v-if="store.current_page == 'projects_index'" class="d-flex" v-on:submit.prevent="search_text()">
                        <input class="form-control me-2" v-model="store.search_string" type="search" placeholder="Cerca testo ..." aria-label="Search" required :minlength="store.search_str_min_length">
                        <button class="btn btn-outline-success" type="submit">Cerca</button>
                    </form>
                </div>
            </div>
        </nav>
    </header>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "../assets/style/main.scss" as *;

    header
    {
        height: $header_height;
        li
        {
            &.nav-item
            {
                padding-left: 1.5rem;
            }
            .nav-link
            {
                color: black !important;
                &:hover
                {
                    color: blue !important;
                }
            }
        }
    }
</style>
<script>
    import { store } from "../AxiosStore";
    export default
    {
        name        : "Comp_Header",
        data()
        {
            return  {
                        store,
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
                                                    item_js_method  :   ()  =>   
                                                                        {
                                                                            this.about();
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
                                                                            },
                                                                            {
                                                                                item_id         :   302,
                                                                                bool_var_ref    :   'search_only_title',
                                                                                name_if_true    :   "Cerca testo in titolo e descrizione",
                                                                                name_if_false   :   "Cerca testo solo nel titolo",
                                                                                item_type       :   'toggler',
                                                                                item_js_method()    {
                                                                                                        store.toggle_bool("search_only_title");
                                                                                                    },
                                                                                active_in_pages :   [
                                                                                                        'projects_index'
                                                                                                    ]
                                                                            },
                                                                            {
                                                                                item_id         :   303,
                                                                                item_name       :   'Refresh Categorie',
                                                                                item_type       :   'js',
                                                                                item_js_method()    {
                                                                                                        store.get_categories(true);
                                                                                                    },
                                                                                active_in_pages :   [
                                                                                                        'projects_index'
                                                                                                    ]
                                                                            },
                                                                            {
                                                                                item_id         :   304,
                                                                                item_name       :   'Refresh Tecnologie',
                                                                                item_type       :   'js',
                                                                                item_js_method()    {
                                                                                                        store.get_technologies(true);
                                                                                                    },
                                                                                active_in_pages :   [
                                                                                                        'projects_index'
                                                                                                    ]
                                                                            },
                                                                        ]
                                                },
                                                {
                                                    item_id         :   4,
                                                    item_name       :   'Layout',
                                                    item_type       :   'dd',
                                                    item_dd_ref     :   'layout_dropdown',
                                                    item_in_pages   :   [
                                                                            'home',
                                                                            'projects_index',
                                                                            'projects_show'
                                                                        ],
                                                    item_children   :   [
                                                                            {
                                                                                item_id         :   401,
                                                                                item_type       :   'direct_input',
                                                                                item_special    :   false,
                                                                                direct_label    :   "Progetti per riga...",
                                                                                direct_id       :   "ProjectsXRow",
                                                                                direct_min      :   1,
                                                                                direct_max      :   store.page_size,
                                                                                direct_step     :   1,
                                                                                direct_data     :   'projects_per_row',
                                                                                active_in_pages :   [
                                                                                                        'projects_index'
                                                                                                    ]
                                                                            },
                                                                            {
                                                                                item_id         :   402,
                                                                                item_type       :   'direct_input',
                                                                                item_special    :   true, 
                                                                                item_js_method()    {
                                                                                                        store.set_new_page_size()
                                                                                                    },
                                                                                message_on_btn  :   "Al click verranno ricaricati tutti i progetti, non filtrati e con il nuovo valore di impaginazione.", 
                                                                                direct_label    :   "Progetti per pagina...",
                                                                                direct_id       :   "ProjectsXPage",
                                                                                direct_min      :   1,
                                                                                direct_max      :   10,
                                                                                direct_step     :   1,
                                                                                direct_data     :   'new_page_size',
                                                                                ref_data        :   'page_size', 
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
            about()
            {

            },

            search_text()
            {
                let check_str = this.store.search_string.trim();
                if (check_str.length < this.store.search_str_min_length)
                    this.store.invoke_error_viewer(`Il testo da cercare deve avere una lunghezza minima di ${this.store.search_str_min_length} caratteri!`, 3000);
                else
                {
                    let temp_params = { page : 1 };
                    temp_params.search_str = this.store.search_string.toLowerCase();
                    let just_title = "NO";
                    if (this.store.search_only_title)
                        just_title = "YES";
                    temp_params.only_title = just_title;
                    this.store.axios_call_params = temp_params;
                    this.store.get_projects();
                }
            },

            manage_direct_input(direct_data, direct_id, special)
            {
                let direct_input = document.getElementById(direct_id);
                this.store[direct_data] = direct_input.value;
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
                         class="nav-item"
                         :class="(item.item_type == 'dd') ? 'dropdown' : '' ">
                            <div v-if="item.item_in_pages.includes(store.current_page)">

                                <a 
                                 v-if="(item.item_type == 'js')" 
                                 v-on:click="item.item_js_method" 
                                 href="#"
                                 class="nav-link">
                                    {{ item.item_name }}
                                </a>

                                <a 
                                 v-else-if="(item.item_type == 'anchor')" 
                                 :href="item.item_to"
                                 class="nav-link">
                                    {{ item.item_name }}
                                </a>

                                <router-link 
                                 v-else-if="(item.item_type == 'route')"
                                 :to="{ name : item.item_to}"
                                 class="nav-link">
                                    {{ item.item_name }}
                                </router-link>

                                <div v-else-if="(item.item_type == 'dd')">
                                    <a 
                                     href="#" 
                                     class="nav-link dropdown-toggle" 
                                     :id="item.item_dd_ref" 
                                     role="button" 
                                     data-bs-toggle="dropdown" 
                                     aria-expanded="false">
                                        {{ item.item_name }}
                                    </a>
                                    <ul class="dropdown-menu" :aria-labelledby="item.item_dd_ref">
                                        <li 
                                         v-for="sub_item in item.item_children"
                                         :key="sub_item.item_id"
                                         :class="{  'disabled_with_info': ((store.current_page == 'projects_index') && (sub_item.item_id == 201)),
                                                    'refresh_with_info' : ((store.current_page == 'projects_index') && ((sub_item.item_id == 303) || (sub_item.item_id == 304))) }">

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

                                            <a 
                                             v-else-if="(sub_item.item_type == 'js')" 
                                             v-on:click="sub_item.item_js_method" 
                                             href="#"
                                             class="dropdown-item"
                                             :class="(!sub_item.active_in_pages.includes(store.current_page)) ? ('disabled') : ('')">
                                                {{ sub_item.item_name }}
                                            </a>

                                            <div 
                                             v-else-if="(sub_item.item_type == 'direct_input')"
                                             class="d-flex justify-content-between column-gap-2 direct_input_div">
                                                <span 
                                                 class="dropdown-item"
                                                 :class="(!sub_item.active_in_pages.includes(store.current_page)) ? ('disabled') : ('')">
                                                    {{ sub_item.direct_label }}
                                                </span>
                                                    
                                                <input 
                                                 type="number" 
                                                 class="dropdown-item d-inline-block p-0 me-2" 
                                                 style="width: 50px;"
                                                 :id="sub_item.direct_id"
                                                 :class="(!sub_item.active_in_pages.includes(store.current_page)) ? ('disabled') : ('')"
                                                 :min="sub_item.direct_min"
                                                 :max="sub_item.direct_max"
                                                 :step="sub_item.direct_step"
                                                 :value="store[sub_item.direct_data]"
                                                 v-on:keydown.prevent=""
                                                 v-on:change="manage_direct_input(sub_item.direct_data, sub_item.direct_id, sub_item.special)">
                                            </div>

                                            <div class="info_for_disabled_201 text-warning bg-dark border border-2 border-info rounded-2 px-3 py-2">
                                                <h5>
                                                    L'opzione è disabilitata all'interno di questa pagina.
                                                </h5>
                                                <h6 class="text-info mt-3">
                                                    E' possibile ricaricare tutti i progetti mediante opportuno settaggio dei filtri nel pannello laterale, oppure tornando alla Home Page.
                                                </h6> 
                                            </div>

                                            <div class="info_for_refresh text-warning bg-dark border border-2 border-info rounded-2 px-3 py-2">
                                                <h5>
                                                    Selezionare questa opzione se si ritiene che i dati relativi alle {{ (sub_item.item_id == 303) ? 'categorie' : 'tecnologie' }} nel database possano essere stati modificati.
                                                </h5>
                                                <hr>
                                                <h6 class="text-info mt-3">
                                                    Il refresh aggiornerà i dati relativi alle {{ (sub_item.item_id == 303) ? 'categorie' : 'tecnologie' }} e ricaricherà tutti i progetti, impaginati e non filtrati.
                                                </h6> 
                                            </div>

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <form v-if="store.current_page == 'projects_index'" class="d-flex position-relative" v-on:submit.prevent="search_text()">
                        <h5 id="search_string_info" class="text-warning bg-dark border border-2 border-info rounded-2 px-3 py-2">
                            {{ (store.search_only_title) ? "Ricerca abilitata per il solo titolo" : "Ricerca abilitata per titolo e descrizione" }}
                            <h6 class="text-info mt-3">Switch disponibile in menu/Opzioni</h6>
                        </h5>
                        <input id="search_string" class="form-control me-2" v-model="store.search_string" type="search" placeholder="Cerca testo ..." aria-label="Search" required :minlength="store.search_str_min_length">
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
            .info_for_disabled_201, .info_for_refresh
            {
                position: absolute;
                top: 110%;
                left: -25%;
                width: 200%;
                display: none;
                z-index: 1010;
            }
            &.disabled_with_info
            {
                position: relative;
                &:hover
                {
                    .info_for_disabled_201
                    {
                        display: block;
                    }
                }
            }
            &.refresh_with_info
            {
                position: relative;
                &:hover
                {
                    .info_for_refresh
                    {
                        display: block;
                    }
                }
            }
            .direct_input_div *
            {
                &:active
                {
                    background-color: transparent !important;
                    color: black;
                }
            }
        }
        form
        {
            #search_string_info
            {
                position: absolute;
                top: 125%;
                left: -25px;
                display: none;
            }
            &:hover
            {
                #search_string_info
                {
                    display: block;
                }
            }
        } 

    }
</style>
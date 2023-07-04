<script>
    import { store } from "../AxiosStore";
    export default
    {
        name    : "Comp_SidePanel",
        data()
        {
            return  {
                        store
                    }
        },
        methods:
        {
            get_filtered_projects()
            {
                // Logica di individuazione della categoria richiesta
                let filtering_radios = document.getElementsByName('category_filter');
                let checked_i = -1;
                for (let i = 0; i < filtering_radios.length; i++)
                {
                    if (filtering_radios[i].checked)
                    {
                        checked_i = i;
                        break;
                    }
                }

                // Formattazione del parametro standard per la API, ovvero pagina 1 senza ulteriori parametri
                let temp_params = { page : 1 };
                // Assegnazione del valore opportuno alla variabile di filtraggio della categoria
                this.store.categories_filter = filtering_radios.length - 1;

                // Logica di assegnazione del parametro API relativo alla categoria richiesta:
                // Se checked_i vale 0 si richiedono tutte le categorie, quindi basta il parametro standard per la API
                if (checked_i != 0)
                {
                    // Se, invece checked_i è massimo, significa che si è selezionata l'ultima radio button, ovvero categoria assente (null nel DB), dunque si imposta il parametro per la API con stringa vuota che identifica, appunto, il valore null nel database
                    if (checked_i == filtering_radios.length - 1)
                    {
                        temp_params.category_id = "";
                        this.store.categories_filter = 0;
                    }
                    else
                    {
                        // Se invece si è selezionata una categoria specifica, il parametro per la API non sarà check_id (valido, comunque nel caso in cui nel database, gli id delle categorie siano in ordine crescente, a partire da 1), bensì il valore specifico della id, presente nell'array categories che coincide, in tutti i casi, con il valore riscontrato nel database
                        let array_index = checked_i - 1;
                        temp_params.category_id = this.store.categories[array_index].id;
                        this.store.categories_filter = checked_i;
                    }
                }

                // Logica di assegnazione del parametro API relativo alle tecnologie richieste:
                
                // Impostazione del parametro finale per la API e chiamata alla stessa
                this.store.axios_call_params = temp_params;
                this.store.get_projects();
            },

            switch_tech(index)
            {
                this.store.technologies_filter[index] = !this.store.technologies_filter[index];
            },

            get_fa_classes(icon_str)
            {
                let quote_pos = icon_str.indexOf('"');
                let temp_str = icon_str.substring(quote_pos + 1);
                quote_pos = temp_str.indexOf('"');
                return temp_str.substring(0,quote_pos);
            }
        }
    }
</script>

<template>
    <div id="side_panel" class="d-flex flex-column align-items-center row-gap-2 text-center">
        <h5 class="mb-2">Filtri</h5>
        <div id="filters_block" class="d-flex justify-content-between align-items-start px-1">
            <div id="categories_panel" class="ps-1">
                <h6 class="text-start">Categoria:</h6>
                <ul v-if="store.categories.length != 0" id="categories_list" class="d-flex flex-column align-items-start row-gap-2 px-2 py-1">
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="category_filter" id="category_all"
                             :checked="store.categories_filter == store.categories.length + 1">
                            <label class="form-check-label" for="category_all">
                                Tutte
                            </label>
                        </div>
                    </li>
                    <li 
                     v-for="(item, index) in store.categories"
                     :key="'category_' + index + 1">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="category_filter" 
                             :id="`category_${ index + 1}`"
                             :checked="(index + 1) == store.categories_filter">
                            <label class="form-check-label" :for="`category_${ index }`">
                                {{ item.name }}
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="category_filter" id="category_0"
                             :checked="store.categories_filter == 0">
                            <label class="form-check-label" for="category_0">
                                Assente
                            </label>
                        </div>
                    </li>
                </ul>
                <div v-else>
                    <span class="text-warning bg-danger p-2">Data error</span>
                </div>
            </div>
            <div id="technologies_panel" class="pe-1">
                <h6 class="text-start">Tecnologie:</h6>
                <ul v-if="store.technologies.length != 0" id="technologies_list" class="d-flex flex-column align-items-start row-gap-2 px-2 py-1">
                    <li 
                     v-for="(item, index) in store.technologies"
                     :key="'technology_' + index + 1">
                        <div class="form-check">
                            <input class="form-check-input me-3" type="checkbox" 
                             :id="`technology_${ index + 1 }`"
                             :checked="store.technologies_filter[index]"
                             v-on:change="switch_tech(index)">
                            <label class="form-check-label" :for="`technology_${ index + 1 }`">
                                <i :class="get_fa_classes(item.icon)"></i>
                                <span class="name_on_hover text-info bg-dark px-3">{{ item.name }}</span>
                            </label>
                        </div>
                    </li>
                </ul>
                <div v-else>
                    <span class="text-warning bg-danger p-2">Data error</span>
                </div>
            </div>
        </div>
        <button id="btn_with_filters" class="btn btn-primary" type="button" v-on:click="get_filtered_projects()">Applica filtri</button>
    </div>
</template>

<style scoped lang="scss">
    #side_panel
    {
        width: 100%;
        #filters_block
        {
            width: 100%;
            #categories_panel
            {
                h6
                {
                    color: green;
                }
                #categories_list
                {
                    border: 2px solid green;
                }
            }
            #technologies_panel
            {
                order: -1;
                h6
                {
                    color: orange;
                } 
                #technologies_list
                {
                    border: 2px solid orange;
                    .form-check
                    {
                        .form-check-label
                        {
                            position: relative;
                            .name_on_hover
                            {
                                position: absolute;
                                left: 0;
                                display: none;
                                border: 2px solid yellowgreen;
                                border-radius: 2px;
                                z-index: 1000;
                            }
                            &:hover
                            {
                                cursor: pointer;
                                .name_on_hover
                                {
                                    display: inline-block;
                                }
                            }
                        }
                    } 
                }
            }
        }
    }
</style>
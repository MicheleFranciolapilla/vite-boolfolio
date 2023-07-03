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
        <div id="filters_block" class="d-flex justify-content-between align-items-start">
            <div id="categories_panel" class="ps-1">
                <h6 class="text-start">Categoria:</h6>
                <ul v-if="store.categories.length != 0" id="categories_list" class="d-flex flex-column align-items-start row-gap-2 px-2 py-1">
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="category_filter" id="category-2"
                             :checked="store.categories_filter == -2">
                            <label class="form-check-label" for="category-2">
                                Tutte
                            </label>
                        </div>
                    </li>
                    <li 
                     v-for="(item, index) in store.categories"
                     :key="'category__' + index">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="category_filter" 
                             :id="`category${ index }`"
                             :checked="index == store.categories_filter">
                            <label class="form-check-label" :for="`category${ index }`">
                                {{ item.name }}
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="category_filter" id="category-1"
                             :checked="store.categories_filter == -1">
                            <label class="form-check-label" for="category-1">
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
                     :key="'technology__' + index">
                        <div class="form-check">
                            <input class="form-check-input me-3" type="checkbox" value="" 
                             :id="`technology_${ item.name }`"
                             :checked="store.technologies_filter[index]"
                             v-on:change="store.technologies_filter[index] = !store.technologies_filter[index]">
                            <label class="form-check-label position-relative" :for="`technology_${ item.name }`">
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
        <button id="btn_with_filters" class="btn btn-primary" type="button">Applica filtri</button>
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
                h6
                {
                    color: orange;
                } 
                #technologies_list
                {
                    border: 2px solid orange;
                    .form-check-label
                    {
                        .name_on_hover
                        {
                            position: absolute;
                            left: 125%;
                            display: none;
                            border: 2px solid yellowgreen;
                            border-radius: 2px;
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
</style>
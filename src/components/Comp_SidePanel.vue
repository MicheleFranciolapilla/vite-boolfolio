<script>
    import { store } from "../store";
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
                <ul id="categories_list" class="d-flex flex-column align-items-start row-gap-2 px-2 py-1">
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="category_filter" id="category_all"
                             :checked="store.categories_filter == -2">
                            <label class="form-check-label" for="category_all">
                                Tutte
                            </label>
                        </div>
                    </li>
                    <li 
                     v-for="(item, index) in store.categories"
                     :key="'category__' + index">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="category_filter" 
                             :id="`category_${ item.name }`"
                             :checked="index == store.categories_filter">
                            <label class="form-check-label" :for="`category_${ item.name }`">
                                {{ item.name }}
                            </label>
                        </div>
                    </li>
                    <li>
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="category_filter" id="category_null"
                             :checked="store.categories_filter == -1">
                            <label class="form-check-label" for="category_null">
                                Assente
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
            <div id="technologies_panel" class="pe-1">
                <h6 class="text-start">Tecnologie:</h6>
                <ul id="technologies_list" class="d-flex flex-column align-items-start row-gap-2 px-2 py-1">
                    <li 
                     v-for="(item, index) in store.technologies"
                     :key="'technology__' + index">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" :id="`technology_${ item.name }`">
                            <label class="form-check-label" :for="`technology_${ item.name }`">
                                <i :class="get_fa_classes(item.icon)"></i>
                            </label>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
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
                    color: red;
                } 
                #technologies_list
                {
                    border: 2px solid red;
                }
            }
        }
    }
</style>
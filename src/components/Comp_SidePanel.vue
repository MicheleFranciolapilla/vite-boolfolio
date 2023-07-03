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
        } 
    }
</script>

<template>
    <div id="side_panel" class="d-flex text-center align-items-center flex-column row-gap-2">
        <h5 class="mb-2">Filtri</h5>
        <h6>Categoria:</h6>
        <ul id="categories_panel" class="d-flex flex-column align-items-start row-gap-2 border border-1 border-white-50 p-1">
            <li class="filter_item">
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
            <li class="filter_item">
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
</template>

<style scoped lang="scss">
    #side_panel
    {
        width: 100%;
        #categories_panel
        {
            width: 95%;
            .filter_item
            {
                padding-left: 0;
            }
        }
    }
</style>
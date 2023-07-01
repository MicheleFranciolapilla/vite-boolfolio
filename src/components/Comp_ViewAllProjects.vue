<script>
    import Comp_ViewOneProject from "./Comp_ViewOneProject.vue";
    export default
    {
        name        : "Comp_ViewAllProjects",
        props       : ['collection', 'items_per_row'],
        components  :
        {
            Comp_ViewOneProject
        },
        data()
        {
            return  {
                        collection_gap : null
                    }
        },
        methods:
        {
            calc_flex_gap()
            {
                this.collection_gap = `calc(4rem / ${this.items_per_row})`;
                return this.collection_gap;
            },

            calc_card_width()
            {
                return `calc((100% - (${this.collection_gap} * (${this.items_per_row} - 1))) / ${this.items_per_row})`;
            }
        }
    }
</script>

<template>
    <div id="projects_collection" class="d-flex flex-wrap" :style="{ gap: calc_flex_gap() }">
        <div 
         v-for="(collection_item, index) in collection" 
         :key="index" 
         :style="{ width: calc_card_width() }">
            <Comp_ViewOneProject 
             :project = "collection_item" />
        </div>
    </div>
</template>

<style scoped lang="scss">
    #projects_collection
    {
        width: calc(100%);
    }
</style>
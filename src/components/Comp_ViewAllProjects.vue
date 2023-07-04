<script>
    import Comp_ViewOneProject from "./Comp_ViewOneProject.vue";
    export default
    {
        name        : "Comp_ViewAllProjects",
        props       : ['collection', 'items_per_row', 'backup_img', 'api_url_root'],
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
        created()
        {
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
            },

            rebound_click(slug_to_rebound)
            {
                this.$emit("rebounded_emit",slug_to_rebound);
            }
        }
    }
</script>

<template>
    <div id="projects_collection" class="d-flex flex-wrap" :style="{ gap: calc_flex_gap() }">
        <div 
         v-for="(collection_item, index) in collection" 
         :key="'project' + index" 
         :style="{ width: calc_card_width() }">
            <Comp_ViewOneProject 
             :project = "collection_item"
             :backup_img = "backup_img"
             :just_img = "(items_per_row > 6)"
             :api_url_root = "api_url_root"
             @click_on_project = "rebound_click" />
        </div>
    </div>
</template>

<style scoped lang="scss">
    #projects_collection
    {
        width: calc(100%);
    }
</style>
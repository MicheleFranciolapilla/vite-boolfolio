<script>
    export default
    {
        name    : "Comp_ViewOneProject",
        props   : ['project', 'backup_img', 'api_url_root', 'just_img'],
        data()
        {
            return  {
                        is_there_img    : false
                    }
        },
        methods:
        {
            set_image_path()
            {
                let img_path;
                if (this.project.cover_img)
                {
                    img_path = `${ this.api_url_root }/storage/${ this.project.cover_img }`;
                    this.is_there_img = true;
                }
                else
                    img_path = this.backup_img;
                return img_path;
            }
        }
    }
</script>

<template>
    <div class="card p-1">
        <img 
         :src="set_image_path()" 
         :alt="(is_there_img) ? 'Immagine propria del progetto' : 'Immagine di backup'" 
         class="card-img-top">
        <div v-if="!just_img" class="card-body p-0 m-0">
            <h4 class="card-title">{{ project.title }}</h4>
            <h5 class="title_on_hover text-white bg-info p-2 border border-2 border-dark rounded-3">
                Titolo del progetto: <h4 class="text-dark my-2">"{{ project.title }}"</h4>
            </h5>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .card
    {
        width: calc(100%);
        border: 3px solid black;
        border-radius: 0;
        cursor: pointer;
        img
        {
            border-radius: 0;
            width: 100%;
            aspect-ratio: 1;
            object-fit: cover;
            object-position: center;
        }
        .card-body
        {
            width: calc(100%);
            position: relative;
            .card-title
            {
                width: calc(100%);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .title_on_hover
            {
                position: absolute;
                top: 0;
                left: 0;
                display: none;
            }
            &:hover
            {
                .title_on_hover
                {
                    z-index: 998;
                    display: block;
                }
            }
        }
    }
</style>
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
            },

            show_full_title(from_card = false)
            {
                if (from_card === this.just_img)
                {
                    let full_title_viewer = document.getElementById("full_length_title");
                    full_title_viewer.classList.remove("d-none");
                    full_title_viewer.innerHTML = `Titolo completo: &nbsp &nbsp &nbsp<span class="text-white-50">${this.project.title}</span>`;
                }
            },

            hide_full_title(from_card = false)
            {
                let full_title_viewer = document.getElementById("full_length_title");
                full_title_viewer.classList.add("d-none");
            }
        }
    }
</script>

<template>
    <div class="card p-1" @mousemove="show_full_title(true)" @mouseleave="hide_full_title(true)">
        <img 
         :src="set_image_path()" 
         :alt="(is_there_img) ? 'Immagine propria del progetto' : 'Immagine di backup'" 
         class="card-img-top">
        <div v-if="!just_img" class="card-body p-0 m-0">
            <h4 class="card-title" @mousemove="show_full_title()" @mouseleave="hide_full_title()">{{ project.title }}</h4>
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
        }
    }
</style>
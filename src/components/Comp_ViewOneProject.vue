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

            get_category_str()
            {
                if (this.project.category_id)
                    return this.project.category.name;
                else    
                    return "Nessuna";
            },

            get_technologies_str()
            {
                let final_str = "Nessuna  ";
                if (this.project.technologies.length != 0)
                {
                    final_str = "";
                    for (let i = 0; i < this.project.technologies.length; i++)
                    {
                        final_str += this.project.technologies[i].icon;
                        if (i == this.project.technologies.length - 1)
                            final_str += "  ";
                        else
                            final_str += "  -  ";
                    }
                }
                return final_str;
            },

            show_data()
            {
                let full_title_viewer = document.getElementById("full_length_title");
                full_title_viewer.classList.remove("d-none");
                full_title_viewer.innerHTML = 
                    `Titolo completo:
                    <span class="text-white-50">
                        &nbsp&nbsp${this.project.title}
                    </span>
                    <span class="text-white">
                        &nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp
                    </span>
                    Categoria:
                    <span class="text-white-50">
                        &nbsp&nbsp${this.get_category_str()}&nbsp&nbsp&nbsp
                    </span>
                    <span class="text-white">
                        &nbsp&nbsp&nbsp|&nbsp&nbsp&nbsp
                    </span>
                    Tecnologie:
                    <span class="text-white-50">
                        &nbsp&nbsp${this.get_technologies_str()}
                    </span>`;
            },

            hide_data()
            {
                let full_title_viewer = document.getElementById("full_length_title");
                full_title_viewer.classList.add("d-none");
            }
        }
    }
</script>

<template>
    <div class="card p-1" @mousemove="show_data()" @mouseleave="hide_data()">
        <img 
         :src="set_image_path()" 
         :alt="(is_there_img) ? 'Immagine propria del progetto' : 'Immagine di backup'" 
         class="card-img-top">
        <div v-if="!just_img" class="card-body p-0 m-0">
            <h4 class="card-title">{{ project.title }}</h4>
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
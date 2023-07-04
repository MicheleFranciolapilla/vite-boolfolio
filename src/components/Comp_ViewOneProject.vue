<script>
    export default
    {
        name    : "Comp_ViewOneProject",
        props   : ['is_single', 'project', 'backup_img', 'just_img', 'api_url_root'],
        data()
        {
            return  {
                        is_there_img    : false,
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
                if (this.project.category)
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
            },

            create_emit()
            {
                console.log("generazione emit: ", this.project.slug)
                this.$emit("click_on_project", this.project.slug);
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
    <div 
     v-if="!is_single" 
     class="card p-1" 
     @mouseover="show_data()" 
     @mouseleave="hide_data()" 
     @click="create_emit()">
        <img 
         :src="set_image_path()" 
         :alt="(is_there_img) ? 'Immagine propria del progetto' : 'Immagine di backup'" 
         class="card-img-top">
        <div v-if="!just_img" class="card-body p-0 m-0">
            <h4 class="card-title">{{ project.title }}</h4>
        </div>
    </div>
    <div v-else id="single_project_view">
        <div id="title_box" class="p-3 border border-3 border-info rounded-3 text-primary bg-dark">
            <h2>Progetto: {{ project.title }}</h2>
        </div>
        <div id="middle_box">
            <div id="category_techs">
                <div id="category_box" class="p-2 border border-2 border-light rounded-3 text-white bg-dark">
                    <h6 class="text-white-50 mb-2">Categoria:</h6>
                    <h4>{{ get_category_str() }}</h4>
                </div>
                <div id="techs_box" class="p-2 border border-2 border-light rounded-3 text-white bg-dark mt-3">
                    <h6 class="text-white-50 mb-2">Tecnologie:</h6>
                    <ul v-if="project.technologies.length != 0" class="ps-0">
                        <li 
                         v-for="(tech, index) in project.technologies"
                         :key="'tech' + index">
                         <div class="d-flex justify-content-between">
                            <h4>{{ tech.name }}</h4>
                            <h4 class="text-primary ms-3"><i :class="get_fa_classes(tech.icon)"></i></h4>
                         </div>
                        </li>
                    </ul>
                    <h4 v-else>Nessuna </h4>
                </div>
            </div>
            <div id="img_box" class="p-2 border border-3 border-info rounded-3">
                <img 
                :src="set_image_path()" 
                :alt="(is_there_img) ? 'Immagine propria del progetto' : 'Immagine di backup'">
            </div>
        </div>
        <div id="bottom_box">
            <div id="host_box" class="p-2 border border-2 border-light rounded-3 text-white bg-dark">
                <h6 class="text-white-50 mb-2">HOST URL: </h6>
                <div id="host_text">
                    <h4>{{ (project.host_url) ? project.host_url : 'Nessun indirizzo host presente' }}</h4>
                </div>
            </div>
            <div id="description_box" class="p-2 border border-2 border-light rounded-3 text-white bg-dark">
                <h6 class="text-white-50 mb-2">Descrizione: </h6>
                <div id="description_text">
                    <h4>{{ project.description }}</h4>
                </div>
            </div>
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

    #single_project_view
    {
        width: calc(100%);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        row-gap: 1rem;
        #middle_box
        {
            width: calc(100%);
            display: flex;
            justify-content: space-between;
            column-gap: 1rem;
            #category_techs
            {
                align-self: flex-start;
            }
            #img_box
            {
                order: -1;
                flex-grow: 1;
                img
                {
                    width: calc(100%);
                    object-fit: cover;
                } 
            }
        }
        #bottom_box
        {
            width: 100%;
            #host_box
            {
                width: 100%;
                #host_text
                {
                    width: 100%;
                    max-height: 2rem;
                    overflow-y: auto;
                    color: yellowgreen;
                }
            }
            width: 100%;
            #description_box
            {
                width: 100%;
                #description_text
                {
                    width: 100%;
                    max-height: 5rem;
                    overflow-y: auto;
                    color: yellowgreen;
                }
            }
        }
    }
</style>
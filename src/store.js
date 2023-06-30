// Importazione della funzione reactive
import { reactive } from "vue";
export const store = reactive(
    {
        projects            : [],
        current_page        : '',
        api_url_root        : 'http://127.0.0.1:8000',
        backup_img_path     : "../public/img/backup_img.png",
        projects_per_row    : 3, 

        about()
        {
            document.getElementById("main").innerHTML="CLICCATO";
        },
    })
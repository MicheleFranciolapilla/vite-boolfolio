// Importazione della funzione reactive
import { reactive } from "vue";
export const store = reactive(
    {
        projects        : [],
        api_url         : 'http://127.0.0.1:8000',
        backup_img_path : "../public/img/backup_img.png"
    })
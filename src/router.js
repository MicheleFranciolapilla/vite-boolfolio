import { createRouter, createWebHistory } from "vue-router";
import CompPage_Home from "./pages/CompPage_Home.vue";
import CompPage_Projects from "./pages/CompPage_Project.vue";

const router = createRouter(
    {
        history :   createWebHistory(),
        routes  :   [
                        {
                            path        :   '/',
                            name        :   'home',
                            component   :   CompPage_Home 
                        },
                        {
                            path        :   '/projects',
                            name        :   'projects',
                            component   :   CompPage_Projects  
                        }
                    ] 
    });
    export { router };
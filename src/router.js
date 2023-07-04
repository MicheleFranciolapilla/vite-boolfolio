import { createRouter, createWebHistory } from "vue-router";
import CompPage_Home from "./pages/CompPage_Home.vue";
import CompPage_Projects_Index from "./pages/CompPage_Projects_Index.vue";
import CompPage_Projects_Show from "./pages/CompPage_Projects_Show.vue";

const router = createRouter(
    {
        history :   createWebHistory(),
        routes  :   [
                        {
                            path        :   '/',
                            name        :   'home',
                            component   :   CompPage_Home,
                            meta        :   {
                                                title : 'My Projects | Home Page'
                                            } 
                        },
                        {
                            path        :   '/projects',
                            name        :   'projects_index',
                            component   :   CompPage_Projects_Index,
                            meta        :   {
                                                title : 'My Projects | All Projects'
                                            }   
                        },
                        {
                            path        :   '/projects/:slug',
                            name        :   'projects_show',
                            component   :   CompPage_Projects_Show,
                            meta        :   {
                                                page_title  : 'My Projects | Project'
                                            },
                            beforeEnter :   (to, from, next) =>
                                            {
                                                document.title  = to.meta.page_title + ' : ' + to.params.slug;
                                                next();
                                            }
                        }
                    ] 
    });
    export { router };
import { createApp } from 'vue';
import { router } from './router';
import App from './App.vue';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";

router.beforeEach((to, from, next) => 
    {
        if (to.meta.title) 
        {
            document.title = to.meta.title;
        }
        next();
    });

createApp(App).use(router).mount('#app');

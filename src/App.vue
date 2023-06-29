<script>
// Importazione dello store (state management)
  import { store } from "./store"
  import axios from "axios";
  import Comp_Header from "./components/Comp_Header.vue";
  import Comp_Projects from "./components/Comp_Projects.vue";
  export default{
    name        : "App",
    components  : 
    {
      Comp_Header,
      Comp_Projects
    },
    data()
    {
      return {
                projects        : [],
                api_url         : 'http://127.0.0.1:8000',
                backup_img_path : "../public/img/backup_img.png"
      }
    },
    created()
    {},
    mounted()
    {
      this.axios_call();
    },
    methods:
    {
      axios_call()
      {
        axios.get(`${this.api_url}/api/projects`).then( response =>
        {
          this.projects = response.data.projects;
          console.log(this.projects);
        });
      }
    }
  }
</script>

<template>
  <div id="front_end">
    <Comp_Header/>
    <main>
      <Comp_Projects 
        :backup_img = "backup_img_path" 
        :projects_collection = "projects"
      />
    </main>
  </div>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "./assets/style/main.scss" as *;

</style>

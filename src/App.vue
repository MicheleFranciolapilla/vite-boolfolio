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
                store
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
        axios.get(`${this.store.api_url}/api/projects`).then( response =>
        {
          this.store.projects = response.data.projects;
          console.log(this.store.projects);
        });
      }
    }
  }
</script>

<template>
  <div id="front_end">
    <Comp_Header/>
    <main>
      <Comp_Projects/>
    </main>
  </div>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "./assets/style/main.scss" as *;

</style>

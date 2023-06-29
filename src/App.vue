<script>
// Importazione dello store (state management)
  import { store } from "./store"
  import axios from "axios";
  export default{
    name        : "App",
    components  : {},
    data()
    {
      return {
                projects  : [],
                api_url   : 'http://127.0.0.1:8000'
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
  <h1 class="text-black bg-info">hello world</h1>
</template>

<style scoped lang="scss">
    // Uso del foglio di stile scss
    @use "./assets/style/main.scss" as *;

</style>

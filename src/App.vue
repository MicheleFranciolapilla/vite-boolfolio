<script>
  import axios from 'axios';
  import { store } from './store';
  import Comp_Header from './components/Comp_Header.vue';
  import Comp_Footer from './components/Comp_Footer.vue';
  export default
  {
    name        : "App",
    components  : 
                  {
                    Comp_Header,
                    Comp_Footer
                  },
    data()
    {
      return  {
                store
              } 
    },
    mounted()
    {
      if (!this.store.categories_updated.executed)
        this.get_categories();
      if (!this.store.technologies_updated.executed)
        this.get_technologies();
    },
    methods:
    {
      get_categories()
      {
        axios.get(`${this.store.api_url_root}/api/categories`)
          .then( response =>
            {
              this.store.categories = response.data.categories;
              this.store.categories_updated.success = true;
              console.log(this.store.categories);
            })
          .catch( error =>
            {
              this.store.categories_updated.success = false;
            });
        this.store.categories_updated.executed = true;
        let now = new Date();
        this.store.categories_updated.date = now.toDateString();
        this.store.categories_updated.time = now.toTimeString();
      },

      get_technologies()
      {
        axios.get(`${this.store.api_url_root}/api/technologies`)
          .then( response =>
            {
              this.store.technologies = response.data.technologies;
              this.store.technologies_updated.success = true;
              console.log(this.store.technologies);
            })
          .catch( error =>
            {
              this.store.technologies_updated.success = false;
            });
        this.store.technologies_updated.executed = true;
        let now = new Date();
        this.store.technologies_updated.date = now.toDateString();
        this.store.technologies_updated.time = now.toTimeString();      
      }
    }
  }
</script>

<template>
  <div id="front_end">
    <Comp_Header/>
    <main class="row px-5">
      <section id="side_panel" class="fixed col-1 border border-3 border-black me-5">
        <h1>Sono il side panel</h1>
      </section>
      <section id="router_views" class="col-9">
        <RouterView></RouterView>
      </section>
    </main>
    <Comp_Footer/>
  </div>
</template>

<style lang="scss">
    // Uso del foglio di stile scss
    @use "./assets/style/main.scss" as *;
    main
    {
      padding-top: calc($header_height + $upper_gap);
      #side_panel
      {
        top: 0;
        &:hover
        {
          display: none;
        }
      }
      #router_views
      {
        flex-grow: 1;
      }
    }
</style>

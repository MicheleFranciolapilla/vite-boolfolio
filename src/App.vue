<script>
  import axios from 'axios';
  import { store } from './store';
  import Comp_Header from './components/Comp_Header.vue';
  import Comp_PageManager from './components/Comp_PageManager.vue';
  import Comp_Footer from './components/Comp_Footer.vue';
  export default
  {
    name        : "App",
    components  : 
                  {
                    Comp_Header,
                    Comp_PageManager,
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
    <div id="fixed_top_components" class="fixed-top">
      <Comp_Header/>
      <Comp_PageManager v-if="store.current_page != 'home'" />
    </div>
    <main class="row mx-0" 
     :class="(store.current_page == 'home') ? 'home_main' : ''">
      <section 
       v-if="store.side_panel_visible" 
       id="side_panel" 
       class="col-1 ms-3 border border-3 border-info bg-light"
       :class="(store.current_page == 'home') ? 'home_panel' : ''">
      </section>
      <section id="router_views" class="col-9 px-5">
        <RouterView></RouterView>
      </section>
    </main>
    <Comp_Footer/>
  </div>
</template>

<style lang="scss">
    // Uso del foglio di stile scss
    @use "./assets/style/main.scss" as *;
    #fixed_top_components
    {
      z-index: 999;
    }
    main
    {
      padding-top: calc($header_height + $page_manager_h + $upper_gap);
      padding-bottom: calc($footer_height + $upper_gap);
      min-height: 100vh;
      background-image: linear-gradient(315deg, rgb(233, 155, 155) 33%, rgb(139, 62, 62) 66%, rgb(29, 36, 42));
      &.home_main
      {
        padding-top: calc($header_height + $upper_gap);
      }
      #side_panel
      {
        position: sticky;
        top: calc($header_height + $page_manager_h + $upper_gap);
        left: 0;
        max-height: 65vh;
        &.home_panel
        {
          top: calc($header_height + $upper_gap);
        }
      }
      #router_views
      {
        flex-grow: 1;
      }
    }
</style>

<script>
  import { store } from './AxiosStore';
  import Comp_Header from './components/Comp_Header.vue';
  import Comp_PageManager from './components/Comp_PageManager.vue';
  import Comp_SidePanel from './components/Comp_SidePanel.vue';
  import Comp_Footer from './components/Comp_Footer.vue';
  import Comp_ErrorViewer from './components/Comp_ErrorViewer.vue';
  export default
  {
    name        : 'App',
    components  : 
                  {
                    Comp_Header,
                    Comp_PageManager,
                    Comp_SidePanel,
                    Comp_Footer,
                    Comp_ErrorViewer
                  },
    data()
    {
      return  {
                store
              } 
    },
    mounted()
    {
      if (this.store.session_start)
        this.initialize_data();
    },
    methods:
    {
      initialize_data()
      {
        this.store.session_start = false;
        this.store.get_categories();
        this.store.get_technologies();
      },

      initialize_tech_filter()
      {
        this.store.technologies_filter = [];
        for (let i = 0; i < this.store.technologies.length; i++)
        {
          this.store.technologies_filter.push(true);
        }
      },
    }
  }
</script>

<template>
  <div id="front_end">
    <Comp_ErrorViewer/>
    <div id="fixed_top_components" class="fixed-top">
      <Comp_Header/>
      <Comp_PageManager v-if="store.current_page == 'projects_index'" />
    </div>
    <main class="row mx-0" 
     :class="(store.current_page != 'projects_index') ? 'home_main' : ''">
      <section 
       v-if="store.side_panel_visible && store.current_page == 'projects_index'" 
       id="side_panel_section" 
       class="col-2 ms-3 border border-3 border-info bg-light p-0 py-2"
       :class="(store.current_page == 'home') ? 'home_panel' : ''">
        <Comp_SidePanel/>
      </section>
      <section id="router_views" class="col-8 px-5">
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
      #side_panel_section
      {
        position: sticky;
        top: calc($header_height + $page_manager_h + $upper_gap);
        left: 0;
        max-height: calc(65vh);
        overflow-y: auto;
        align-self: flex-start;
        z-index: 999;
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

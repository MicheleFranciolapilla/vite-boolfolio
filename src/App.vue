<script>
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
  }
</script>

<template>
  <div id="front_end">
    <Comp_Header/>
    <main>
      <RouterView></RouterView>
    </main>
    <Comp_Footer/>
  </div>
</template>

<style lang="scss">
    // Uso del foglio di stile scss
    @use "./assets/style/main.scss" as *;
</style>

<template>
  <div class="app">
    <NavBarMenu />
    <router-view />
  </div>
</template>

<script setup>
import NavBarMenu from "./components/navBarMenu.vue";


</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

nav {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
</style>

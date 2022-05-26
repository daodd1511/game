<script setup>
import Navbar from "./components/Navbar.vue";
import Home from "./views/Home.vue";
</script>

<template>
  <div class="sas">
    <div class="sas__background">
      <div class="sas__container">
        <Navbar></Navbar>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>

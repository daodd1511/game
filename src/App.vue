<script setup>
import Navbar from "./components/Navbar.vue";
import background from "../src/assets/images/background.png";
import loading from "../src/assets/images/loading-screen.png";
import { ref, onBeforeMount } from "vue";
const isLoading = ref(true);
onBeforeMount(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 2000);
});
</script>

<template>
  <div class="sas">
    <div
      class="sas__background"
      :style="'background-image: url(' + background + ')'"
    >
      <div
        v-if="isLoading"
        class="sas__container z-50 h-screen bg-cover bg-center"
        :style="'background-image: url(' + loading + ')'"
      ></div>
      <div
        v-else
        class="sas__container"
        :style="
          isLoading ? 'background-image: url(' + loading + ');z-index:101' : ''
        "
      >
        <Navbar></Navbar>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "./assets/styles/main.scss";
</style>

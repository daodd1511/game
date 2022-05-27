<script setup>
import logoimg from "../assets/images/sas-crown-icon.png";
import menu from "../assets/images/menu-background.png";
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const active = ref(0);
onBeforeMount(() => {
  if (route.path == "/instructions") active.value = 1;
  if (route.path == "/score") active.value = 2;
  if (route.path == "/about") active.value = 3;
});
</script>

<template>
  <div class="sas__navbar" :style="'background-image: url(' + menu + ')'">
    <div class="navbar__logo">
      <router-link
        activeclass="active"
        class="nav-link"
        to="/"
        @click="active = 0"
      >
        <img :src="logoimg" class="navbar__logoimg" />
      </router-link>
    </div>
    <div class="navbar__menu">
      <router-link
        @click="active = 1"
        :class="active == 1 ? 'active' : ''"
        class="nav-link"
        to="/instructions"
        >Instructions</router-link
      >
      <router-link
        @click="active = 2"
        :class="active == 2 ? 'active' : ''"
        class="nav-link"
        to="/score"
        >Score</router-link
      >
      <router-link
        @click="active = 3"
        :class="active == 3 ? 'active' : ''"
        class="nav-link"
        to="/about"
        >About</router-link
      >
    </div>
  </div>
</template>

<style scoped></style>

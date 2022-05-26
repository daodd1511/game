<script setup>
import logoimg from "../assets/images/sas-crown-icon.png";
</script>

<template>
  <div class="sas__navbar">
    <div class="navbar__logo">
      <router-link activeclass="active" class="nav-link" to="/">
        <img :src="logoimg" class="navbar__logoimg" />
      </router-link>
    </div>
    <div class="navbar__menu">
      <router-link activeclass="active" class="nav-link" to="/instructions"
        >Instructions</router-link
      >
      <router-link activeclass="active" class="nav-link" to="/score"
        >Score</router-link
      >
      <router-link activeclass="active" class="nav-link" to="/about"
        >About</router-link
      >
    </div>
  </div>
</template>

<style scoped></style>

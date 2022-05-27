<script setup>
import { useRouter } from "vue-router";
import home from "../../src/assets/images/home-screen.png";
const route = useRouter();
const onSwipe = () => {
  route.push("/game");
};
</script>

<template>
  <div
    class="sas__home"
    v-touch:swipe="onSwipe"
    :style="'background-image: url(' + home + ')'"
  ></div>
</template>

<style scoped></style>

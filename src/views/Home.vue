<script setup>
import { useRouter } from "vue-router";
const route = useRouter();
const onSwipe = () => {
  route.push("/game");
};
</script>

<template>
  <div class="sas__home" v-touch:swipe="onSwipe"></div>
</template>

<style scoped></style>

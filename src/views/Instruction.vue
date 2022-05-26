<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper";
import instructionimg1 from "../assets/images/instructions-screen1.png";
import instructionimg2 from "../assets/images/instructions-screen2.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
</script>

<template>
  <div class="sas__blankpaper instructions">
    <div class="sas__instructions">
      <swiper
        :modules="Pagination"
        :pagination="{ clickable: true, type: 'bullets' }"
      >
        <swiper-slide>
          <img :src="instructionimg1" class="instructions__one" />
        </swiper-slide>
        <swiper-slide>
          <img :src="instructionimg2" class="instructions__two" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<style scoped></style>

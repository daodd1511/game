<script setup>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";
import instructionimg1 from "../assets/images/instructions-screen1.png";
import instructionimg2 from "../assets/images/instructions-screen2.png";
import blankpaper from "../assets/images/blank-paper.png";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
</script>

<template>
  <div
    class="sas__blankpaper instructions"
    :style="'background-image: url(' + blankpaper + ')'"
  >
    <div class="sas__instructions">
      <swiper>
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

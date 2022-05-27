<script setup>
import sharebtn from "../assets/images/buttons/sharebtn.png";
import replaybtn from "../assets/images/buttons/replaybtn.png";
import blankpaper from "../assets/images/blank-paper.png";
import shopbtn from "../assets/images/buttons/shopbtn.png";

import { ref, onBeforeMount, computed } from "vue";
let scoreBoard = ref();
const searchText = ref("");
onBeforeMount(async () => {
  await fetchData();
});
const filteredData = computed(() => {
  let filter = new RegExp(searchText.value, "i");
  return scoreBoard.value.filter((user) => {
    return user.name.match(filter);
  });
});
const fetchData = async () => {
  try {
    await fetch("https://resmanagement.herokuapp.com/api/bonus/scoreboard")
      .then((res) => res.json())
      .then((data) => (scoreBoard.value = data));
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <div
    class="sas__blankpaper p-8 pt-24"
    :style="'background-image: url(' + blankpaper + ')'"
  >
    <div class="sas__score">
      <div class="score__header">
        <div class="score__headermain">top best kings</div>
        <div class="score__headersub">of all times</div>
      </div>
      <div v-if="!scoreBoard">Loading...</div>
      <div v-else>
        <input
          type="text"
          id="gameformEmail"
          placeholder="Search name"
          v-model="searchText"
        />
        <table
          class="table-responsive table w-full"
          aria-labelledby="tabelLabel"
        >
          <thead>
            <tr>
              <td class="border-[1px] border-l-0 border-black text-center">
                Rank
              </td>
              <td class="border-[1px] border-black text-center">Name</td>
              <td class="border-[1px] border-r-0 border-black text-center">
                Point
              </td>
            </tr>
          </thead>
          <tbody>
            <template v-for="(user, index) in filteredData" :key="user._id">
              <tr v-if="index < 15">
                <td
                  class="border-[1px] border-l-0 border-black py-1 text-center"
                >
                  {{ user.rank }}
                </td>
                <td class="border-[1px] border-black text-center">
                  {{ user.name }}
                </td>
                <td class="border-[1px] border-r-0 border-black text-center">
                  {{ Number(user.point.toFixed(1)) }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
      <div class="score__actionbtngroup">
        <div class="actionbtngroup__item">
          <img :src="shopbtn" />
          <div>shop</div>
        </div>
        <router-link to="/game">
          <div class="actionbtngroup__item">
            <img :src="replaybtn" />
            <div>replay</div>
          </div>
        </router-link>
        <div class="actionbtngroup__item">
          <img :src="sharebtn" />
          <div>share</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

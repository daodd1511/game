<script setup>
import shopbtn from "../assets/images/buttons/shopbtn.png";
import sharebtn from "../assets/images/buttons/sharebtn.png";
import replaybtn from "../assets/images/buttons/replaybtn.png";
import { ref, onBeforeMount } from "vue";
let scoreBoard = ref();
onBeforeMount(() => {
  fetchData();
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
  <div class="sas__blankpaper">
    <div class="sas__score">
      <div class="score__header">
        <div class="score__headermain">top best kings</div>
        <div class="score__headersub">of all times</div>
      </div>
      <div v-if="!scoreBoard">Loading...</div>
      <table class="table-responsive table" aria-labelledby="tabelLabel" v-else>
        <tbody>
          <tr v-for="(user, index) in scoreBoard" :key="user._id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.name }}</td>
            <td>{{ Number(user.point.toFixed(1)) }}</td>
          </tr>
        </tbody>
      </table>
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

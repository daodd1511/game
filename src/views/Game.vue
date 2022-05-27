<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import loading from "../../src/assets/images/loading-screen.png";
import game__navbar from "../assets/images/game/progress-bar-bg.png";
import sas__crown from "../../src/assets/images/sas-crown-icon.png";
import diaglog from "../../src/assets/images/game/dialog-box.png";
import helpbox from "../../src/assets/images/game/help-box.png";
import king from "../../src/assets/images/characters/king.png";
import submit from "../../src/assets/images/game/game-submit-bg.png";
import jokerimg from "../assets/images/game/joker.png";
import jokerimgUp from "../assets/images/game/joker-up.png";
import Alchemist from "../assets/images/characters/Alchemist.png";
import CalvinoTheCook from "../assets/images/characters/CalvinoTheCook.png";
import Farmer from "../assets/images/characters/Farmer.png";
import King from "../assets/images/characters/King.png";
import Knight from "../assets/images/characters/Knight.png";
import Merchant from "../assets/images/characters/Merchant.png";
import Prince from "../assets/images/characters/Prince.png";
import PrincessZizola from "../assets/images/characters/PrincessZizola.png";
import Prisoner from "../assets/images/characters/Prisoner.png";
import TrustedServant from "../assets/images/characters/TrustedServant.png";
import Queen from "../assets/images/characters/Queen.png";

const route = useRouter();
const isFinished = ref(false);
const isPaneOpenBottom = ref(false);
const isSubmitting = ref(false);
const username = ref("");
const point = ref(0);
const questions = ref();
const currIndex = ref(0);
const ROLE = ref([
  Alchemist,
  TrustedServant,
  Prisoner,
  PrincessZizola,
  Prince,
  Knight,
  Merchant,
  King,
  Farmer,
  CalvinoTheCook,
  Queen,
]);
const maxPoint = ref(0);
const currentPercent = ref(0);
const getBiggerNumber = (a, b) => {
  return a > b ? a : b;
};
const getRole = (data) => {
  for (let role of ROLE.value) {
    if (role.includes(data)) {
      return role;
    }
  }
};
const fetchQuestions = async () => {
  try {
    await fetch("https://resmanagement.herokuapp.com/api/bonus/questions")
      .then((res) => res.json())
      .then((data) => {
        questions.value = data;
        for (let i = 0; i < data.length; i++) {
          maxPoint.value += getBiggerNumber(data[i].Yes, data[i].No);
        }
      });
  } catch (e) {
    console.log(e);
  }
};
const onShowHelpText = () => {
  isPaneOpenBottom.value = !isPaneOpenBottom.value;
};
const handleLeftSwipe = () => {
  if (questions.value.length - 1 == currIndex.value) {
    isFinished.value = true;
  } else {
    point.value += questions.value[currIndex.value].No;
    currIndex.value++;
    currentPercent.value = currIndex.value * 10;
  }
};
const handleRightSwipe = () => {
  if (questions.value.length - 1 == currIndex.value) {
    isFinished.value = true;
  } else {
    point.value += questions.value[currIndex.value].Yes;
    currIndex.value++;
    currentPercent.value = currIndex.value * 10;
  }
};
const handleTopSwipe = () => {
  if (!isPaneOpenBottom.value) {
    isPaneOpenBottom.value = !isPaneOpenBottom.value;
  }
};
const handleBottomSwipe = () => {
  if (isPaneOpenBottom.value) {
    isPaneOpenBottom.value = !isPaneOpenBottom.value;
  }
};
const handleSubmit = async () => {
  if (isSubmitting.value == false) {
    isSubmitting.value = true;
    if (username.value != null && username.value != "") {
      var data = {
        name: username.value,
        point: point.value,
      };
      await fetch(
        "https://resmanagement.herokuapp.com/api/bonus/scoreboard/add",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
    }
    route.push("/score");
  }
};
onBeforeMount(() => {
  fetchQuestions();
});
</script>

<template>
  <div class="sas__game">
    <div
      class="game__navbar"
      :style="'background-image: url(' + game__navbar + ')'"
    >
      <div
        :style="
          'background-image: url(' +
          sas__crown +
          ');left:' +
          currentPercent +
          '%;'
        "
        class="progress-crown transition-all duration-200"
      ></div>
    </div>
    <div v-if="isFinished != true">
      <div class="sas__gamewrapper">
        <div class="sas__gameitem" v-if="questions">
          <div
            :style="
              'background-image: url(' +
              getRole(questions[currIndex].Role) +
              ')'
            "
            class="h-screen bg-cover transition-all"
            v-touch:swipe.left="handleLeftSwipe"
            v-touch:swipe.right="handleRightSwipe"
            v-touch:swipe.top="handleTopSwipe"
            v-touch:swipe.bottom="handleBottomSwipe"
          ></div>
          <div
            class="gameitem__dialog"
            :style="'background-image: url(' + diaglog + ')'"
          >
            {{ questions[currIndex].Dialog }}
          </div>
          <div class="gameitem__charactername">
            {{ questions[currIndex].Role }}
          </div>
          <div
            class="gameitem__help"
            :class="isPaneOpenBottom ? `height-translate` : ``"
            :style="'background-image: url(' + helpbox + ')'"
          >
            <div @click="onShowHelpText" class="help__togglebtn">
              <span>{{ questions[currIndex].Question }}</span>
              <span class="help__joker">
                <img :src="jokerimg" v-if="isPaneOpenBottom" />
                <img :src="jokerimgUp" v-else />
              </span>
            </div>
            <div>{{ questions[currIndex].Info }}</div>
          </div>
        </div>
        <div
          v-else
          class="sas__container h-screen bg-cover bg-center"
          :style="'background-image: url(' + loading + ');z-index:99'"
        >
          Loading
        </div>
      </div>
    </div>
    <div
      v-else
      class="sas__gamesubmit"
      :style="'background-image: url(' + king + ')'"
    >
      <div
        class="gamesubmit__gameform"
        :style="'background-image: url(' + submit + ')'"
      >
        <div class="gameform__header">Congratulations!</div>
        <div class="gameform__info">Your're a good and gracious king.</div>
        <div class="gameform__score">Your score: {{ Math.floor(point) }}</div>
        <div v-if="!isSubmitting">
          <input
            type="email"
            id="gameformEmail"
            placeholder="Name"
            v-model="username"
          />
          <div class="gameform__submitbtn" @click="handleSubmit()">Submit</div>
        </div>
        <div v-else>Submitting!</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

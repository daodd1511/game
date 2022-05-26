<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import jokerimg from "../assets/images/game/joker.png";
import jokerimgUp from "../assets/images/game/joker-up.png";
const route = useRouter();
const isFinished = ref(false);
const isPaneOpenBottom = ref(false);
const isSubmitting = ref(false);
const username = ref("");
const point = ref(0);
const questions = ref();
const currIndex = ref(0);
const fetchQuestions = async () => {
  try {
    await fetch("https://resmanagement.herokuapp.com/api/bonus/questions")
      .then((res) => res.json())
      .then((data) => (questions.value = data));
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
  }
};
const handleRightSwipe = () => {
  if (questions.value.length - 1 == currIndex.value) {
    isFinished.value = true;
  } else {
    point.value += questions.value[currIndex.value].Yes;
    currIndex.value++;
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
    <div class="game__navbar"></div>
    <div v-if="isFinished != true">
      <div class="sas__gamewrapper" v-if="questions">
        <div class="sas__gameitem">
          <div
            :style="
              'background-image:url(../src/assets/images/characters/' +
              questions[currIndex].Role +
              '.png)'
            "
            class="h-screen bg-cover"
            v-touch:swipe.left="handleLeftSwipe"
            v-touch:swipe.right="handleRightSwipe"
            v-touch:swipe.top="handleTopSwipe"
            v-touch:swipe.bottom="handleBottomSwipe"
          ></div>
          <div class="gameitem__dialog">{{ questions[currIndex].Dialog }}</div>
          <div class="gameitem__charactername">
            {{ questions[currIndex].Role }}
          </div>
          <div
            class="gameitem__help"
            :class="isPaneOpenBottom ? `height-translate` : ``"
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
      </div>
    </div>
    <div v-else class="sas__gamesubmit">
      <div class="gamesubmit__gameform">
        <div class="gameform__header">Congratulations!</div>
        <div class="gameform__info">Your're a good and gracious king.</div>
        <div class="gameform__score">Your score: {{ Math.floor(point) }}</div>
        <input
          type="email"
          id="gameformEmail"
          placeholder="Name"
          v-model="username"
        />
        <div
          v-if="!isSubmitting"
          class="gameform__submitbtn"
          @click="handleSubmit()"
        >
          Submit
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

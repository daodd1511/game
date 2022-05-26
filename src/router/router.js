import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Game from "../views/Game.vue";
import About from "../views/About.vue";
import Score from "../views/Score.vue";
import Instruction from "../views/Instruction.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/game",
    name: "Game",
    component: Game,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/score",
    name: "Score",
    component: Score,
  },
  {
    path: "/instructions",
    name: "Instruction",
    component: Instruction,
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;

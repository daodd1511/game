import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router/router.js";
import Vue3TouchEvents from "vue3-touch-events";
import { createPinia } from "pinia";
const app = createApp(App);
app.use(router).use(createPinia()).use(Vue3TouchEvents).mount("#app");

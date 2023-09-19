import i18n from "@/plugins/i18n";
import App from "./App.vue";
import router from "./router";
import pinia from "./store";

import { createApp } from "vue";

import "./style/index.scss";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);
app.mount("#app");

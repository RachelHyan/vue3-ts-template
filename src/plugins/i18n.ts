// element-plus国际化
import { createI18n, type I18n } from "vue-i18n";
import en from "../../locales/en.js";
import zh from "../../locales/zh-CN.js";

const messages = {
	zh,
	en,
};

const i18n: I18n = createI18n({
	legacy: false,
	globalInjection: true,
	locale: sessionStorage.getItem("locale") ?? "zh",
	messages,
});

export const t = (message) => {
	if (!message) return;
	// @ts-ignore
	return i18n.global.t(message);
};

export default i18n;

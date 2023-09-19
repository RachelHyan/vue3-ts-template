import { onBeforeMount, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { useNav } from "./useNav";

/** 国际化 */
export function useTranslationLang() {
	const { changeTitle } = useNav();
	const { locale, t } = useI18n();
	const route = useRoute();

	const translationCh = () => {
		sessionStorage.setItem("locale", "zh");
		locale.value = "zh";
	};

	const translationEn = () => {
		sessionStorage.setItem("locale", "en");
		locale.value = "en";
	};

	watch(
		() => locale.value,
		() => {
			changeTitle(route.meta);
		},
	);

	onBeforeMount(() => {
		locale.value = sessionStorage.getItem("locale") ?? "zh";
	});

	return {
		t,
		route,
		locale,
		translationCh,
		translationEn,
	};
}

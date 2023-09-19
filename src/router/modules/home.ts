import { t } from "@/plugins/i18n";
import { home } from "../enums";

export default {
	path: "/",
	name: "Home",
	component: () => import("@/views/home/index.vue"),
	meta: {
		title: t("主页"),
		rank: home,
	},
} as RouteConfigsTable;

import { t } from "@/plugins/i18n";
import { error } from "../enums";

export default {
	path: "/error",
	redirect: "/error/403",
	meta: {
		title: t("异常页面"),
		rank: error,
	},
	children: [
		{
			path: "/error/403",
			name: "403",
			component: () => import("@/views/error/403.vue"),
			meta: {
				title: t("无权访问"),
			},
		},
		{
			path: "/error/404",
			name: "404",
			component: () => import("@/views/error/404.vue"),
			meta: {
				title: t("页面不存在"),
			},
		},
		{
			path: "/error/500",
			name: "500",
			component: () => import("@/views/error/500.vue"),
			meta: {
				title: t("服务器出错"),
			},
		},
	],
} as RouteConfigsTable;

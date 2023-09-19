/** 路由 菜单 */
import { t } from "@/plugins/i18n";
import { routeMetaType } from "../types";

export function useNav() {
	/** 动态 title */
	const changeTitle = (meta: routeMetaType) => {
		document.title = `${t(meta.title)} | Haoea UI`;
	};

	return {
		changeTitle,
	};
}

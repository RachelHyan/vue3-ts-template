import type { IconifyIcon } from "@iconify/vue";

export type routeMetaType = {
	title?: string;
	icon?: string | IconifyIcon;
	showLink?: boolean;
	savedPosition?: boolean;
	auths?: Array<string>;
};

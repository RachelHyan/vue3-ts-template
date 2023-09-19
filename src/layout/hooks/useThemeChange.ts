/** 主题 */
import { useDark, useToggle } from "@vueuse/core";

export function useDataThemeChange() {
	/** 日、夜切换 */
	const isDark = useDark();
	const toggleDark = useToggle(isDark);
	const darkThemeToggle = () => toggleDark;

	return {
		isDark,
		darkThemeToggle,
	};
}

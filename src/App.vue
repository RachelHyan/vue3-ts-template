<template>
	<!-- element-plus 提供的配置组件，用于设置全局配置信息 -->
	<el-config-provider :locale="currentLocale">
		<router-view />
	</el-config-provider>
</template>

<script lang="ts">
import { ElConfigProvider } from "element-plus";
import en from "element-plus/dist/locale/en.mjs";
import zhCn from "element-plus/dist/locale/zh-cn";
import { computed, defineComponent } from "vue";

export default defineComponent({
	name: "app",
	components: {
		[ElConfigProvider.name]: ElConfigProvider,
	},
	setup() {
		const currentLocale = computed(() => {
			return sessionStorage.getItem("locale") === "zh" ? zhCn : en;
		});

		return {
			currentLocale,
		};
	},
});
</script>

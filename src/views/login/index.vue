<template>
	<div>
		<el-switch v-model="isDark" @change="darkThemeToggle()" />
		<el-button @click="translationCh">中文</el-button>
		<el-button @click="translationEn">English</el-button>
		{{ t("登录") }}
	</div>
</template>

<script lang="ts">
import { useDataThemeChange } from "@/layout/hooks/useThemeChange";
import { useTranslationLang } from "@/layout/hooks/useTranslationLang";
import { t } from "@/plugins/i18n";
import { useUserStoreHook } from "@/store/modules/user";
import { defineComponent } from "vue";

export default defineComponent({
	name: "Login",
	setup() {
		const { isDark, darkThemeToggle } = useDataThemeChange();
		const { translationCh, translationEn } = useTranslationLang();

		const onLogin = async () => {
			const res = await useUserStoreHook().loginByUsername({
				username: "common11",
				password: "123456",
			});
			console.log(res);
		};

		return {
			t,
			isDark,
			onLogin,
			darkThemeToggle,
			translationCh,
			translationEn,
		};
	},
});
</script>

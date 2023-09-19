<script lang="ts">
import { defineComponent } from "vue";
import { useUserStoreHook } from "../../store/modules/user";

export default defineComponent({
	name: "Home",
	setup() {
		const userStore = useUserStoreHook();
		return {
			userStore,
		};
	},
});
</script>

<template>
	<div>Hello {{ userStore.username }}</div>
</template>

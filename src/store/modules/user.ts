import { getLogin } from "@/api/user";
import pinia from "@/store";
import { defineStore } from "pinia";
import { UserState } from "../types";

export const useUserStore = defineStore(
	// 唯一ID
	"user",
	{
		state: (): UserState => ({
			username: "admin",
			roles: [],
		}),
		getters: {
			// 保存需要二次处理的数据
		},
		actions: {
			// 封装方法，和更新 state 数据
			/** 登录 */
			async loginByUsername(data) {
				try {
					const res = await getLogin(data);

					return res;
				} catch (error) {
					return error;
				}
			},
		},
		persist: {
			// 持久化
			key: "userInfo",
			storage: sessionStorage, // 指定存储方式
			paths: ["username"], // 指定 state 里要进行持久化的属性路径列表
		},
	},
);

export function useUserStoreHook() {
	return useUserStore(pinia);
}

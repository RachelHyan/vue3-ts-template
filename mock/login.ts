import { MockMethod } from "vite-plugin-mock";

export default [
	{
		url: "/login",
		method: "post",
		// 使用 body 可以获取请求体
		response: ({ body }) => {
			if (body.username === "admin") {
				return {
					success: true,
					data: {
						username: "admin",
						// 一个用户可能有多个角色
						roles: ["admin"],
						accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
						refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
						expires: "2023/10/30 00:00:00",
					},
				};
			} else {
				return {
					success: true,
					data: {
						username: "common",
						// 一个用户可能有多个角色
						roles: ["common"],
						accessToken: "eyJhbGciOiJIUzUxMiJ9.common",
						refreshToken: "eyJhbGciOiJIUzUxMiJ9.commonRefresh",
						expires: "2023/10/30 00:00:00",
					},
				};
			}
		},
	},
] as MockMethod[];

/** 不参与菜单的路由 */
export default [
	{
		path: "/login",
		name: "Login",
		component: () => import("@/views/login/index.vue"),
		meta: {
			title: "登录",
		},
	},
	{
		path: "/:pathMatch(.*)", // 匹配不到所有路由，固定置于最底部
		redirect: "/error/404",
	},
] as Array<RouteConfigsTable>;

# vue3 + ts + vite 脚手架

## 技术栈

- 编程语言：TS
- 构建工具：vite
- 依赖管理：pinia
- 前端框架：vue3
- 路由工具：vue router
- 状态管理：pinia
  - 数据持久化：pinia-plugin-persistedstate
- HTTP：axios
- CSS 预编译：Sass
- UI 框架：element-plus
- 进度加载条组件：nprogress
- Git Hook：Husky
- 代码规范：EditorConfig + Prettier + ESLint + StyleLint + LintStage + CommitLint
- 数据模拟：Mock.js

## vue3 全家桶

### 初始化 package.json

```js
pnpm init
```

### 安装依赖

```js
pnpm install typescript @types/node -D

pnpm install vue vue-router pinia pinia-plugin-persistedstate axios

pnpm install nprogress
pnpm install @types/nprogress -D

pnpm install sass -D

pnpm install element-plus @element-plus/icons-vue
// 按需导入
pnpm install unplugin-vue-components unplugin-auto-import -D

```

## 目录结构

```bash
|- .vscode/	# 该项目在 vscode 的配置
		|- settings.json	# vscode 设置文件
|- mock/	# 模拟数据管理
|- public/	# 不经过打包的静态资源
|- src/			# 项目资源
		|- api/	# 服务层代码，后端接口
		|- assets/		# 经过打包的静态资源
		|- base-ui		# 基础 UI 组件，如按钮、输入框、表格等
		|- components/	# 通用组件
		|- directives/	# 指令
		|- layout/		# 整体布局
		|- plugins/		# 插件扩展
		|- router/		# 路由配置
				|- modules/		# 页面路由集合
						|- error.ts		# 错误页面的路由
						|- ...
						|- remaining.ts	# 不参与菜单的路由
				|- index.ts
		|- store/		# 状态管理
				|- modules/	# 状态集合
				|- types/	# 类型管理
						|- index.ts	# 类型
				|- index.ts
		|- style/		# 项目通用样式
				|- index.sass		# 整体入口
				|- reset.sass		# 对基础html默认样式的重置
		|- types/		# 类型管理
				|- env.d.ts	# 环境变量类型
				|- router.d.ts	# 路由类型
		|- utils/		# 工具函数
				|- http		# axios封装
						|- index.ts
						|- types.d.ts
				|- progress		# 进度加载条配置
						|- index.ts
		|- views/		# 页面组件
		|- App.vue	# 项目的根组件 - 定义全局路由导航、全局样式等
		|- main.ts	# 入口ts文件 - 创建实例、配置全局插件、路由器、状态管理等，还可以挂载根组件到 DOM 上
|- index.html		# 入口的html文件
|- .env	# 全局环境变量配置
|- .env.development	# 开发环境配置
|- .env.production	# 生产环境配置
|- vite.config.ts	# vite 配置文件
|- tsconfig.json	# ts 配置文件
|- .eslintrc.js		# eslint 配置文件
|- .eslintignore	# eslint 忽略文件
```

### index.html

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<!-- public/logo.png 浏览器展示的logo -->
		<link rel="icon" type="image/png" href="/logo.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<!-- 浏览器展示的标题 -->
		<title>vue3-ts-template</title>
	</head>
	<body>
		<!-- 令 id="app" 便于vue进行挂载 -->
		<div id="app"></div>
		<!-- 引入main.ts文件 -->
		<script type="module" src="/src/main.ts"></script>
	</body>
</html>
```

### App.vue

```vue
<template>
	<!-- element-plus 提供的配置组件，用于设置全局配置信息 -->
	<el-config-provider :locale="locale">
		<router-view />
	</el-config-provider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn";

export default defineComponent({
	name: "app",
	components: {
		[ElConfigProvider.name]: ElConfigProvider,
	},
	setup() {
		return {
			locale: zhCn,
		};
	},
});
</script>
```

### 样式

#### /src/style/main.less

```less
/* globals.less - 全局 */
@import "./reset.less";

/* components.less - 组件 */

/* sections.less - 区块 */

/* main.less - 页面 */
```

#### /src/style/reset.less

```less
*,
*::before,
*::after {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

html,
body {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	text-rendering: optimizelegibility;
}
```

### nprogress

#### /src/utils/progress/index.ts

```ts
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
	// 动画方式
	easing: "ease",
	// 递增进度条的速度
	speed: 500,
	// 是否显示加载ico
	showSpinner: false,
	// 自动递增间隔
	trickleSpeed: 200,
	// 初始化时的最小百分比
	minimum: 0.3,
});

export default NProgress;
```

### vue router

#### 封装

##### /src/types/router.d.ts

- 定义路由类型

  ```ts
  /** 全局路由类型声明 */

  import { type RouteComponent, type RouteLocationNormalized } from "vue-router";

  /**
   * 全局类型声明，无需引入直接在 `.vue` 、`.ts` 、`.tsx` 文件使用即可获得类型提示
   */
  declare global {
  	interface ToRouteType extends RouteLocationNormalized {
  		meta: CustomizeRouteMeta;
  	}

  	/**
  	 * @description 完整子路由的`meta`配置表
  	 */
  	interface CustomizeRouteMeta {
  		/** 菜单名称（兼容国际化、非国际化，如何用国际化的写法就必须在根目录的`locales`文件夹下对应添加） `必填` */
  		title: string;
  		/** 菜单图标 `可选` */
  		icon?: string | FunctionalComponent | IconifyIcon;
  		/** 菜单名称右侧的额外图标 */
  		extraIcon?: string | FunctionalComponent | IconifyIcon;
  		/** 是否在菜单中显示（默认`true`）`可选` */
  		showLink?: boolean;
  		/** 是否显示父级菜单 `可选` */
  		showParent?: boolean;
  		/** 页面级别权限设置 `可选` */
  		roles?: Array<string>;
  		/** 按钮级别权限设置 `可选` */
  		auths?: Array<string>;
  		/** 路由组件缓存（开启 `true`、关闭 `false`）`可选` */
  		keepAlive?: boolean;
  		/** 内嵌的`iframe`链接 `可选` */
  		frameSrc?: string;
  		/** `iframe`页是否开启首次加载动画（默认`true`）`可选` */
  		frameLoading?: boolean;
  		/** 页面加载动画（有两种形式，一种直接采用vue内置的`transitions`动画，另一种是使用`animate.css`写进、离场动画）`可选` */
  		transition?: {
  			/**
  			 * @description 当前路由动画效果
  			 * @see {@link https://next.router.vuejs.org/guide/advanced/transitions.html#transitions}
  			 * @see animate.css {@link https://animate.style}
  			 */
  			name?: string;
  			/** 进场动画 */
  			enterTransition?: string;
  			/** 离场动画 */
  			leaveTransition?: string;
  		};
  		// 是否不添加信息到标签页，（默认`false`）
  		hiddenTag?: boolean;
  		/** 动态路由可打开的最大数量 `可选` */
  		dynamicLevel?: number;
  		/** 将某个菜单激活
  		 * （主要用于通过`query`或`params`传参的路由，当它们通过配置`showLink: false`后不在菜单中显示，就不会有任何菜单高亮，
  		 * 而通过设置`activePath`指定激活菜单即可获得高亮，`activePath`为指定激活菜单的`path`）
  		 */
  		activePath?: string;
  	}

  	/**
  	 * @description 完整子路由配置表
  	 */
  	interface RouteChildrenConfigsTable {
  		/** 子路由地址 `必填` */
  		path: string;
  		/** 路由名字（对应不要重复，和当前组件的`name`保持一致）`必填` */
  		name?: string;
  		/** 路由重定向 `可选` */
  		redirect?: string;
  		/** 按需加载组件 `可选` */
  		component?: RouteComponent;
  		meta?: CustomizeRouteMeta;
  		/** 子路由配置项 */
  		children?: Array<RouteChildrenConfigsTable>;
  	}

  	/**
  	 * @description 整体路由配置表（包括完整子路由）
  	 */
  	interface RouteConfigsTable {
  		/** 路由地址 `必填` */
  		path: string;
  		/** 路由名字（保持唯一）`可选` */
  		name?: string;
  		/** `Layout`组件 `可选` */
  		component?: RouteComponent;
  		/** 路由重定向 `可选` */
  		redirect?: string;
  		meta?: {
  			/** 菜单名称（兼容国际化、非国际化，如何用国际化的写法就必须在根目录的`locales`文件夹下对应添加）`必填` */
  			title: string;
  			/** 菜单图标 `可选` */
  			icon?: string | FunctionalComponent | IconifyIcon;
  			/** 是否在菜单中显示（默认`true`）`可选` */
  			showLink?: boolean;
  			/** 菜单升序排序，值越高排的越后（只针对顶级路由）`可选` */
  			rank?: number;
  		};
  		/** 子路由配置项 */
  		children?: Array<RouteChildrenConfigsTable>;
  	}
  }

  // https://router.vuejs.org/zh/guide/advanced/meta.html#typescript
  declare module "vue-router" {
  	interface RouteMeta extends CustomizeRouteMeta {}
  }
  ```

##### /src/router/modules/xxx.ts

- 页面路由集合

  ```ts
  // home.ts
  export default {
  	path: "/home",
  	name: "Home",
  	component: () => import("@/views/home/index.vue"),
  	meta: {
  		title: "主页",
  	},
  } as RouteConfigsTable;

  // error.ts
  export default {
  	path: "/error",
  	redirect: "/error/403",
  	meta: {
  		title: "",
  	},
  	children: [
  		{
  			path: "/error/403",
  			name: "403",
  			component: () => import("@/views/error/403.vue"),
  			meta: {
  				title: "无权访问",
  			},
  		},
  		{
  			path: "/error/404",
  			name: "404",
  			component: () => import("@/views/error/404.vue"),
  			meta: {
  				title: "页面不存在",
  			},
  		},
  		{
  			path: "/error/500",
  			name: "500",
  			component: () => import("@/views/error/500.vue"),
  			meta: {
  				title: "服务器出错",
  			},
  		},
  	],
  } as RouteConfigsTable;

  // remaining.ts
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
  ```

##### /src/router/index.ts

```ts
import { RouteRecordRaw, Router, createRouter, createWebHistory } from "vue-router";
import NProgress from "../utils/progress";
/** 不参与菜单的路由 */
import remianingRouter from "./modules/remianing";

/**
 * 自动导入全部静态路由，无需再手动导入
 * 匹配 src/router/modules 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件，除了 remaining.ts 文件
 * import.meta.glob 为 vite 提供的特殊导入方式，它可以将模块中全部内容导入并返回一个Record对象
 *  默认为懒加载模式 加入配置项 eager 取消懒加载
 */
const modules: Record<string, any> = import.meta.glob(["./modules/**/*.ts", "!./modules/**/remaining.ts"], {
	eager: true,
});

/** 原始静态路由（未做任何处理） */
const routes: Array<RouteRecordRaw> = [];

/** 将路由全部导入数组 */
Object.keys(modules).forEach((key) => {
	routes.push(modules[key].default);
});

/** 创建路由实例 */
const router: Router = createRouter({
	history: createWebHistory(),
	routes: routes.concat(...(remianingRouter as any)),
});

router.beforeEach((to, from, next) => {
	NProgress.start();
	next();
});

router.afterEach(() => {
	NProgress.done();
});

export default router;
```

### pinia

#### /src/store/index.ts

```ts
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
```

#### 举栗

- 定义类型

  ```ts
  // src/store/types/index.ts
  export interface UserState {
  	username: string;
  	roles: Array<string>;
  }
  ```

- 设置

  ```ts
  // /src/store/modules/user.ts
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
  ```

- 使用

  ```ts
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
  ```

### axios

#### 封装

##### 响应状态码提示（可选）

```ts
// /src/utils/http/status.ts
/** 定义常量字符串 */
const ERROR_MESSAGES = {
	400: "请求错误(400)",
	401: "未授权，请重新登录(401)",
	403: "拒绝访问(403)",
	404: "请求出错(404)",
	408: "请求超时(408)",
	500: "服务器错误(500)",
	501: "服务未实现(501)",
	502: "网络错误(502)",
	503: "服务不可用(503)",
	504: "网络超时(504)",
	505: "HTTP版本不受支持(505)",
};

/**
 *
 * @param status 传入状态码获取对应提示信息
 * @returns
 */
export const getMessage = (status: number | string): string => {
	const code = Number(status);
	if (ERROR_MESSAGES[code]) {
		return `${ERROR_MESSAGES[code]}，请检查网络或联系管理员！`;
	}
	return `连接出错(${code})!，请检查网络或联系管理员！`;
};
```

##### /src/utils/http/index.ts

```ts
import type { AxiosInstance, AxiosRequestConfig } from "axios";
import Axios from "axios";
import NProgress from "../progress";
import type { HttpError, HttpRequestConfig, HttpResponse, RequestMethods } from "./types";

/** 配置请求选项 */
const defaultConfig: AxiosRequestConfig = {
	// 请求超时时间
	timeout: 10000,
	headers: {
		Accept: "application/json, text/plain, */*",
		"Content-Type": "application/json",
		"X-Requested-With": "XMLHttpRequest",
	},
};

/** 封装对 HTTP 请求的处理 */
class Http {
	constructor() {
		this.httpInterceptorsRequest();
		this.httpInterceptorsResponse();
	}

	/** 保存当前 Axios 实例对象 */
	private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

	/** 初始化配置对象 */
	private static initConfig: HttpRequestConfig = {};

	/** 防止重复刷新 token */
	private static isRefreshing = false;

	/** token 过期后，暂存待执行的请求 */
	private static requests = [];

	/** 重连原始请求
	 * @description 遇到需要认证的错误（比如token过期），会将当前请求存入一个请求队列中，
	 * 并返回一个Promise对象，该Promise对象会在后续获取到新的有效token后被resolve，
	 * 并将新的token添加到请求的headers中，然后重新发起请求
	 */
	private static retryOriginalRequest(config: HttpRequestConfig) {
		return new Promise((resolve) => {
			// @ts-ignore
			Http.requests.push((token: string) => {
				// @ts-ignore
				config.headers["Authorization"] = "Bearer " + token;
				resolve(config);
			});
		});
	}

	/** 请求拦截 */
	private httpInterceptorsRequest(): void {
		Http.axiosInstance.interceptors.request.use(
			async (config: HttpRequestConfig): Promise<any> => {
				// 开启进度条动画
				NProgress.start();

				// 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
				if (typeof config.beforeRequestCallback === "function") {
					config.beforeRequestCallback(config);
					return config;
				}
				if (Http.initConfig.beforeRequestCallback) {
					Http.initConfig.beforeRequestCallback(config);
					return config;
				}

				/** 请求白名单，放置一些不需要token的接口（通过设置请求白名单，防止token过期后再请求造成的死循环问题） */
				const whiteList = [];
				// 判断请求的url是否在白名单中
				return whiteList.find((url) => url === config.url)
					? config // 在 - 直接返回配置对象
					: new Promise((resolve) => {
							// 不在
							// 获取 token
							const data = "your_token";
							if (data) {
								// 判断是否过期
								const now = new Date().getTime();
								const expired = parseInt("data.expired") - now <= 0;
								if (expired) {
									if (!Http.isRefreshing) {
										Http.isRefreshing = true;
										// token 过期刷新 refreshToken
										// 重新设置请求头的 Authorization 字段
										// 执行之前暂存的待执行请求
										Http.isRefreshing = false;
									}
									resolve(Http.retryOriginalRequest(config));
								} else {
									// @ts-ignore
									config.headers["Authorization"] = "data.accessToken";
									resolve(config);
								}
							} else {
								resolve(config);
							}
					  });
			},
			(error) => {
				return Promise.reject(error);
			},
		);
	}

	/** 响应拦截 */
	private httpInterceptorsResponse(): void {
		Http.axiosInstance.interceptors.response.use(
			(response: HttpResponse) => {
				const $config = response.config;

				// 关闭进度条动画
				NProgress.done();

				// 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
				if (typeof $config.beforeResponseCallback === "function") {
					$config.beforeResponseCallback(response);
					return response.data;
				}
				if (Http.initConfig.beforeResponseCallback) {
					Http.initConfig.beforeResponseCallback(response);
					return response.data;
				}

				return response.data;
			},
			(error: HttpError) => {
				const $error = error;
				$error.isCancelRequest = Axios.isCancel($error);

				// 关闭进度条动画
				NProgress.done();

				// 所有的响应异常 区分来源为取消请求/非取消请求
				return Promise.reject($error);
			},
		);
	}

	/** 通用请求工具函数 */
	public request<T>(method: RequestMethods, url: string, param?: AxiosRequestConfig, axiosConfig?: HttpRequestConfig): Promise<T> {
		const config = {
			method,
			url,
			...param,
			...axiosConfig,
		} as HttpRequestConfig;

		// 单独处理自定义请求/响应回调
		return new Promise((resolve, reject) => {
			Http.axiosInstance
				.request(config)
				.then((response: any) => {
					resolve(response);
				})
				.catch((error) => {
					reject(error);
				});
		});
	}

	/** 单独抽离的post工具函数 */
	public post<T, P>(url: string, params?: AxiosRequestConfig<T>, config?: HttpRequestConfig): Promise<P> {
		return this.request<P>("post", url, params, config);
	}

	/** 单独抽离的get工具函数 */
	public get<T, P>(url: string, params?: AxiosRequestConfig<T>, config?: HttpRequestConfig): Promise<P> {
		return this.request<P>("get", url, params, config);
	}
}

export const http = new Http();
```

### main.ts

```ts
import App from "./App.vue";
import router from "./router";
import pinia from "./store";

import { createApp } from "vue";

import "./style/index.sass";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount("#app");
```

## 构建工具

### 安装依赖

```js
pnpm install vite @vitejs/plugin-vue @vitejs/plugin-vue-jsx vue-tsc -D
```

- vite：项目构建工具
- @vitejs/plugin-vue：使vite能够编译vue组件
- @vitejs/plugin-vue-jsx：使vite能够编译jsx组件
- @types/node：node类型包，使ts支持node
- @types/nprogress：nprogress的类型支持
- vue-tsc：vue文件的类型检查工具

### vite 环境变量

https://cn.vitejs.dev/guide/env-and-mode.html

- vite 在 **import.meta.env** 对象上暴露环境变量

在根目录下新建 .env、.env.production、.env.development

- .env：所有情况下都会加载
- .env.[mode]：只在指定模式下加载

> npm run dev 会加载 .env 和 .env.development 内的配置
>
> npm run build 会加载 .env 和 .env.production 内的配置
>
> mode 可以通过命令行 --mode 选项来重写。

```ts
// .env
# axios请求的 baseURL
VITE_APP_API_BASEURL = /api
```

### 环境变量类型支持

#### /src/types/env.d.ts

```ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
	// 每次添加完新的环境变量就在此添加一次ts类型
	// 这样就能在使用 import.meta.env 时获得ts语法提示
	readonly VITE_APP_API_BASEURL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
```

### vite配置文件

#### vite.config.ts

```ts
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { URL, fileURLToPath } from "url";
import type { ConfigEnv, UserConfig } from "vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	/** 当前执行node命令时文件夹的地址（工作目录） */
	const root = process.cwd();
	/** 获取环境变量 */
	const { VITE_PORT, VITE_APP_API_BASEURL } = loadEnv(mode, root);

	return {
		/** 项目根目录 */
		root,
		/** 项目部署的基础路径 */
		base: "/",
		/** 无需处理的静态资源位置 */
		publicDir: fileURLToPath(new URL("./public", import.meta.url)),
		/** 需要处理的静态资源位置 */
		assetsInclude: fileURLToPath(new URL("./src/assets", import.meta.url)),
		plugins: [
			vue(),
			vueJsx(),
			// element-plus 自动导入
			AutoImport({
				resolvers: [ElementPlusResolver()],
			}),
			Components({
				resolvers: [ElementPlusResolver()],
			}),
		],
		/** 运行后本地预览的服务器 */
		server: {
			// 是否开启 https
			https: false,
			// 端口号
			port: parseInt(VITE_PORT),
			// 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
			host: "0.0.0.0",
			// 启动后是否自动打开浏览器
			open: false,
			// 是否开启CORS跨域
			cors: true,
			// 代理服务器
			// 帮助开发时解决跨域问题
			proxy: {
				// 这里的意思是 以/api开头发送的请求都会被转发到 target
				"/api": {
					target: VITE_APP_API_BASEURL,
					// 是否跨域
					changeOrigin: true,
					// secure: false,  如果是https接口，需要配置这个参数
					// 发起请求时将 '/api' 替换为 ''
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
		/** 打包配置 */
		build: {
			// 关闭 sorcemap 报错不会映射到源码
			sourcemap: false,
			// 打包大小超出 4000kb 提示警告
			chunkSizeWarningLimit: 4000,
			rollupOptions: {
				// 打包入口文件 根目录下的 index.html
				// 也就是项目从哪个文件开始打包
				input: {
					index: fileURLToPath(new URL("./index.html", import.meta.url)),
				},
				// 静态资源分类打包
				output: {
					format: "esm",
					chunkFileNames: "static/js/[name]-[hash].js",
					entryFileNames: "static/js/[name]-[hash].js",
					assetFileNames: "static/[ext]/[name]-[hash].[ext]",
				},
			},
		},
		/** 配置别名 */
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
				"#": fileURLToPath(new URL("./types", import.meta.url)),
			},
		},
	};
});
```

### ts 配置文件

#### tsconfig.json

```jso
{
   "compilerOptions": {
      // 编译出JS的目标ES版本
      "target": "esnext",
      // 使用的ES版本
      "module": "esnext",
      // 用于选择模块解析策略，有'node'和'classic'两种类型
      "moduleResolution": "node",
      // 开启严格模式
      "strict": true,
      // 强制代码中使用的模块文件名必须和文件系统中的文件名保持大小写一致
      "forceConsistentCasingInFileNames": true,
      // 允许使用 xxx 代替 * as xxx 导入
      "allowSyntheticDefaultImports": true,
      // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
      "jsx": "preserve",
      // 用来指定编译时是否生成.map文件
      "sourceMap": true,
      // 通过为导入内容创建命名空间，实现CommonJS和ES模块之间的互操作性
      "esModuleInterop": true,
      // 是否可以导入 json module
      "resolveJsonModule": true,
      // 是否检测定义了但是没使用的变量
      "noUnusedLocals": true,
      // 是否检查是否有在函数体中没有使用的参数
      "noUnusedParameters": true,
      // 是否启用实验性的装饰器特性
      "experimentalDecorators": true,
      // ts中可以使用的库 这里配置为 dom 与 es模块
      "lib": ["dom", "esnext"],
      // 不允许变量或函数参数具有隐式any类型
      "noImplicitAny": false,
      // 启用阻止对下载库的类型检查
      "skipLibCheck": true,
      // types用来指定需要包含的模块
      "types": ["vite/client", "element-plus/global"],
      // 编译的时候删除注释
      "removeComments": true,
      // 使用绝对路径时使用baseUrl去解析导入路径
      "baseUrl": ".",
      // 为导入路径配置别名
      "paths": {
         "@/*": ["src/*"],
         "#/*": ["types/*"]
      },
      // 配置虚拟目录
      "rootDirs": []
   },
   // 指定需要编译文件
   "include": [
      "src/**/*.ts",
      "src/**/*.d.ts",
      "src/**/*.tsx",
      "src/**/*.vue",
      "types/**/*.d.ts",
      "types/**/*.ts",
      "build/**/*.ts",
      "build/**/*.d.ts",
      "mock/**/*.ts",
      "vite.config.ts"
   ],
   // 指定不需要编译的文件
   "exclude": ["node_modules", "dist", "**/*.js"]
}
```

### 指令配置

#### package.json

```json
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit --skipLibCheck && vite build"
  },
```

## 代码质量

### editorconfig

- 不同 IDE 编辑器统一编码风格

  ```ts
  - 1. 安装插件：EditorConfig for VS Code
  - 2. 根目录下新建：.editorconfig

  # 网站：http://editorconfig.org

  # 设为当前目录为根路径
  root = true

  # 表示这些规则适用于所有文件
  [*]
  # 设置文件编码
  charset = utf-8
  # 缩进风格，tab或space
  indent_style = tab
  # 缩进大小
  indent_size = 2
  # 换行符，lf或crlf
  end_of_line = lf
  # 删除行末尾的任何空白字符
  trim_trailing_whitespace = true
  # 在文件末尾插入一个空行
  insert_final_newline = true

  # 表示这些规则适用于所有扩展名为md的文件
  [*.md]
  # 表示对 md 文件的行长度不做限制
  max_line_length = off
  # 表示对 md 文件的行尾不做空格删除
  trim_trailing_whitespace = false
  ```

### ESLint

- 查出 JS 代码语法问题
- 标记不符合规范的代码
- 自动修复一些结构、风格问题

#### 安装依赖

```ts
pnpm install -D eslint @eslint/create-config
```

- @eslint/create-config：eslint配置文件初始化工具

#### 生成配置文件

```js
#  生成 ESLint 配置文件模板
npx eslint --init
```

```js
# 出现如下选择
​
# 选择2 我们会使用 prettier 进行代码风格校验
How would you like to use ESLint?
1.只检查语法
2.检查语法并提示问题
3.检查语法、提示问题并且强制使用一些代码风格
​
# 你的项目用的哪一种模块化方式 选择1
What type of modules does your project use?
1.ES6
2.CommonJS
3.None
​
# 使用的框架 选择2
Which framework does your project use?
1.React
2.Vue.js
3.None
​
# 项目是否使用TS yes
Does your project use TypeScript?
​
# 项目在哪里跑的 选择1
Where does your code run?
1.browser
2.node
​
# 项目用哪种配置文件 选择1
What format do you want your config file to be in?
1.JavaScript
2.YAML
3.JSON

# 是否立即安装需要的依赖
Would you like to install them now?
# 会帮我们安装如下插件
# pnpm install -D eslint-plugin-vue@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest
```

#### .eslintrc.js

```hs
module.exports = {
	// 使 eslint 支持 node 和 ES6
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:vue/vue3-essential",
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	/*
   这里一定要配置对 先使用vue-eslint-parser 再使用@typescript-eslint/parser
   先解析 <template> 标签中的内容 然后再解析 vue <script> 标签中的 TS 代码
   */
	// 选择使用的解析器
	parser: "vue-eslint-parser",
	// 解析器的详细配置
	parserOptions: {
		// 使用最新版 ES 语法
		ecmaVersion: "latest",
		// 使用 ESLint TS 解析器
		parser: "@typescript-eslint/parser",
		// 使用 ES 模块化规范
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "vue"],
	/** https://eslint.cn/docs/rules/ */
	rules: {
		"vue/no-v-html": "off",
		"vue/require-default-prop": "off",
		"vue/require-explicit-emits": "off",
		"vue/multi-word-component-names": "off",
		"@typescript-eslint/no-explicit-any": "off", // any
		"no-debugger": "off",
		"@typescript-eslint/explicit-module-boundary-types": "off", // setup()
		"@typescript-eslint/ban-types": "off",
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"vue/html-self-closing": [
			"error",
			{
				html: {
					void: "always",
					normal: "always",
					component: "always",
				},
				svg: "always",
				math: "always",
			},
		],
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
			},
		],
		"no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
			},
		],
		"prettier/prettier": [
			"error",
			{
				endOfLine: "auto",
			},
		],
	},
};
```

#### 配置命令 - 修复代码质量

```ts
// package.json
// --cache 为仅检测改动过的代码
// --max-warnings 0 表示出现超过0个警告强制eslint以错误状态推出
"scripts": {
   "lint:eslint": "eslint --cache --max-warnings 0 {src,mock,build}/**/*.{vue,,js,ts,tsx} --fix"
}
```

#### 忽略文件 - .eslintignore

```js
node_modules
*.md
*.d.ts
.vscode
.idea
dist
public
docs
.husky
.local
Dockerfile
package.json
.eslintrc.js
```

#### 自动修复 - /.vscode/settings.json

```json
{
	"editor.codeActionsOnSave": {
		"source.fixAll": true
	}
}
```

### Prettier

- 限制代码风格

#### 安装依赖

```js
pnpm install -D prettier
```

#### .ptettierrc.js

```js
module.exports = {
	printWidth: 80, //单行长度
	tabWidth: 2, //缩进长度
	useTabs: false, //使用空格代替tab缩进
	semi: true, //句末使用分号
	singleQuote: true, //使用单引号
};
```

#### 配置命令 - 修复代码风格

```js
{
    "script": {
        "lint:prettier": "prettier --write **/*.{js,ts,json,tsx,css,scss,vue,html,md}"
    }
}
```

#### 解决 ESLint 和 Prettier 冲突

##### 安装依赖

```ts
pnpm install -D eslint-config-prettier eslint-plugin-prettier
```

##### 配置 ESLint

```ts
// 此配置在eslint配置文件中新增 .eslintrc.js
extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-essential",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "plugin:prettier/recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier/skip-formatting",
],
```

#### 忽略文件 - .prettierignore

```js
/dist/*
/node_modules/**
```

### styleLint

#### 安装依赖

```js
pnpm install -D stylelint

pnpm install -D stylelint-prettier stylelint-config-html stylelint-config-recess-order stylelint-config-recommended stylelint-config-recommended-scss stylelint-config-recommended-vue stylelint-config-standard stylelint-config-standard-scss stylelint-order stylelint-prettier stylelint-scss postcss-html postcss-scss  @vue/eslint-config-prettier @vue/eslint-config-typescript
```

- `stylelint`：用于检查 CSS/SCSS/Less 等样式文件的工具

- `stylelint-config-html`：为 HTML 标签和属性定义了样式规则
- `stylelint-config-recess-order`：强制按照固定顺序编写 CSS 属性
- `stylelint-config-recommended`：包含一组 Stylelint 的基本规则，推荐在项目中使用
- `stylelint-config-recommended-scss`：此规则扩展了 `stylelint-config-recommended` 并添加了有关 SCSS 的规则
- `stylelint-config-recommended-vue`：建议在 Vue 项目中使用的 Stylelint 规则
- `stylelint-config-standard`：一组适用于基本 CSS 属性的规则，这些规则是向后兼容且易于阅读
- `stylelint-config-standard-scss`：此规则扩展了 `stylelint-config-standard` 并添加了有关 SCSS 的规则
- `stylelint-order`：可定义 CSS 属性的排序方式
- `stylelint-prettier`：自动修复代码中的样式问题，保持样式和 Prettier 一致
- `stylelint-scss`：添加了一些有关 SCSS linting 的规则

#### 配置文件 - .stylelintrc.js

```js
module.exports = {
	root: true,
	// 继承推荐规范配置
	extends: ["stylelint-config-standard", "stylelint-config-html/vue", "stylelint-config-recess-order"], // 添加规则插件
	plugins: ["stylelint-order", "stylelint-prettier", "stylelint-scss"], // 不同格式的文件指定自定义语法
	overrides: [
		{
			files: ["**/*.(css|html|vue)"],
			customSyntax: "postcss-html",
		},
		{
			files: ["*.scss", "**/*.scss"],
			customSyntax: "postcss-scss",
			extends: ["stylelint-config-standard-scss", "stylelint-config-recommended-vue/scss"],
		},
	], // 忽略检测文件
	ignoreFiles: ["**/*.js", "**/*.jsx", "**/*.tsx", "**/*.ts", "**/*.json", "**/*.md", "**/*.yaml"], // 自定义配置规则
	/** https://stylelint.bootcss.com/user-guide/rules/list */
	rules: {
		// 便于配置变量 关闭未知属性检测
		"selector-class-pattern": null,
		"no-descending-specificity": null,
		"scss/dollar-variable-pattern": null,
		"property-no-unknown": null, // 指定类选择器的模式
		"selector-class-pattern": null, // 允许 Vue 的 global
		"selector-pseudo-class-no-unknown": [
			true,
			{
				ignorePseudoClasses: ["deep", "global"],
			},
		], // 允许 Vue 的 v-deep
		"selector-pseudo-element-no-unknown": [
			true,
			{
				ignorePseudoElements: ["v-deep", "v-global", "v-slotted"],
			},
		], // 允许对应内核前缀
		"property-no-vendor-prefix": null, // 指定样式的排序 修复后会帮我们自动整理CSS样式的顺序
		"at-rule-no-unknown": [
			true,
			{
				ignoreAtRules: ["tailwind", "apply", "variants", "responsive", "screen", "function", "if", "each", "include", "mixin", "use"],
			},
		],
		"rule-empty-line-before": [
			"always",
			{
				ignore: ["after-comment", "first-nested"],
			},
		],
		"unit-no-unknown": [true, { ignoreUnits: ["rpx"] }],
		"order/order": [
			[
				"dollar-variables",
				"custom-properties",
				"at-rules",
				"declarations",
				{
					type: "at-rule",
					name: "supports",
				},
				{
					type: "at-rule",
					name: "media",
				},
				"rules",
			],
			{ severity: "warning" },
		],
		"order/properties-order": ["position", "top", "right", "bottom", "left", "z-index", "display", "justify-content", "align-items", "float", "clear", "overflow", "overflow-x", "overflow-y", "padding", "padding-top", "padding-right", "padding-bottom", "padding-left", "margin", "margin-top", "margin-right", "margin-bottom", "margin-left", "width", "min-width", "max-width", "height", "min-height", "max-height", "font-size", "font-family", "text-align", "text-justify", "text-indent", "text-overflow", "text-decoration", "white-space", "color", "background", "background-position", "background-repeat", "background-size", "background-color", "background-clip", "border", "border-style", "border-width", "border-color", "border-top-style", "border-top-width", "border-top-color", "border-right-style", "border-right-width", "border-right-color", "border-bottom-style", "border-bottom-width", "border-bottom-color", "border-left-style", "border-left-width", "border-left-color", "border-radius", "opacity", "filter", "list-style", "outline", "visibility", "box-shadow", "text-shadow", "resize", "transition"],
	},
};
```

#### 忽略文件 - .stylelintignore

```js
/dist/*
/public/*
public/*
/mock/*
/node_modules/*
/plop-templates/*
/types/*
```

### Husky

- 在代码提交前后进行一些自定义的操作
- 支持所有的 Git 钩子

#### 安装依赖

```js
pnpm install -D husky
```

#### 配置初始化命令

```js
// package.json
{
    "script": {
        "prepare": "husky install"
    }
}
```

#### 运行命令

```js
# 运行后会初始化husky
pnpm prepare
```

### LintStaged

- 在 git 缓存中进行代码质量与风格的修复，在代码提交前进行统一校验，通过后才可以提交

#### 安装依赖

```js
pnpm install -D lint-staged
```

#### 钩子配置 - pre-conmit

```js
# --no-install 代表强制使用本地模块
npx husky add .husky/pre-commit "npm run lint:lint-staged"
```

#### 配置文件 - /.husky/lintstagedrc.js

```js
module.exports = {
	"*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
	"{!(package)*.json}": ["prettier --write--parser json"],
	"package.json": ["prettier --write"],
	"*.vue": ["eslint --fix", "prettier --write", "stylelint --fix"],
	"*.{vue,css,scss,postcss,less}": ["stylelint --fix", "prettier --write"],
	"*.md": ["prettier --write"],
};
```

#### 配置命令

```js
{
    "script":{
        "lint:lint-staged": "lint-staged -c ./.husky/lintstagedrc.js"
    }
}
```

### CommitLint

#### 安装依赖

```js
pnpm install -D @commitlint/cli  @commitlint/config-conventional
```

- @commitlint/config-conventional：commitlint自定义配置规则插件

#### 规则配置 - commitlint.config.js

```js
/** https://commitlint.js.org/#/ */
// 这里是通俗的解释 详情请前往官方文档查阅
module.exports = {
	ignores: [(commit) => commit.includes("init")],
	extends: ["@commitlint/config-conventional"],
	rules: {
		// 信息以空格开头
		"body-leading-blank": [2, "always"],
		"footer-leading-blank": [2, "always"], // 信息最大长度
		"header-max-length": [2, "always", 108], // 信息不能未空
		"subject-empty": [2, "never"], // 信息类型不能未空
		"type-empty": [2, "never"], // 提交信息的类型 下文有介绍
		"type-enum": [2, "always", ["feat", "fix", "perf", "style", "docs", "test", "refactor", "build", "ci", "chore", "revert", "wip", "workflow", "types", "release"]],
	},
};
```

#### 钩子配置 - commit-msg

```js
# 配置 commit-msg 钩子 运行 commitlint
# --no-install 代表强制使用本地模块
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```

## mock

- 数据模拟

### 安装依赖

```js
pnpm install -D mockjs @types/mockjs vite-plugin-mock
```

### 配置启用 mock - vite.config.ts

```js
plugins: [
	viteMockServe({
		// 如果接口为 /mock/xxx 以 mock 开头就会被拦截响应配置的内容
		mockPath: "mock", // 数据模拟需要拦截的请求起始 URL
		enable: process.env.NODE_ENV === "development",
	}),
];
```

### 使用

#### 配置 mock - /mock/user.ts

```ts
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
```

#### api 定义接口 - /src/api/user.ts

```ts
import { http } from "@/utils/http";

export type UserResult = {
	success: boolean;
	data: {
		/** 用户名 */
		username: string;
		/** 当前登陆用户的角色 */
		roles: Array<string>;
		/** `token` */
		accessToken: string;
		/** 用于调用刷新`accessToken`的接口时所需的`token` */
		refreshToken: string;
		/** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
		expires: Date;
	};
};

/** 登录 */
export const getLogin = async (data?: object) => {
	return http.request<UserResult>("post", "/login", { data });
};
```

#### store 调用接口 - /src/store/user.ts

```ts
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
```

#### 页面获取

```vue
const onLogin = async () => { const res = await useUserStoreHook().loginByUsername({ username: "common11", password: "123456", }); console.log(res); };
```

## 用户代码片段

https://snippet-generator.app/

## 打包优化

### 按需引入第三方库

### 路由懒加载

```ts
const routes = [
	{
		path: "/",
		name: "",
		component: () => import(".."),
	},
];
```

### 删除 console.log

#### 安装依赖

```js
pnpm install -D vite-plugin-remove-console
```

#### 配置 - vite.config.ts

```ts
// vite.config.js
import removeConsole from 'vite-plugin-remove-console';

plugins: [
// other plugins...
removeConsole()
],

```

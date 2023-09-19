# 目录结构

```bash
|- .vscode/	# 该项目在 vscode 的配置
		|- settings.json	# vscode 设置文件
|- locales/
		|- zh-CN.yaml	# 中文包
		|- en.yaml		# 英文包
|- mock/	# 模拟数据管理
|- public/	# 不经过打包的静态资源
|- src/			# 项目资源
		|- api/	# 服务层代码，后端接口
		|- assets/		# 经过打包的静态资源
		|- base-ui		# 基础 UI 组件，如按钮、输入框、表格等
		|- components/	# 通用组件
		|- directives/	# 指令
		|- layout/		# 整体布局
				|- hook/	# 全局 hook
						|- useDataThemeChange.ts	# 主题
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

# 暗黑模式

## 安装依赖

```js
pnpm install @vueuse/core
```

## 定义 css

```scss
- /src/style/dark.scss
@use "element-plus/theme-chalk/dark/css-vars.css";

/* 暗黑模式适配 */
html.dark {
	/* 自定义深色背景颜色 */
	--el-bg-color: #626aef;
}


- /src/style/index.scss
@import "./dark.scss";


- /src/layout/hooks/useDataThemeChange.ts
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



- 使用
<template>
	<div>
		<el-switch v-model="isDark" @change="darkThemeToggle()" />
	</div>
</template>

<script lang="ts">
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";
import { defineComponent } from "vue";

export default defineComponent({
	name: "Login",
	setup() {
		const { isDark, darkThemeToggle } = useDataThemeChange();

		return {
			isDark,
			darkThemeToggle,
		};
	},
});
</script>

```

# 国际化

## 安装依赖

```ts
pnpm install vue-i18n
pnpm install -D @iconify/vue
```

## 定义语音包

```ts
-/src/acellos / zh - CN.yaml;
login: username: 账号;
password: 密码;
login: 登录;
buttons: login: 登录;
loginOut: 退出系统 - /src/acellos / en.yaml;
login: username: username;
password: password;
login: login;
buttons: login: login;
loginOut: loginOut;
```

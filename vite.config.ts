import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { URL, fileURLToPath } from "url";
import type { ConfigEnv, UserConfig } from "vite";
import { defineConfig, loadEnv } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import removeConsole from "vite-plugin-remove-console";

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	/** 当前执行node命令时文件夹的地址（工作目录） */
	const root = process.cwd();
	/** 获取环境变量 */
	const { VITE_PORT } = loadEnv(mode, root);

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
			// 线上环境删除console.log
			removeConsole(),
			viteMockServe({
				// 如果接口为 /mock/xxx 以 mock 开头就会被拦截响应配置的内容
				mockPath: "mock", // 数据模拟需要拦截的请求起始 URL
				enable: process.env.NODE_ENV === "development",
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
				// "/api": {
				// 	target: VITE_APP_API_BASEURL,
				// 	// 是否跨域
				// 	changeOrigin: true,
				// 	// secure: false,  如果是https接口，需要配置这个参数
				// 	// 发起请求时将 '/api' 替换为 ''
				// 	rewrite: (path) => path.replace(/^\/api/, ""),
				// },
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

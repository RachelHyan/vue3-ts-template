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
		"@vue/typescript/recommended",
		"@vue/prettier",
		"plugin:prettier/recommended",
		"@vue/eslint-config-typescript",
		"@vue/eslint-config-prettier/skip-formatting",
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

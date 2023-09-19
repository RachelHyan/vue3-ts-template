module.exports = {
	root: true,
	// 继承推荐规范配置
	extends: [
		"stylelint-config-standard",
		"stylelint-config-html/vue",
		"stylelint-config-recess-order",
	], // 添加规则插件
	plugins: ["stylelint-order", "stylelint-prettier", "stylelint-scss"], // 不同格式的文件指定自定义语法
	overrides: [
		{
			files: ["**/*.(css|html|vue)"],
			customSyntax: "postcss-html",
		},
		{
			files: ["*.scss", "**/*.scss"],
			customSyntax: "postcss-scss",
			extends: [
				"stylelint-config-standard-scss",
				"stylelint-config-recommended-vue/scss",
			],
		},
	], // 忽略检测文件
	ignoreFiles: [
		"**/*.js",
		"**/*.jsx",
		"**/*.tsx",
		"**/*.ts",
		"**/*.json",
		"**/*.md",
		"**/*.yaml",
	], // 自定义配置规则
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
				ignoreAtRules: [
					"tailwind",
					"apply",
					"variants",
					"responsive",
					"screen",
					"function",
					"if",
					"each",
					"include",
					"mixin",
					"use",
				],
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
		"order/properties-order": [
			"position",
			"top",
			"right",
			"bottom",
			"left",
			"z-index",
			"display",
			"justify-content",
			"align-items",
			"float",
			"clear",
			"overflow",
			"overflow-x",
			"overflow-y",
			"padding",
			"padding-top",
			"padding-right",
			"padding-bottom",
			"padding-left",
			"margin",
			"margin-top",
			"margin-right",
			"margin-bottom",
			"margin-left",
			"width",
			"min-width",
			"max-width",
			"height",
			"min-height",
			"max-height",
			"font-size",
			"font-family",
			"text-align",
			"text-justify",
			"text-indent",
			"text-overflow",
			"text-decoration",
			"white-space",
			"color",
			"background",
			"background-position",
			"background-repeat",
			"background-size",
			"background-color",
			"background-clip",
			"border",
			"border-style",
			"border-width",
			"border-color",
			"border-top-style",
			"border-top-width",
			"border-top-color",
			"border-right-style",
			"border-right-width",
			"border-right-color",
			"border-bottom-style",
			"border-bottom-width",
			"border-bottom-color",
			"border-left-style",
			"border-left-width",
			"border-left-color",
			"border-radius",
			"opacity",
			"filter",
			"list-style",
			"outline",
			"visibility",
			"box-shadow",
			"text-shadow",
			"resize",
			"transition",
		],
	},
};

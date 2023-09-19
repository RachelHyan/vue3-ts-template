import type { AxiosInstance, AxiosRequestConfig } from "axios";
import Axios from "axios";
import NProgress from "../progress";
import type {
	HttpError,
	HttpRequestConfig,
	HttpResponse,
	RequestMethods,
} from "./types";

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
	public request<T>(
		method: RequestMethods,
		url: string,
		param?: AxiosRequestConfig,
		axiosConfig?: HttpRequestConfig,
	): Promise<T> {
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
	public post<T, P>(
		url: string,
		params?: AxiosRequestConfig<T>,
		config?: HttpRequestConfig,
	): Promise<P> {
		return this.request<P>("post", url, params, config);
	}

	/** 单独抽离的get工具函数 */
	public get<T, P>(
		url: string,
		params?: AxiosRequestConfig<T>,
		config?: HttpRequestConfig,
	): Promise<P> {
		return this.request<P>("get", url, params, config);
	}
}

export const http = new Http();

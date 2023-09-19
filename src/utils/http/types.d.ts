import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "axios";

/** 从 Method 里提取特定的请求方法 */
export type RequestMethods = Extract<
  Method,
  "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;

/** 扩展请求是否被取消，判断是否由取消请求引起 */
export interface HttpError extends AxiosError {
  isCancelRequest?: boolean;
}

/** HTTP 响应对象 - 新增'存储发送请求时的配置信息'字段 */
// @ts-ignore
export interface HttpResponse extends AxiosResponse {
  config: HttpRequestConfig;
}

/** HTTP 请求的配置信息 - 新增 '请求发送之前/响应之后的自定义处理' */
export interface HttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: HttpRequestConfig) => void;
  beforeResponseCallback?: (response: HttpResponse) => void;
}

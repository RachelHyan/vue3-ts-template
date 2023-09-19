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

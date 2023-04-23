/**
 * 普通的请求方法名称
 */
export const PLAIN_METHODS = ['options', 'trace', 'connect'] as const;

/**
 * 带参数的请求方法名称
 */
export const WITH_PARAMS_METHODS = ['head', 'get', 'delete'] as const;

/**
 * 带数据的请求方法名称
 */
export const WITH_DATA_METHODS = ['post', 'put', 'patch'] as const;

/**
 * 可以携带 data 的请求方法
 */
export const WITH_DATA_RE = new RegExp(
  `^(${WITH_DATA_METHODS.join('|')})`,
  'i',
);

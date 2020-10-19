'use strict';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var _toString = Object.prototype.toString;
/**
 * 对字符串进行编码转换
 *
 * @param str 字符串
 */

function encode(str) {
  return encodeURIComponent(str).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}
/**
 * 是不是一个日期对象
 *
 * @param date 判断目标
 */

function isDate(date) {
  return _toString.call(date) === '[object Date]';
}
/**
 * 是不是一个普通对象
 *
 * @param obj 判断目标
 */

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
/**
 * 深度合并多个对象
 *
 * @param objs n 个对象
 */

function deepMerge() {
  var result = {};

  function assignValue(key, val) {
    // 如果当前结果和当前值都为普通对象
    // 递归进行深度合并
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = deepMerge(result[key], val);
    } // 如果只有当前值为普通对象
    // 直接深拷贝当前值
    else if (isPlainObject(val)) {
        result[key] = deepMerge({}, val);
      } // 如果都不是普通对象
      // 直接赋值
      else {
          result[key] = val;
        }
  }

  for (var _len = arguments.length, objs = new Array(_len), _key = 0; _key < _len; _key++) {
    objs[_key] = arguments[_key];
  }

  objs.forEach(function assignObj(obj) {
    Object.entries(obj).forEach(function assignKey(_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      assignValue(key, value);
    });
  });
  return result;
}
/**
 * 从对象中提取一部分属性
 *
 * @param obj  源对象
 * @param keys 需要提取的 key
 */

function pick(obj) {
  var _pick = {};

  for (var _len2 = arguments.length, keys = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    keys[_key2 - 1] = arguments[_key2];
  }

  keys.forEach(function pickKey(key) {
    _pick[key] = obj[key];
  });
  return _pick;
}
/**
 * 从对象中剔除一部分属性
 *
 * @param obj  源对象
 * @param keys 需要剔除的 key
 */

function omit(obj) {
  var _omit = _objectSpread2({}, obj);

  for (var _len3 = arguments.length, keys = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    keys[_key3 - 1] = arguments[_key3];
  }

  keys.forEach(function omitKey(key) {
    delete _omit[key];
  });
  return _omit;
}

/**
 * 通过请求地址和序列化参数生成新的请求地址
 *
 * @param url              请求地址
 * @param serializedParams 序列化参数
 */

function generateURL(url, serializedParams) {
  // 移除 hash
  var hashIndex = url.indexOf('#');

  if (hashIndex !== -1) {
    url = url.slice(0, hashIndex);
  }

  if (serializedParams === '') {
    return url;
  } // 拼接前缀


  var prefix = url.indexOf('?') === -1 ? '?' : '&';
  serializedParams = "".concat(prefix).concat(serializedParams);
  return "".concat(url).concat(serializedParams);
}
/**
 * 默认参数序列化
 *
 * @param params 请求参数
 */


function paramsSerialization(params) {
  var parts = [];
  Object.entries(params).forEach(function encodeKeyValue(_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    if (value === null || value === void 0 || value !== value) {
      return;
    } // 如果值是一个数组, 则特殊处理 key


    if (Array.isArray(value)) {
      key += '[]';
    } // 转成数组统一处理


    var values = [].concat(value);
    values.forEach(function (val) {
      if (isPlainObject(val)) {
        val = JSON.stringify(val);
      } else if (isDate(val)) {
        val = val.toISOString();
      }

      parts.push("".concat(encode(key), "=").concat(encode(val)));
    });
  });
  return parts.join('&');
}
/**
 * 处理 URL 参数
 *
 * @param url              请求地址
 * @param params           请求参数
 * @param paramsSerializer 自定义参数序列化
 */


function buildURL(url) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var paramsSerializer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : paramsSerialization;
  return generateURL(url, paramsSerializer(params));
}

/**
 * 只取 config2 中的配置
 *
 * @param keys
 * @param config
 * @param config2
 */

function onlyFromConfig2(keys, config, config2) {
  keys.forEach(function (key) {
    if (config2[key] !== void 0) {
      config[key] = config2[key];
    }
  });
}
/**
 * 优先取 config2 中的配置, config2 中没有就取 config1
 *
 * @param keys
 * @param config
 * @param config1
 * @param config2
 */


function priorityFromConfig2(keys, config, config1, config2) {
  keys.forEach(function (key) {
    if (config2[key] !== void 0) {
      config[key] = config2[key];
    } else if (config1[key] !== void 0) {
      config[key] = config1[key];
    }
  });
}
/**
 * 深度合并配置
 *
 * @param keys
 * @param config
 * @param config1
 * @param config2
 */


function deepMergeConfig(keys, config, config1, config2) {
  keys.forEach(function (key) {
    if (isPlainObject(config2[key])) {
      var _config1$key;

      config[key] = deepMerge((_config1$key = config1[key]) !== null && _config1$key !== void 0 ? _config1$key : {}, config2[key]);
    } else if (isPlainObject(config1[key])) {
      config[key] = deepMerge(config1[key]);
    }
  });
}
/**
 * 合并 Axios 请求配置
 *
 * @param config1 Axios 请求配置1
 * @param config2 Axios 请求配置2
 */


function mergeConfig() {
  var config1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var config2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var config = {};
  var onlyFromConfig2Keys = ['url', 'data'];
  var priorityFromConfig2Keys = ['adapter', 'baseURL', 'method', 'validateStatus', 'paramsSerializer', 'transformRequest', 'transformResponse', 'errorHandler', 'cancelToken', 'dataType', 'responseType', 'timeout', 'enableHttp2', 'enableQuic', 'enableCache', 'sslVerify'];
  var deepMergeConfigKeys = ['headers', 'params'];
  onlyFromConfig2(onlyFromConfig2Keys, config, config2);
  priorityFromConfig2(priorityFromConfig2Keys, config, config1, config2);
  deepMergeConfig(deepMergeConfigKeys, config, config1, config2);
  return config;
}

/**
 * 拦截器管理器
 */
var InterceptorManagerClass = /*#__PURE__*/function () {
  function InterceptorManagerClass() {
    _classCallCheck(this, InterceptorManagerClass);

    /**
     * 生成拦截器 id
     */
    this._id = 0;
    /**
     * 拦截器集合
     */

    this._interceptors = {};
  }

  _createClass(InterceptorManagerClass, [{
    key: "use",
    value: function use(resolved, rejected) {
      this._interceptors[++this._id] = {
        resolved: resolved,
        rejected: rejected
      };
      return this._id;
    }
  }, {
    key: "eject",
    value: function eject(id) {
      delete this._interceptors[id];
    }
  }, {
    key: "forEach",
    value: function forEach(executor, reverse) {
      var interceptors = Object.values(this._interceptors);

      if (reverse === 'reverse') {
        interceptors = interceptors.reverse();
      }

      interceptors.forEach(executor);
    }
  }]);

  return InterceptorManagerClass;
}();

var CancelClass = /*#__PURE__*/function () {
  /**
   * @param message 取消信息
   */
  function CancelClass(message) {
    _classCallCheck(this, CancelClass);

    this.message = message;
  }

  _createClass(CancelClass, [{
    key: "toString",
    value: function toString() {
      var message = this.message ? ": ".concat(this.message) : '';
      return "Cancel".concat(message);
    }
  }]);

  return CancelClass;
}();

/**
 * 是否是取消请求实例
 *
 * @param value 判断的值
 */

function isCancel(value) {
  return value instanceof CancelClass;
}

/**
 * 请求方法转全小写
 *
 * @param config Axios 请求配置
 */
function methodToLowercase() {
  var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'get';
  return method.toLowerCase();
}
/**
 * 请求方法转全大写
 *
 * @param config Axios 请求配置
 */

function methodToUppercase() {
  var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'GET';
  return method.toUpperCase();
}

/**
 * 拉平请求头
 *
 * @param config Axios 请求配置
 */

function flattenHeaders(config) {
  var _headers$common, _headers$method;

  var headers = config.headers;

  if (headers === void 0) {
    return {};
  }

  var method = methodToLowercase(config.method);
  return _objectSpread2(_objectSpread2(_objectSpread2({}, (_headers$common = headers.common) !== null && _headers$common !== void 0 ? _headers$common : {}), (_headers$method = headers[method]) !== null && _headers$method !== void 0 ? _headers$method : {}), omit(headers, 'common', 'options', 'get', 'head', 'post', 'put', 'delete', 'trace', 'connect'));
}

/**
 * 转换数据
 *
 * @param data       请求数据/响应数据
 * @param headers    请求头/响应头
 * @param transforms 请求数据转换函数/响应数据转换函数
 */
function transformData(data, headers, transforms) {
  if (transforms === void 0) {
    return data;
  }

  if (!Array.isArray(transforms)) {
    transforms = [transforms];
  }

  transforms.forEach(function (transform) {
    data = transform(data, headers);
  });
  return data;
}

/**
 * 检查是否是一个绝对 URL
 *
 * xxx:// 或者 "//" 开头,  视为绝对地址
 *
 * @param url 需要检查的 URL
 */
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}

/**
 * 拼接 baseURL 和 url 获得完整的 URL
 *
 * combineURL('1/2///','////3/4') => '1/2/3/4'
 */
function combineURL(baseURL, url) {
  return "".concat(baseURL.replace(/\/*$/, ''), "/").concat(url.replace(/^\/*/, ''));
}

/**
 * 根据配置中的 baseURL 和 url 和 params 生成完整 URL
 *
 * @param config Axios 请求配置
 */

function transformURL(config) {
  var _config$baseURL = config.baseURL,
      baseURL = _config$baseURL === void 0 ? '' : _config$baseURL,
      _config$url = config.url,
      url = _config$url === void 0 ? '' : _config$url;
  var fullURL = isAbsoluteURL(url) ? url : combineURL(baseURL, url);
  return buildURL(fullURL, config.params, config.paramsSerializer);
}
/**
 * Axios 请求配置转换成各大平台通用请求配置
 *
 * 抹平差异
 *
 * @param config Axios 请求配置
 */


function transformRequest(config) {
  return _objectSpread2({
    url: transformURL(config),
    method: methodToUppercase(config.method),
    header: config.headers
  }, pick(config, 'data', 'headers', 'dataType', 'responseType', 'timeout', 'enableHttp2', 'enableQuic', 'enableCache', 'sslVerify'));
}

/**
 * 各大平台通用响应体转成 Axios 响应体
 *
 * 抹平差异
 *
 * @param response 通用响应体
 * @param config   Axios 请求配置
 */

function transformResponse(response, config) {
  var _ref, _response$statusCode, _ref2, _response$header;

  var status = (_ref = (_response$statusCode = response.statusCode) !== null && _response$statusCode !== void 0 ? _response$statusCode : response.status) !== null && _ref !== void 0 ? _ref : 400;
  var headers = (_ref2 = (_response$header = response.header) !== null && _response$header !== void 0 ? _response$header : response.headers) !== null && _ref2 !== void 0 ? _ref2 : {};
  var statusText = status === 200 ? 'OK' : status === 400 ? 'Bad Adapter' : '';
  return _objectSpread2({
    status: status,
    statusText: statusText,
    headers: headers,
    config: config
  }, pick(response, 'data', 'cookies', 'profile'));
}

/**
 * AxiosError 继承自 Error
 */
var AxiosErrorClass = /*#__PURE__*/function (_Error) {
  _inherits(AxiosErrorClass, _Error);

  var _super = _createSuper(AxiosErrorClass);

  /**
   * @param message  错误信息
   * @param config   Axios 请求配置
   * @param request  通用请求配置
   * @param response Axios 响应体
   */
  function AxiosErrorClass(message, config, request, response) {
    var _this;

    _classCallCheck(this, AxiosErrorClass);

    _this = _super.call(this, message);
    _this.config = config;
    _this.request = request;
    _this.response = response;
    _this.isAxiosError = true; // 修复继承系统自带类 prototype 设置失败的问题

    Object.setPrototypeOf(_assertThisInitialized(_this), AxiosErrorClass.prototype);
    return _this;
  }

  return AxiosErrorClass;
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * 创建 AxiosError 的工厂方法
 *
 * 返回一个新的 AxiosError 对象
 *
 * @param message  错误信息
 * @param config   Axios 请求配置
 * @param request  通用请求配置
 * @param response Axios 响应体
 */


function createError(message, config, request, response) {
  return new AxiosErrorClass(message, config, request, response);
}

/**
 * 请求函数
 *
 * @param config Axios 请求配置
 */

function request(config) {
  return new Promise(function dispatchAdapter(resolve, reject) {
    var adapter = config.adapter,
        cancelToken = config.cancelToken;
    var requestConfig = transformRequest(config);
    /**
     * 捕获错误
     *
     * @param message  错误信息
     * @param response Axios 响应体
     */

    function catchError(message, response) {
      if (typeof message !== 'string') {
        message = '配置不正确或者网络异常';
      }

      reject(createError(message, config, requestConfig, response));
    }

    if (adapter === void 0) {
      catchError('平台适配失败，您需要参阅文档使用自定义适配器手动适配当前平台');
      return;
    }
    /**
     * 效验状态码
     *
     * @param res 请求结果
     */


    function handleResponse(res) {
      var response = transformResponse(res, config);

      if (config.validateStatus === void 0 || config.validateStatus(response.status)) {
        resolve(response);
      } else {
        catchError("\u8BF7\u6C42\u5931\u8D25\uFF0C\u72B6\u6001\u7801\u4E3A ".concat(response.status), response);
      }
    } // 使用适配器发送请求


    var task = adapter(_objectSpread2(_objectSpread2({}, requestConfig), {}, {
      success: handleResponse,
      fail: catchError
    })); // 如果存在取消令牌
    // 则调用取消令牌里的 listener 监听用户的取消操作

    if (cancelToken !== void 0) {
      cancelToken.listener.then(function onCanceled(reason) {
        if (task !== void 0) {
          task.abort();
        }

        reject(reason);
      });
    }
  });
}

/**
 * 如果已经取消, 则抛出取消对象
 *
 * @param config Axios 请求配置
 */

function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}
/**
 * 发送请求
 *
 * @param config Axios 请求配置
 */


function dispatchRequest(config) {
  var _config$data;

  throwIfCancellationRequested(config);
  config.headers = flattenHeaders(config);
  config.data = transformData((_config$data = config.data) !== null && _config$data !== void 0 ? _config$data : {}, config.headers, config.transformRequest);

  function onResolved(response) {
    throwIfCancellationRequested(config);
    response.data = transformData(response.data, response.headers, config.transformResponse);
    return response;
  }

  function onRejected(reason) {
    var _config$errorHandler, _config$errorHandler2;

    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      if (reason.response !== void 0) {
        reason.response.data = transformData(reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return (_config$errorHandler = (_config$errorHandler2 = config.errorHandler) === null || _config$errorHandler2 === void 0 ? void 0 : _config$errorHandler2.call(config, reason)) !== null && _config$errorHandler !== void 0 ? _config$errorHandler : Promise.reject(reason);
  }

  return request(config).then(onResolved, onRejected);
}

var AxiosClass = /*#__PURE__*/function () {
  /**
   * @param defaults 自定义默认配置
   */
  function AxiosClass() {
    var defaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, AxiosClass);

    this.defaults = defaults;
    this.interceptors = {
      request: new InterceptorManagerClass(),
      response: new InterceptorManagerClass()
    };
  }

  _createClass(AxiosClass, [{
    key: "getUri",
    value: function getUri(config) {
      var _mergeConfig = mergeConfig(this.defaults, config),
          _mergeConfig$url = _mergeConfig.url,
          url = _mergeConfig$url === void 0 ? '' : _mergeConfig$url,
          params = _mergeConfig.params,
          paramsSerializer = _mergeConfig.paramsSerializer;

      return buildURL(url, params, paramsSerializer).replace(/^\?/, '');
    }
  }, {
    key: "request",
    value: function request(config) {
      var requestConfig = mergeConfig(this.defaults, config);
      var promiseRequest = Promise.resolve(requestConfig); // 执行请求拦截器

      this.interceptors.request.forEach(function executor(_ref) {
        var resolved = _ref.resolved,
            rejected = _ref.rejected;
        promiseRequest = promiseRequest.then(resolved, rejected);
      }, 'reverse'); // 发送请求

      var promiseResponse = promiseRequest.then(dispatchRequest); // 执行响应拦截器

      this.interceptors.response.forEach(function executor(_ref2) {
        var resolved = _ref2.resolved,
            rejected = _ref2.rejected;
        promiseResponse = promiseResponse.then(resolved, rejected);
      });
      return promiseResponse;
    }
  }, {
    key: "options",
    value: function options(url, config) {
      return this._requestMethodWithoutParams('options', url, void 0, config);
    }
  }, {
    key: "get",
    value: function get(url, params, config) {
      return this._requestMethodWithoutParams('get', url, params, config);
    }
  }, {
    key: "head",
    value: function head(url, params, config) {
      return this._requestMethodWithoutParams('head', url, params, config);
    }
  }, {
    key: "post",
    value: function post(url, data, config) {
      return this._requestMethodWithoutData('post', url, data, config);
    }
  }, {
    key: "put",
    value: function put(url, data, config) {
      return this._requestMethodWithoutData('put', url, data, config);
    }
  }, {
    key: "delete",
    value: function _delete(url, params, config) {
      return this._requestMethodWithoutParams('delete', url, params, config);
    }
  }, {
    key: "trace",
    value: function trace(url, config) {
      return this._requestMethodWithoutParams('trace', url, void 0, config);
    }
  }, {
    key: "connect",
    value: function connect(url, config) {
      return this._requestMethodWithoutParams('connect', url, void 0, config);
    }
    /**
     * 合并配置后发送 HTTP 请求
     *
     * @param method 请求方法
     * @param url    请求地址
     * @param params 请求参数
     * @param config 额外配置
     */

  }, {
    key: "_requestMethodWithoutParams",
    value: function _requestMethodWithoutParams(method, url, params) {
      var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return this.request(_objectSpread2(_objectSpread2({}, config), {}, {
        method: method,
        url: url,
        params: params
      }));
    }
    /**
     * 合并配置后发送 HTTP 请求
     *
     * @param method 请求方法
     * @param url    请求地址
     * @param data   请求数据
     * @param config 额外配置
     */

  }, {
    key: "_requestMethodWithoutData",
    value: function _requestMethodWithoutData(method, url, data) {
      var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return this.request(_objectSpread2(_objectSpread2({}, config), {}, {
        method: method,
        url: url,
        data: data
      }));
    }
  }]);

  return AxiosClass;
}();

var CancelTokenClass = /*#__PURE__*/function () {
  function CancelTokenClass(executor) {
    var _this = this;

    _classCallCheck(this, CancelTokenClass);

    var action;
    this.listener = new Promise(function (resolve) {
      action = function action(message) {
        // 防止重复取消
        if (_this._reason) {
          return;
        }

        _this._reason = new CancelClass(message);
        resolve(_this._reason);
      };
    });
    executor(action);
  }

  _createClass(CancelTokenClass, [{
    key: "throwIfRequested",
    value: function throwIfRequested() {
      if (this._reason) {
        throw this._reason;
      }
    }
    /**
     * 返回一个 CancelTokenSource
     *
     * CancelTokenSource.token 是一个 CancelToken 对象
     *
     * CancelTokenSource.cancel 是一个 CancelAction 函数
     *
     * 调用 CancelTokenSource.cancel('这里可以填写您的错误信息')
     *
     * 取消请求 CancelTokenSource.token
     */

  }], [{
    key: "source",
    value: function source() {
      var cancel;
      var token = new CancelTokenClass(function executor(action) {
        cancel = action;
      });
      return {
        token: token,
        cancel: cancel
      };
    }
  }]);

  return CancelTokenClass;
}();

/**
 * 自适应当前平台
 */
function adaptive() {
  var stack = [function () {
    return uni.request;
  }, function () {
    return wx.request;
  }, function () {
    return my.request;
  }, function () {
    return swan.request;
  }, function () {
    return tt.request;
  }, function () {
    return qq.request;
  }];
  var adapter;

  while (stack.length !== 0 && adapter === void 0) {
    try {
      adapter = stack.shift()();
    } catch (err) {}
  }

  return adapter;
}

var defaults = {
  /**
   * 适配器
   */
  adapter: adaptive(),

  /**
   * 请求方法
   */
  method: 'get',

  /**
   * 请求头
   */
  headers: {
    common: {
      Accept: 'application/json, test/plain, */*'
    },
    options: {},
    get: {},
    head: {},
    post: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    put: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
    },
    "delete": {},
    trace: {},
    connect: {}
  },

  /**
   * 状态码效验
   *
   * @param status 状态码
   */
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  /**
   * 超时时间
   */
  timeout: 10000,

  /**
   * 响应数据格式
   */
  dataType: 'json',

  /**
   * 响应数据类型
   */
  responseType: 'text',

  /**
   * 开启 http2
   */
  enableHttp2: false,

  /**
   * 开启 quic
   */
  enableQuic: false,

  /**
   * 开启 cache
   */
  enableCache: false,

  /**
   * 验证 ssl 证书
   */
  sslVerify: true
};

/**
 * 创建一个新的 Axios 实例
 *
 * 返回一个 Axios 实例增强
 */

function createInstance(defaults) {
  var instance = new AxiosClass(defaults);
  /**
   * 支持重载的 axios 函数
   */

  function axios(url) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // 调用方式一处理请求配置
    if (typeof url !== 'string') {
      config = url;
    } // 调用方式二处理请求配置
    else {
        config = _objectSpread2(_objectSpread2({}, config), {}, {
          url: url
        });
      }

    return instance.request(config);
  } // instance 的属性合并到 axios 函数中


  Object.assign(axios, instance); // instance 的方法合并到 axios 函数中

  Object.setPrototypeOf(axios, Object.getPrototypeOf(instance));
  return axios;
}
/**
 * Axios 实例拓展
 */


var axios = createInstance(defaults); // 添加 create 工厂方法

axios.create = function create() {
  var defaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return createInstance(mergeConfig(axios.defaults, defaults));
}; // 添加 Axios 类


axios.Axios = AxiosClass; // 添加 CancelToken 类

axios.CancelToken = CancelTokenClass; // 添加 检查错误是否来自取消请求 方法

axios.isCancel = isCancel;

module.exports = axios;

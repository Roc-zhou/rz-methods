function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}

/**
 * 判断给定值是否为空
 * @param value - 要检查的值
 * @returns boolean - 如果值为 null、undefined、空字符串、空数组或空对象则返回 true
 */
function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  if (_typeof(value) === 'object') return Object.keys(value).length === 0;
  return false;
}
/**
 * 深拷贝函数
 * @param obj - 要深拷贝的对象
 * @returns T - 深拷贝后的对象
 */
function deepClone(obj) {
  if (obj === null || _typeof(obj) !== 'object') {
    return obj;
  }
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  if (obj instanceof Array) {
    return obj.map(function (item) {
      return deepClone(item);
    });
  }
  if (obj instanceof Object) {
    return Object.fromEntries(Object.entries(obj).map(function (_a) {
      var key = _a[0],
        value = _a[1];
      return [key, deepClone(value)];
    }));
  }
  return obj;
}
/**
 * 防抖函数
 * @param fn - 需要防抖的函数
 * @param delay - 延迟时间（毫秒）
 * @returns - 防抖处理后的函数
 */
function debounce(fn, delay) {
  var timeoutId;
  return function () {
    var _this = this;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(function () {
      fn.apply(_this, args);
    }, delay);
  };
}

export { debounce, deepClone, isEmpty };
//# sourceMappingURL=index.js.map

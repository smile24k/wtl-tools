const isRule = rule => val => rule.test(val);

/**
 * 是对象
 * @param {*} val 
 */
const isObject = val =>
  typeof val === "function" || (typeof val === "object" && !!val);

/**
 * 空对象
 * @param {*} val 
 */
const isEmptyObject = val => isObject(val) && JSON.stringify(val) == "{}";
/**
 * 判断是否为 null 或 undefined
 * @param {*} val 
 */
const isEmpty = val => isNull(val) || isUndefined(val);

/**
 * 指定范围内的随机整数
 * @param {最小} min 
 * @param {最大} max 
 */
const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * 获取url参数的对象
 * @param {*} url 
 */
const getURLParameters = url =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a
    ),
    {}
  );

/**
 * 获取对象深层次数据
 * @param {*} obj 
 * @param {*} keys 
 */
const deepGet = (obj, keys) =>
  keys.reduce(
    (xs, x) => (xs && xs[x] !== null && xs[x] !== undefined ? xs[x] : null),
    obj
  );

/**
 * 防抖
 * @param {*} fn 
 * @param {*} ms 
 */
const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

/**
 * 节流
 * @param {执行函数} fn 
 * @param {等待时间} wait 
 */
const throttle = (fn, wait) => {
  let inThrottle, lastFn, lastTime;
  return function () {
    const context = this,
      args = arguments;
    if (!inThrottle) {
      fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(function () {
        if (Date.now() - lastTime >= wait) {
          fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
};

/**
 * 
 * @param {对象/数组的深拷贝} obj 
 */
const deepClone = obj => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key =>
    (clone[key] =
      typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};

/**
 * 
 * @param {yyyy-MM-dd HH:mm:ss} formater 
 * @param {时间戳} t 
 */
const dateFormater = (formater, t) => {
  let date = t ? new Date(t) : new Date(),
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  return formater.replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/DD/g, (D < 10 ? '0' : '') + D)
    .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
    .replace(/mm/g, (m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s)
}

/**
 * 文件下载
 * @param {*} filename 
 * @param {文件链接} data 
 */
const downloadFile = (filename, data) => {
  let DownloadLink = document.createElement('a');

  if (DownloadLink) {
    document.body.appendChild(DownloadLink);
    DownloadLink.style = 'display: none';
    DownloadLink.download = filename;
    DownloadLink.href = data;

    if (document.createEvent) {
      let DownloadEvt = document.createEvent('MouseEvents');

      DownloadEvt.initEvent('click', true, false);
      DownloadLink.dispatchEvent(DownloadEvt);
    }
    else if (document.createEventObject)
      DownloadLink.fireEvent('onclick');
    else if (typeof DownloadLink.onclick == 'function')
      DownloadLink.onclick();

    document.body.removeChild(DownloadLink);
  }
}

/**
 * 倒计时
 * @param {*}} ms 
 * @param {*} cb 
 */
const countDown = (ms, cb) => {
  // ms millisecond  cb callback
  const timer = setInterval(() => {
    ms--
    if (ms < 1) {
      clearInterval(timer) // 当倒计时为0时，清理定时器
      cb(true, ms) // 执行回调函数
      return
    }
    cb(false, ms)
  }, 1000)
  return timer // 返回timerID
}

/**
 * 对象过滤
 * @param {过滤对象} obj 
 * @param {对象保留属性} keys 
 */
const filterKeys = (obj, keys = []) =>
  Object.keys(obj).reduce((acc, key) => {
    if (keys.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});

const isLink = isRule(
  /((https|http|ftp|rtsp|mms)?:\/\/)(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)/
);
const isEMail = isRule(
  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
);
const isTel = isRule(/^(\+?0?86-?)?1(3|4|5|6|7|8|9)\d{9}$/)
const isIdCard = isRule(/(^\d{15}$)|(^\d{17}([0-9xX])$)/);

export {
  getURLParameters,
  isEmpty,
  randomIntegerInRange,
  deepGet,
  debounce,
  throttle,
  dateFormater,
  downloadFile,
  countDown,
  filterKeys,
  isLink,
  isEMail,
  isTel,
  isIdCard,
  isObject,
  isEmptyObject
}
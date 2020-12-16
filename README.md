# 工作中常用工具函数

### isObject

```javascript
const isObject = (val) =>
  typeof val === "function" || (typeof val === "object" && !!val);

EXAMPLES;
isObject({ name: "smile24k" }); //true
```

### isEmptyObject

```javascript
isEmptyObject = (val) => isObject(val) && JSON.stringify(val) == "{}";

EXAMPLES;
isEmptyObject({}); //true
```

### getURLParameters 获取 url 参数

```javascript
const getURLParameters = (url) =>
  (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a, v) => (
      (a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ),
    {}
  );

EXAMPLES;
getURLParameters("google.com");
// {}
getURLParameters("http://url.com/page?name=Adam&surname=Smith");
// {name: 'Adam', surname: 'Smith'}
```

### randomIntegerInRange 指定范围内的随机整数

```javascript
const randomIntegerInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
```

### deepGet 获取对象深层次数据

```javascript
const deepGet = (obj, keys) =>
  keys.reduce(
    (xs, x) => (xs && xs[x] !== null && xs[x] !== undefined ? xs[x] : null),
    obj
  );
let index = 2;
const data = {
  foo: {
    foz: [1, 2, 3],
    bar: {
      baz: ["a", "b", "c"],
    },
  },
};

EXAMPLES;
deepGet(data, ["foo", "foz", index]); // get 3
deepGet(data, ["foo", "bar", "baz", 8, "foz"]); // null
```

### debounce 防抖

```javascript
const debounce = (fn, ms = 0) => {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

EXAMPLES;
window.addEventListener(
  "resize",
  debounce(() => {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
);
```

### throttle 节流

```javascript
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

EXAMPLES;
window.addEventListener(
  "resize",
  throttle(function (evt) {
    console.log(window.innerWidth);
    console.log(window.innerHeight);
  }, 250)
);
```

### deepClone 对象/数组的深拷贝

```javascript
const deepClone = (obj) => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    (key) =>
      (clone[key] =
        typeof obj[key] === "object" ? deepClone(obj[key]) : obj[key])
  );
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};
```

### filterKeys 过滤对象字段

```javascript
const filterKeys = (obj, keys = []) =>
  Object.keys(obj).reduce((acc, key) => {
    if (keys.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});

EXAMPLES;
const obj = { name: "smile24k", age: 18, height: 180 };
filterKeys(obj, ["name"]); //{name:"smile24k"}
```

### dateFormater 时间格式化

```javascript
const downloadFile = (filename, data) => {
  let DownloadLink = document.createElement("a");

  if (DownloadLink) {
    document.body.appendChild(DownloadLink);
    DownloadLink.style = "display: none";
    DownloadLink.download = filename;
    DownloadLink.href = data;

    if (document.createEvent) {
      let DownloadEvt = document.createEvent("MouseEvents");

      DownloadEvt.initEvent("click", true, false);
      DownloadLink.dispatchEvent(DownloadEvt);
    } else if (document.createEventObject) DownloadLink.fireEvent("onclick");
    else if (typeof DownloadLink.onclick == "function") DownloadLink.onclick();

    document.body.removeChild(DownloadLink);
  }
};
```

### countDown 倒计时

```javascript
const countDown = (ms, cb) => {
  // ms millisecond  cb callback
  const timer = setInterval(() => {
    ms--;
    if (ms < 1) {
      clearInterval(timer); // 当倒计时为0时，清理定时器
      cb(true, ms); // 执行回调函数
      return;
    }
    cb(false, ms);
  }, 1000);
  return timer; // 返回timerID
};
```

### downloadFile 下载文件

```javascript
const dateFormater = (formater, t) => {
  let date = t ? new Date(t) : new Date(),
    Y = date.getFullYear() + "",
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds();
  return formater
    .replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? "0" : "") + M)
    .replace(/DD/g, (D < 10 ? "0" : "") + D)
    .replace(/HH|hh/g, (H < 10 ? "0" : "") + H)
    .replace(/mm/g, (m < 10 ? "0" : "") + m)
    .replace(/ss/g, (s < 10 ? "0" : "") + s);
};

EXAMPLES;
dateFormater("yyyy-MM-dd HH:mm:ss", new Date().getTime()); //2020-12-15 20:20:20
```

### 常用正则 isLink，isEMail，isTel，isIdCard

```javascript
const isRule = (rule) => (val) => rule.test(val);

const isLink = isRule(
  /((https|http|ftp|rtsp|mms)?:\/\/)(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)/
);
const isEMail = isRule(
  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
);
const isTel = isRule(/^(\+?0?86-?)?1(3|4|5|6|7|8|9)\d{9}$/);
const isIdCard = isRule(/(^\d{15}$)|(^\d{17}([0-9xX])$)/);
```

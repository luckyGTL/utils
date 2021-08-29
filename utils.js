"use strict";
export const getLevel = (level) => {
    return Number(level)? Math.ceil(level/5) : 1;
}

/**
 * 判断数组或对象不为空
 * */
export function isEmptyObject(obj) {
    if(!obj) return false;
    if (Object.keys(obj).length > 0) {
        return false;
    }
    return true;
}

// 判断浏览器
export const whatBrowser = () => {
    const UA = window.navigator.userAgent;
    const isAndroid = UA.indexOf('Android') > -1 || UA.indexOf('Adr') > -1; // android终端
    const isiOS = !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    const isWeiXin = UA.indexOf('MicroMessenger') > -1;
    const isIosQQ = (isiOS && /QQ/i.test(UA));
    const isAndroidQQ = (isAndroid && /MQQBrowser/i.test(UA) && /QQ/i.test(UA));
    const isQQApp = isIosQQ || isAndroidQQ;
    const isPc = !isAndroid && !isiOS;

    return {
        isAndroid,
        isiOS,
        isWeiXin,
        isQQApp,
        isIosQQ,
        isAndroidQQ,
        isPc,
    };
};

// 防抖函数
export const debounce = (func, delay) => {
    let timer;
    return function (...args) {
        if(timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            func.apply(this, args);
            clearTimeout(timer);
        }, delay);
    };
};

// 去掉字符串空格
export const trim =(str)=>{
    return str.replace(/\s*/g,"");
}

// utf8_to_b64
// export const utf8_to_b64 =(str)=>{
//     return window.btoa(unescape(encodeURIComponent( str )));
// }

/**
 * 随机色
 * */
export function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const color = `#${(Array(6).join(0) + (r.toString(16) + g.toString(16) + b.toString(16))).slice(-6)}`;
    return color;
}

// 打乱数组
export function shuffle(arr) {
    let i = arr.length;
    while (i) {
        const j = Math.floor(Math.random() * i--);
        [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
}

/**
 * 判断数组内元素是否相同
 * */
export function isAllEqual(array) {
    if (array.length > 0) {
        return !array.some(value => value !== array[0]);
    }
    return true;
}

// 秒数 转成 时：分：秒
export function formatSeconds(value) {
    let theTime = parseInt(value, 10);// 秒
    let middle = 0;// 分
    let hour = 0;// 小时

    if (theTime > 60) {
        middle = parseInt(theTime / 60, 10);
        theTime = parseInt(theTime % 60, 10);
        if (middle > 60) {
            hour = parseInt(middle / 60, 10);
            middle = parseInt(middle % 60, 10);
        }
    }
    let result = `${parseInt(theTime, 10)}秒`;
    if (middle > 0) {
        result = `${parseInt(middle, 10)}分${result}`;
    }
    if (hour > 0) {
        result = `${parseInt(hour, 10)}小时${result}`;
    }
    return result;
}

// 毫秒数 转成 年-月-日 时：分：秒
export function getDateStr(seconds){
    if(!+seconds) return '';
    const date = new Date(seconds)
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    const minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    // var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    const currentTime = year + "-" + month + "-" + day + "  " + hour + ":" + minute ;// + ":" + second
    return currentTime
}

/**
 * 科学计数，超过10w转成 +w
 *
 * */
export function getECount(number,n=1){
    if(+number<100000){
        return number;
    }else{
        return number = (number/10000).toFixed(n)+'w';
    }
    
}

/**
 * 手机号中间四位处理成*
 *
 * */
export const formatTelephone= (phone)=>{
    return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

export function formatNum(num) {
    if (num>=0 && num<10) {
        return '0' + num;
    } else if (num>=10) {
        return num;
    }
}

/**
 * 折扣率
 *
 * */
export function getCutPercent(primePrice, salePrice) {
    if (primePrice === 0) {
        return '0%';
    }
    let cutPercent = (primePrice - salePrice) / primePrice * 100;
    cutPercent = Math.round(cutPercent) + '%';
    return cutPercent;
}

/**
 * 页面打开
 * @param {*} url 前向页面地址
 * @param {*} name 页面名称
 */
export const pageViewIn = (url, name) => {
    ST.webTJ.pageviewstart({
        referrer_url: url,
        page_name: name
    })
}

/**
 * 页面关闭
 * @param {*} url 前向页面地址
 * @param {*} name 页面名称
 */
export const pageViewOut = (url, name) => {
    ST.webTJ.pageviewend({
        referrer_url: url,
        page_name: name
    });
}

/**
 * 获取url?后的参数
 * @param {*} variable 参数名
 * @returns 参数值
 */
 export const getQueryVariable = variable => {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=")
        if (pair[0] === variable) return pair[1]
    }
    return(false);
}

// 封装setState 避免回调地狱
export const setStateP = (_this, obj) => {
    return new Promise(resolve => {
        _this.setState(obj, () => resolve())
    })
}

// 数组去重 思路：获取没重复的最右一值放入新数组
export function uniqueArr(array){
    const r = [];
    for (let i = 0, l = array.length; i < l; i++) {
        for (let j = i + 1; j < l; j++)
            if (array[i] === array[j]) j = ++i;
        r.push(array[i]);
    }
    return r;
}

// 兼容ie 获取origin
export const getOrigin = () => {
    let origin = ''
    if (!window.location.origin) {
        origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    } else {
        origin = window.location.origin;
    }
    return origin
}

// 获取用户信息
export const getUserData = () => {
    return JSON.parse(localStorage.getItem('userData'))
}

// 渠道号cid处理
export const upDateCid = () => {
    const cid = getQueryVariable('cid')
    cid && localStorage.setItem('cid', cid)
}


// 区分普通字符串和JSON字符串
export const isJsonStr = str => {
    try {
        if (typeof JSON.parse(str) === "object") {
            return true;
        }
    } catch(e) {
        return false
    }
}
// 兼容ie8 Object.assign
export const objMerge = (data, source) => {
    for (const key in source) {
        data[key] = source[key];
    }
    return data;
}
// 阻止冒泡 兼容ie8 
export const stopBubble=(event)=> { // 封装兼容性良好的‘阻止冒泡’
    if (event.stopPropagation) {
        event.stopPropagation()  // IE9以下不兼容
    } else {  //  兼容IE
        event.cancelBubble = true;
    }
}

// 阻止默认行为 兼容ie8
export const stopDefaultHandle=(event)=> { 
    if (event.preventDefault) {
        event.preventDefault()  // 非ie
    } else {  //  兼容IE
        event.returnValue = false;
    }
}
// getCookie
export function getCookie(cname)
{
  const name = cname + "=";
  const ca = document.cookie.split(';');
  for(let i=0; i<ca.length; i++) 
  {
    const c = ca[i].trim();
    if (c.indexOf(name)===0) return c.substring(name.length,c.length);
  }
  return "";
}
/**
 * 数组对象去重
 * @arr 目标数组对象
 * @attr 属性
 * */
export function removeRepeat(arr, attr) {
    const result = {};
    const reSet = [];
    const s = arr.map(v => v[attr]);
    // eslint-disable-next-line no-restricted-syntax
    for (const i in s) {
        if (result[s[i]] === undefined) {
            result[s[i]] = i;
        } else {
            reSet.push(i);
        }
    }
    // eslint-disable-next-line
    for (const key in reSet) {
        arr.splice(reSet[key] - key, 1);
    }
    return arr;
}
// 去除空格
export function removeEmpty(val){
    return val.replace(/(^\s*)|(\s*$)/g, "");
}
  
export function eraseCookie(...name): any {
  name.forEach(e => {
    document.cookie = e + '=123;max-age=0;';
  });
}
export function getObjectCookie(cname): any {
  const cookie = getCookie(cname);
  return cookie ? JSON.parse(cookie) : undefined;
}
export function getCookie(cname): string {
  const name = cname + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export const isObjectEmpty = (obj) => {
  const flag = true;
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return !flag;
    }
  }
  return flag;
};

export const getAllUrlParams = (urlParams: string): any => {

  let queryString = urlParams ? urlParams : window.location.search.slice(1);

  let obj = {};

  if (queryString) {

    queryString = queryString.split('#')[0];

    let arr = queryString.split('&');

    for (let i = 0; i < arr.length; i++) {
      let a = arr[i].split('=');

      let paramName = a[0];
      let paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      if (paramName.match(/\[(\d+)?\]$/)) {

        let key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        if (paramName.match(/\[\d+\]$/)) {
          let index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          obj[key].push(paramValue);
        }
      } else {
        if (!obj[paramName]) {
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}
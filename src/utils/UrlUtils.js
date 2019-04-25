export const encodeUrlData = (data) => {
  let res = '';
  Object.keys(data).forEach(function (key) {
    res += '&';
    res += key;
    res += '=';
    res += data[key]
  });
  return res.substring(1);
};

export const setUrlParams = (url, data) => {
  let res = url;
  let params = url.match(/:\w+/g);
  if (!params || !data) {
    return res;
  }
  params.forEach((param) => {
    const paramName = param.substring(1);
    const targetValue = data[paramName];
    if (targetValue instanceof String && targetValue.replace(/(^s*)|(s*$)/g, "").length < 1) {
      throw new Error(`The param value can't be empty`);
    }
    res = res.replace(param, targetValue);
  });
  return res;
};

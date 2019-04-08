export default class UrlDataEncoder {
  static encode(data) {
    let res = '';
    Object.keys(data).forEach(function (key) {
      res += '&';
      res += key;
      res += '=';
      res += data[key]
    });
    return res.slice(1,res.length);
  }
}
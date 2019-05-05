import * as Strings from './StringUtils'
import * as Arrays from './ArrayUtils'

const decimalBases = ['十', '百', '千', '万', '亿'];
const decimalBasesTraditional = ['十', '百', '千', '萬', '億'];
const decimalBases1 = ['十', '百', '千', '亿'];
const decimalBases1Traditional = ['十', '百', '千', '億'];
export const cnDigits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
export const cnDigitsTraditonal = ['零', '壹', '二', '三', '四', '五', '六', '七', '八', '九'];
export const cnDigitsUppercase = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
export const natureNumToChinese = (number) => {
  if (!Number.isInteger(number) || number < 0) {
    throw new Error(`Illegal argument,${number} is not a natural number`)
  }
  let res = '', pos = 0, isYi = false;
  while (number > 0) {
    const digit = number % 10;
    res += cnDigits[digit];
    if (isYi) {
      res += decimalBases1[pos];
    } else {
      res += decimalBases[pos];
    }
    number = Math.floor(number / 10);
    pos++;
    if (pos > 3) {
      pos %= 4;
      isYi = !isYi;
    }
  }
  // 去掉末尾的零和万，以及'零十'、'零百'、'零千'、等
  let chars = Strings.toCharArray(res);
  chars = chars.reverse();
  const len = chars.length;
  const zero = cnDigits[0];
  for (let i = 1; i < len; i++) {
    const value = chars[i];
    if (chars[i - 1] === zero
      && (Arrays.contains(decimalBases, value) || value === zero)) {
      chars[i - 1] = '';
      chars[i] = zero;
    }
  }
  chars[0] = ''; //开头的万
  if (chars[len - 1] === zero) {
    chars[len - 1] = '';// 末尾的零
  }
  return chars.join('');
};
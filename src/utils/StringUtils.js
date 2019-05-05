export const toCharArray = (string) => {
  if ('string' !== typeof string) {
    throw new Error(`Illegal argument,${string} is not string`)
  }
  return string.split('');
};

export const arrayToString = (arr) => {
  if (!arr instanceof Array) {
    throw new Error(`Illegal argument,${arr} is not array`)
  }
  return arr.join('');
};

export const reverse = (string) => {
  if ('string' !== typeof string) {
    throw new Error(`Illegal argument,${string} is not string`)
  }
  return string.split('').reverse().join('');
};

export const delElem = (array, elem) => {
  const index = array.indexOf(elem);
  if (index > -1) {
    array.splice(index, 1);
  }
};

export const delElemByUniqueKey = (array, key, value) => {
  let index = -1;
  for (let i = 0; i < array.length; i++) {
    if (array[key] === value) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    array.splice(index, 1);
  }
};

export const removeDuplicateItems = arr => [...new Set(arr)];

export const arrayOfObjProps = (object) => {
  let res = [];
  Object.keys(object).forEach(key => {
    res.push(object[key]);
  });
  return res;
};
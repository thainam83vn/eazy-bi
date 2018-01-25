export class Helper {
  static merge(...arr) {
    var o = {};
    for (let obj of arr) {
      for (let x in obj) {
        o[x] = obj[x];
      }
    }
    return o;
  }

  static asArray(obj): [] {
    let r = [];
    for (let k in obj) {
      r.push(obj[k]);
    }
    return r;
  }
  static asArrayWithKey(obj, keyField, valueField) {
    let r = [];
    for (let k in obj) {
      r.push({ [keyField]: k, [valueField]: obj[k] });
    }
    return r;
  }
  static remove(array, value) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === value) {
        array.slice(i, 1);
      }
    }
  }
  static predict(arr, predict) {
    let r = [];
    for (let o of arr) {
      if (predict(o)) r.push(o);
    }
    return r;
  }
}

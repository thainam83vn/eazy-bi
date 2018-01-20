export class ObjectHelper {
  static merge(arr){
    let r = {};
    for(let a of arr){
      for(let key in a){
        r[key] = a[key]
      }
    }
    return r;
  }
}
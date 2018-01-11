export class Helper {
  static merge(...arr){
    var o = {};
    for(let obj of arr){
      for (let x in obj) {
        o[x] = obj[x];
      }
    }
    return o;
  }
}
export class ArrayHelper {
    static merge(...arrays){
      let r = [];
      for(let array of arrays){
        for(let obj of array){
          r.push(obj);
        }
      }
      return r;
    }
  }
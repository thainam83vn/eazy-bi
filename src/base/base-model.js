export class BaseModel {
  constructor(props){
    for(let k in props){
      this[k] = props[k];
    }
  }
}
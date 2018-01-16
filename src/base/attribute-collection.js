import {EventEmitter} from './event-emitter';

export class AttributeCollection{
  onChange:EventEmitter = new EventEmitter();
  attributes:any = {};
  add(name, initValue, editor){
    this.attributes[name] = {
      name: name,
      initValue: initValue,
      value: initValue,
      editor: editor
    }
    this.onChange.emit(this);
  }
  update(name, value){
    let attr = this.attributes[name];
    if (attr){
      attr.value = value;
    }
    this.onChange.emit(this);    
  }
  updateMany(pairs) {
    for(let key in pairs){
      this.attributes[key] = pairs[key];
    }
    this.onChange.emit(this);
  }
  remove(name) {
    delete this.attributes[name];
    this.onChange.emit(this);
  }
  output(){
    let r = {};
    for (let k in this.attributes){
      r[k] = this.attributes[k].value;
    }
    return r;
  }
}
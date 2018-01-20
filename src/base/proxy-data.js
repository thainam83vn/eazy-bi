import {EventEmitter} from './event-emitter';
export class ProxyData {
  onChange: EventEmitter = new EventEmitter();
  data: any;  
  constructor(data){
    this.data = data;
    if (this.data)
      this.data.proxy = this;
  }

  update(d){
    this.data = d;
    this.onChange.emit(this.data);
  }

  setState(pairs){
    for(let k in pairs){
      this.data[k] = pairs[k]
    }
    this.onChange.emit(this.data);    
  }
}
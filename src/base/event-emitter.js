export class EventEmitter{
  listeners = [];
  subcribe(handle){
    this.listeners.push(handle);
  }
  emit(data){
    for(let listener of this.listeners){
      listener(data);
    }
  }
}
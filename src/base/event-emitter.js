export class EventEmitter {
  nextId = 0;
  listeners = {};
  subcribe(handle) {
    this.listeners[this.nextId] = handle;
    let id = this.nextId;
    this.nextId++;
    return id;
  }
  unsubcribe(id) {
    delete this.listeners[id];
  }
  emit(data) {
    for (let id in this.listeners) {
      this.listeners[id](data);
    }
  }
}
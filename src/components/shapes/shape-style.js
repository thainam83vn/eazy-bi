export class ShapeStyleCollection{
  styles:any = {};
  add(name, initValue, editor){
    this.styles[name] = {
      name: name,
      initValue: initValue,
      value: initValue,
      editor: editor
    }
  }
  update(name, value){
    let style = this.styles[name];
    if (style){
      style.value = value;
    }
  }
  output(){
    let r = {};
    for(let k in this.styles){
      r[k] = this.styles[k].value;
    }
    return r;
  }
}
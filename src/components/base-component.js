import React from "react";

export class BaseComponent extends React.Component {
  isLoading = false;
  constructor(props){
    super(props);
    if (this.props.onInit)
      this.props.onInit(this);
  }

  ovrInitChild(name, child){
    this[name] = child;
  }

  ovrLoadComponent(){
    return <div>Loading...</div>;
  }

  changeState(p){
    this.setState((prev, props)=>{

    });
  }

  loading(v, callback){
    this.isLoading = v;
    this.forceUpdate(()=>{
      setTimeout(()=>{
        if (callback) callback();
      },50);
    });
  }
}
import React from "react";
import uuidv1 from 'uuid/v1';

export class BaseComponent extends React.Component {
  uuid = null;
  isLoading = false;
  constructor(props){
    super(props);
    this.uuid = uuidv1();
    console.log("Component " + this.uuid);
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
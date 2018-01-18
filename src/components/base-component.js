import React from "react";

export class BaseComponent extends React.Component {
  constructor(props){
    super(props);
    if (this.props.onInit)
      this.props.onInit(this);
  }

  ovrInitChild(name, child){
    this[name] = child;
  }

  changeState(p){
    this.setState((prev, props)=>{

    });
  }
}
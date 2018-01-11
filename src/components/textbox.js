import React from 'react';
import {Shape} from './shape';

export class TextBox extends Shape{
  constructor(props) {
    super(props);
  }
  ovrInner() {
    return (
      <span>{this.props.text}</span>
    );
  }  
  ovrExtraStyle(){
    return {
      display:"flex",
    };
  }
}
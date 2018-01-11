import React from 'react';
import {Shape} from './shape';
const styles={
  text:{
    userSelect:"none"
  }
}
export class TextBox extends Shape{
  constructor(props) {
    super(props);
  }
  ovrInner() {
    return (
      <span style={styles.text}>{this.props.text}</span>
    );
  }  
  ovrExtraStyle(){
    return {
      display:"flex",
    };
  }
}
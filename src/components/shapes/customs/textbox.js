import React from 'react';
import {Shape} from './../shape';
const styles={
  text:{
    userSelect:"none"
  }
}
export class TextBox extends Shape{
  constructor(props) {
    super(props);
  }
  ovrDeclareStyle() {
    super.ovrDeclareStyle();
    this.styleCollection.add('display', 'flex', null);
  }
  ovrInner() {
    return (
      <span style={styles.text}>{this.props.text}</span>
    );
  }  
}
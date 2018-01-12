import React from 'react';
import { Shape } from './../shape';

export class Circle extends Shape{  
  constructor(props){
    super(props);
  }

  ovrDeclareStyle() {
    super.ovrDeclareStyle();
    this.styleCollection.add('borderRadius', '50%', null);
  }
}
import React from 'react';
import { Shape } from './shape';

const styles={
  circle:{
    borderRadius:"50%"
  }
}

export class Circle extends Shape{  
  constructor(props){
    super(props);
  }

  ovrExtraStyle() {
    return {
      borderRadius: "50%"
    };
  }

}
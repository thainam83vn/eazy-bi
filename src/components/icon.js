import React from 'react';
import { Shape } from './shape';

export class Icon extends Shape {
  constructor(props) {
    super(props);
  }
  ovrInner() {
    return (
      <i class="material-icons">alarm_add</i>
    );
  }
}
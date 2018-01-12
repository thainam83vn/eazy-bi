import React from 'react';
import { CanvasShape } from './../canvas-shape';
import { CanvasApi} from './../../../lib/canvas-api';
export class Line extends CanvasShape {
  constructor(props){
    super(props);
    // this.dots = [true, false, true, false];
  }
  ovrDraw(ctx) {
    super.ovrDraw(ctx);
    let w = this.state.style.width;
    let h = this.state.style.height;
    CanvasApi.line({ ctx: ctx, x: 0, y: 0, width: w, height: h });
  }
}

import React from "react";
import { DrawCanvasShape } from "./../draw-canvas-shape";
import { CanvasApi } from "./../../../lib/canvas-api";

export class Triangle extends DrawCanvasShape {
  ovrDraw(ctx) {
    super.ovrDraw(ctx);
    let w = this.state.style.width;
    let h = this.state.style.height;
    let lines = [
      { x: 0, y: h, width: w / 2, height: 0 },
      { x: w, y: h, width: w / 2, height: 0 },
      { x: 0, y: h, width: w, height: h }
    ];
    CanvasApi.multiLine({
      ctx: ctx,
      lines: lines
    });
  }
}

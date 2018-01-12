import React from "react";
import { DrawCanvasShape } from "./../draw-canvas-shape";
import { CanvasApi } from "./../../../lib/canvas-api";

export class Rectangle extends DrawCanvasShape {
  ovrDraw(ctx) {
    super.ovrDraw(ctx);
    let w = this.state.style.width;
    let h = this.state.style.height;
    let lines = [
      { x: 0, y: 0, width: w, height: 0 },
      { x: 0, y: h, width: w, height: h },
      { x: 0, y: 0, width: 0, height: h },
      { x: w, y: 0, width: w, height: h }
    ];
    CanvasApi.multiLine({
      ctx: ctx,
      lines: lines
    });
  }
}

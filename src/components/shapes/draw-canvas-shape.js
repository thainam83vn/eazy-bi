import React from "react";
import { CanvasShape } from "./canvas-shape";

export class DrawCanvasShape extends CanvasShape {
  ovrDraw(ctx) {
    super.ovrDraw(ctx);
    ctx.strokeStyle = this.state.style.strokeColor;
    ctx.lineWidth = this.state.style.strokeWidth;
  }

  ovrDeclareStyle() {
    super.ovrDeclareStyle();
    this.styleCollection.add(
      "strokeColor",
      this.props.data.strokeColor,
      "TextBox"
    );
    this.styleCollection.add(
      "strokeWidth",
      this.props.data.strokeWidth,
      "TextBox"
    );
  }
}

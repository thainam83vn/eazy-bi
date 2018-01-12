import React from 'react';
import { CanvasApi } from './../../lib/canvas-api';
import { Shape } from './shape';
import { Canvas } from './../canvas/canvas';

const styles = {
  main: {
    position: "absolute",
    top: 0,
    left: 0
  }
}

export class CanvasShape extends Shape {
  constructor(props) {
    super(props);
  }

  ovrDeclareStyle() {
    super.ovrDeclareStyle();
    this.styleCollection.add(
      "background",
      this.props.data.background,
      null
    );
  }

  ovrDraw(ctx) {
    ctx.clearRect(0, 0, this.props.data.width, this.props.data.height);
  }

  ovrInner() {
    return (
      <Canvas style={styles.main} width={this.state.style.width} height={this.state.style.height} onDraw={this.ovrDraw.bind(this)} />
    );
  }
}
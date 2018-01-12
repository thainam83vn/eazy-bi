import React from 'react';
import {CanvasApi} from './../../lib/canvas-api';
// function rect(props) {
//   const { ctx, x, y, width, height } = props;
//   ctx.fillRect(x, y, width, height);
// }

// function line(props) {
//   const { ctx, x, y, width, height } = props;
//   ctx.beginPath();
//   ctx.moveTo(x, y);
//   ctx.lineTo(width, height);
//   ctx.stroke();
// }

const styles = {
  main: {
    position: "absolute",
  }
}

export class Canvas extends React.Component {
  style : any;
  constructor(props){
    super(props);
  }
  componentDidMount() {
    this.updateCanvas();
  }
  componentDidUpdate() {
    this.updateCanvas();
  }
  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    if (this.props.onDraw) this.props.onDraw(ctx);
  }
  render() {
    return (
      <canvas ref="canvas" style={styles.main} width={this.props.width} height={this.props.height} />
    );
  }
}
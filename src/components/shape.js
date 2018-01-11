import React from "react";
import { Helper } from "../lib/Helper";

const styles = {
  selected: {
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  selectedDot: {
    position: "absolute",
    width: 5,
    height: 5,
    background: "#3d3d3d"
  },
  dot1: {
    top: -5,
    left: -5
  },
  dot2: {
    top: -5,
    left: "100%"
  },
  dot3: {
    top: "100%",
    left: "100%"
  },
  dot4: {
    top: "100%",
    left: -5
  }
};

export class Shape extends React.Component {
  staticStyle = {};
  target: any = null;

  isResizing = false;
  resizeCornor = 0;

  constructor(props) {
    super(props);
    this.staticStyle = {
      cursor: "default",
      background: this.props.data.color,
      width: this.props.data.width,
      height: this.props.data.height,
      position: "absolute"
    };
    if (this.ovrExtraStyle()) {
      let extra = this.ovrExtraStyle();
      for (let x in extra) {
        this.staticStyle[x] = extra[x];
      }
    }

    let style = {};
    for (let x in this.staticStyle) {
      style[x] = this.staticStyle[x];
    }
    style.top = this.props.data.y;
    style.left = this.props.data.x;
    this.state = {
      isSelected: this.props.data.selected ? this.props.data.selected : false,
      isMouseDown: false,
      mousedownX: 0,
      mousedownY: 0,
      style: style
    };
    if (this.props.onInit) this.props.onInit(this);
  }

  ovrExtraStyle() {
    return null;
  }

  ovrInner() {
    return null;
  }

  select(v) {
    this.setState({ isSelected: v });
  }

  undrag() {
    this.setState({ isMouseDown: false });
  }

  mousedown(e) {
    let nave = e.nativeEvent;
    this.target = nave.target;
    this.setState({
      isMouseDown: true,
      mousedownX: nave.offsetX,
      mousedownY: nave.offsetY
    });
    if (this.props.onDrag) this.props.onDrag(this);
  }
  mouseup(e) {
    this.setState({ isMouseDown: false });
    if (this.props.onDrop) this.props.onDrop(this);
  }
  updateStyle(x, y, w, h) {
    let style = {};
    for (let x in this.staticStyle) {
      style[x] = this.staticStyle[x];
    }
    style.left = x;
    style.top = y;
    style.width = w;
    style.height = h;
    this.setState({
      style: style
    });
  }
  mousemove(e) {
    if (this.state.isMouseDown) {
      let nave = e.nativeEvent;
      let delX = nave.offsetX - this.state.mousedownX;
      let delY = nave.offsetY - this.state.mousedownY;
      this.updateStyle(
        this.state.style.left + delX,
        this.state.style.top + delY,
        this.state.style.width,
        this.state.style.height
      );
    }
  }
  mousedownOutside(e) {
    let nave = e.nativeEvent;
    this.select(nave.target === this.target);
  }
  mousemoveOutside(e) {
    let nave = e.nativeEvent;

    if (!this.isResizing) {
      if (this.state.isMouseDown) {
        if (nave.target !== this.target) {
          this.updateStyle(
            nave.clientX - this.state.style.width / 2,
            nave.clientY - this.state.style.height / 2,
            this.state.style.width,
            this.state.style.height
          );
        }
      }
    } else {
      let x1 = this.state.style.left;
      let y1 = this.state.style.top;
      let x2 = x1 + this.state.style.width;
      let y2 = y1 + this.state.style.height;
      if (this.resizeCornor === 1) {
        x1 = nave.clientX;
        y1 = nave.clientY;
        if (x1 > x2) {
          x1 = x2;
        }
        if (y1 > y2) {
          y1 = y2;
        }
      }
      if (this.resizeCornor === 2) {
        x2 = nave.clientX;
        y1 = nave.clientY;
        if (x2 < x1) {
          x2 = x1;
        }
        if (y1 > y2) {
          y1 = y2;
        }
      }
      if (this.resizeCornor === 3) {
        x2 = nave.clientX;
        y2 = nave.clientY;
        if (x2 < x1) {
          x2 = x1;
        }
        if (y2 < y1) {
          y2 = y1;
        }
      }   
      if (this.resizeCornor === 4) {
        x1 = nave.clientX;
        y2 = nave.clientY;
        if (x1 > x2) {
          x1 = x2;
        }
        if (y2 < y1) {
          y2 = y1;
        }
      }         

      this.updateStyle(x1, y1, x2 - x1, y2 - y1);
    }
  }

  mouseupOutside(e) {
    this.setState({ isMouseDown: false });
    this.isResizing = false;
    this.resizeCornor = 0;

    let nave = e.nativeEvent;
    // this.select(nave.target === this.target);
  }

  startResize(i) {
    this.isResizing = true;
    this.resizeCornor = i;
    console.log("start resize", this.resizeCornor);
  }

  render() {
    return (
      <div
        style={this.state.style}
        onMouseDown={this.mousedown.bind(this)}
        onMouseUp={this.mouseup.bind(this)}
        onMouseMove={this.mousemove.bind(this)}
      >
        {this.ovrInner()}
        {this.state.isSelected && (
          <div style={styles.selected}>
            <div
              style={Helper.merge(styles.selectedDot, styles.dot1)}
              onMouseDown={()=>this.startResize(1)}
            />
            <div
              style={Helper.merge(styles.selectedDot, styles.dot2)}
              onMouseDown={() =>this.startResize(2)}
            />
            <div
              style={Helper.merge(styles.selectedDot, styles.dot3)}
              onMouseDown={() =>this.startResize(3)}
            />
            <div
              style={Helper.merge(styles.selectedDot, styles.dot4)}
              onMouseDown={() =>this.startResize(4)}
            />
          </div>
        )}
      </div>
    );
  }
}

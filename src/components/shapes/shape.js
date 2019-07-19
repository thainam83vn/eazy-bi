import React from "react";
import { BaseComponent } from "./../base-component";

import { Helper } from "../../lib/Helper";
import { ShapeStyleCollection } from "./shape-style";
import { DomHelper } from "../../base/dom-helper";

export class Shape extends BaseComponent {
  shapeId = null;
  shapeType = null;
  inner = null;

  dots = [true, true, true, true];
  styleCollection: ShapeStyleCollection = new ShapeStyleCollection();
  target: any = null;

  isResizing = false;
  resizeCornor = 0;
  mousedownX = 0;
  mousedownY = 0;
  isMouseDown = false;

  ovrDeclareStyle() {
    this.styleCollection.add("cursor", "default", null);
    this.styleCollection.add("position", "absolute", null);

    this.styleCollection.add("width", this.props.data.style.width, null);
    this.styleCollection.add("height", this.props.data.style.height, null);
    this.styleCollection.add("top", this.props.data.style.top, null);
    this.styleCollection.add("left", this.props.data.style.left, null);

    this.styleCollection.add("color", this.props.data.style.color, "TextBox");
    this.styleCollection.add(
      "background",
      this.props.data.style.background,
      "TextBox"
    );
    this.styleCollection.add("border", this.props.data.style.border, "TextBox");
  }

  constructor(props) {
    super(props);
    this.shapeType = this.props.data.type;
    this.shapeId = this.props.data.id;
    this.ovrDeclareStyle();

    this.state = {
      isSelected: this.props.data.selected ? this.props.data.selected : false,
      style: this.styleCollection.output()
    };
  }

  data() {
    let style = this.styleCollection.output();
    return {
      id: this.shapeId,
      type: this.shapeType,
      style: style
    };
  }

  isSelected() {
    return this.state.isSelected;
  }

  ovrExtraStyle() {
    return null;
  }

  ovrInner() {
    return null;
  }

  ovrDestroy() {
    if (this.chartView && this.chartView.ovrDestroy)
      this.chartView.ovrDestroy();
  }

  ovrRectChanged() {
    if (this.props.onRectChange) this.props.onRectChange(this);
  }

  ovrAdjustResize(x1, y1, x2, y2) {
    if (this.resizeCornor === 1) {
      if (x1 > x2 - 1) {
        console.log("cornor 1x",x1,x2);        
        x1 = x2 - 1;
      }
      if (y1 > y2 - 1) {
        console.log("cornor 1y",y1,y2);                
        y1 = y2 - 1;
      }
    }
    if (this.resizeCornor === 2) {
      if (x2 < x1 + 1) {
        console.log("cornor 2x",x1,x2);        
        x2 = x1 + 1;
      }
      if (y1 > y2 - 1) {
        console.log("cornor 2y",y1,y2);                
        y1 = y2 - 1;
      }
    }
    if (this.resizeCornor === 3) {
      if (x2 < x1 + 1) {
        console.log("cornor 3x",x1,x2);
        x2 = x1 + 1;
      }
      if (y2 < y1 + 1) {
        console.log("cornor 3y",y1,y2);
        y2 = y1 + 1;
      }
    }
    if (this.resizeCornor === 4) {
      if (x1 > x2) {
        x1 = x2 - 1;
      }
      if (y2 < y1) {
        console.log("cornor 4y",y1,y2);        
        y2 = y1 + 1;
      }
    }

    // if (this.resizeCornor === 1){
    //   if (x1 > x2){
    //     this.resizeCornor = 1;
    //   }
    //   if (y1 > y2) {
    //     this.resizeCornor = 4;
    //   }
    // }
    this.updateRect(
      Math.min(x1, x2),
      Math.min(y1, y2),
      Math.abs(x1 - x2),
      Math.abs(y1 - y2)
    );
  }

  updateStyleValue(name, value) {
    this.styleCollection.update(name, value);
    console.log("shape updateStyleValue", name, value, this.styleCollection);
    
  }

  refreshStyle() {
    this.setState({
      style: this.styleCollection.output()
    });
  }

  select(v) {
    if (this.state.isSelected !== v) {
      this.setState({ isSelected: v });
      if (v) {
        if (this.props.onSelected) this.props.onSelected(this);
      }
    }
  }

  undrag() {
    this.isMouseDown = false;
  }

  mousedown(e) {
    let nave = e.nativeEvent;
    // console.log("mousedown", nave, nave.target, nave.target.className);
    let className = nave.target.className + "";
    if (className.indexOf("no-mousedown") < 0) {
      this.target = nave.target;
      this.isMouseDown = true;

      this.mousedownX = nave.layerX;
      this.mousedownY = nave.layerY;
      if (this.props.onDrag) this.props.onDrag(this);
    }
  }
  mousemove(e) {
    if (this.isMouseDown) {
      let nave = e.nativeEvent;
      let delX = nave.layerX - this.mousedownX;
      let delY = nave.layerY - this.mousedownY;
      // console.log(`mousemove:(${nave.offsetX}, ${nave.offsetY})`, nave)
      this.updateRect(
        this.state.style.left + delX,
        this.state.style.top + delY,
        this.state.style.width,
        this.state.style.height
      );
    }
  }

  mouseup(e) {
    this.isMouseDown = false;
    if (this.props.onDrop) this.props.onDrop(this);
  }

  updateRect(x, y, w, h) {
    // if (
    //   Math.abs(x - this.state.style.left <= 1) &&
    //   Math.abs(y - this.state.style.top) <= 1 &&
    //   Math.abs(w - this.state.style.width) <= 1 &&
    //   Math.abs(h - this.state.style.height) <= 1 
    // )
    //   return;

    if (w <= 0) w = 2;
    if (h <= 0) h = 2;
    console.log("updateRect:", x, y, w, h);    
    this.updateStyleValue("left", x);
    this.updateStyleValue("top", y);
    this.updateStyleValue("width", w);
    this.updateStyleValue("height", h);
    this.refreshStyle();
    this.ovrRectChanged();
  }
  updateStyle(pairs) {
    for (let k in pairs) {
      this.styleCollection.update(k, pairs[k]);
    }
    this.refreshStyle();
  }

  mousedownOutside(e) {
    let nave = e.nativeEvent;
    this.select(nave.target === this.target);
  }
  mousemoveOutside(e) {
    let nave = e.nativeEvent;
    let className = nave.target.className + "";

    let dotX = 0;
    let dotY = 0;
    // if (className.indexOf("dot1") >= 0){
    //   console.log("dot1", nave.layerX, nave.layerY);
    //   dotX = 0;
    //   dotY = 0;
    // } 
    // if (className.indexOf("dot2") >= 0){
    //   console.log("dot2", nave.layerX, nave.layerY);
    //   dotX = this.state.style.width;
    //   dotY = 0;
    // } 
    // if (className.indexOf("dot3") >= 0){
    //   console.log("dot3", nave.layerX, nave.layerY);
    //   dotX = this.state.style.width;
    //   dotY = this.state.style.height;
    // } 
    // if (className.indexOf("dot4") >= 0){
    //   console.log("dot4", nave.layerX, nave.layerY);
    //   dotX = 0;
    //   dotY = this.state.style.height;      
    // } 

    if (!this.isResizing) {
      if (this.isMouseDown) {
        if (!DomHelper.contains(this.target, nave.target)) {
          let newx = nave.offsetX - this.mousedownX;
          let newy = nave.offsetY - this.mousedownY;
          this.updateRect(
            newx,
            newy,
            this.state.style.width,
            this.state.style.height
          );
        }
      }
    } else {
      // console.log("mousemoveOutside", nave);

      let nx = 0;
      let ny = 0;
      let outside = !DomHelper.contains(this.target, nave.target);
      if (outside) {
        nx = nave.layerX;
        ny = nave.layerY;
      } else {
        nx = this.state.style.left + nave.layerX + dotX;
        ny = this.state.style.top + nave.layerY + dotY;
      }
      let x1 = this.state.style.left;
      let y1 = this.state.style.top;
      let x2 = x1 + this.state.style.width;
      let y2 = y1 + this.state.style.height;
      if (this.resizeCornor === 1) {
        x1 = nx;
        y1 = ny;
      }
      if (this.resizeCornor === 2) {
        if (nave.target.className === "dot2") {
          x2 = nx + this.state.style.width;
          y1 = ny;
        } else {
          x2 = nx;
          y1 = ny;
        }
      }
      if (this.resizeCornor === 3) {
        if (nave.target.className === "dot3") {
          x2 = nx + this.state.style.width;
          y2 = ny + this.state.style.height;
        } else {
          x2 = nx;
          y2 = ny;
        }
      }
      if (this.resizeCornor === 4) {
        if (nave.target.className === "dot4") {
          x1 = nx;
          y2 = ny + this.state.style.height;
        } else {
          x1 = nx;
          y2 = ny;
        }
      }
      // console.log(
      //   `AdjustResize:${outside} (${nx - this.state.style.left},${ny - this.state.style.top}) (${nx},${ny}) ${nave.target.classList}`,
      //   nave
      // );
      this.ovrAdjustResize(x1, y1, x2, y2);
    }
  }

  mouseupOutside(e) {
    this.isMouseDown = false;
    this.isResizing = false;
    this.resizeCornor = 0;
  }

  startResize(i) {
    this.isResizing = true;
    this.resizeCornor = i;
    // console.log("start resize", this.resizeCornor);
  }

  getRect() {
    return {
      x: this.state.style.left,
      y: this.state.style.top,
      width: this.state.style.width,
      height: this.state.style.height
    };
  }

  renderDots() {
    if (this.state.isSelected) {
      let dots = [];
      for (let i = 1; i <= 4; i++) {
        if (this.dots[i - 1])
          dots.push(
            <div
              className={"dot"+i}
              style={Helper.merge(styles.selectedDot, styles["dot"+i])}
              onMouseDown={() => this.startResize(i)}
            ></div>
          );
      }
      return dots;
    }
    return null;
  }

  render() {
    console.log("shape render:", this.state.style);
    return (
      <div
        className="shape"
        ref={element => (this.target = element)}
        style={this.state.style}
        onMouseDown={this.mousedown.bind(this)}
        onMouseUp={this.mouseup.bind(this)}
        onMouseMove={this.mousemove.bind(this)}
      >
        <div>
          <div style={styles.inner}>{this.ovrInner()}</div>
          {this.renderDots()}
        </div>
      </div>
    );
  }
}

const styles = {
  selected: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "none",
    zIndex: 0
  },
  selectedDot: {
    position: "absolute",
    width: 5,
    height: 5,
    background: "#3d3d3d",
    cursor: "crosshair"
  },
  inner: {
    overflow: "hidden"
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

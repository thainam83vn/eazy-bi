import React from "react";
import { BaseComponent } from "./../base-component";

import { Helper } from "../../lib/Helper";
import { ShapeStyleCollection } from "./shape-style";

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
    background: "#3d3d3d",
    cursor: "crosshair"
  },
  inner:{
    overflow:'hidden'
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

export class Shape extends BaseComponent {
  shapeId = null;  
  shapeType = null;

  dots = [true, true, true, true];
  styleCollection: ShapeStyleCollection = new ShapeStyleCollection();
  target: any = null;

  isResizing = false;
  resizeCornor = 0;

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
      isMouseDown: false,
      mousedownX: 0,
      mousedownY: 0,
      style: this.styleCollection.output()
    };
  }

  data(){
    let style = this.styleCollection.output();
    return {
      id: this.shapeId,
      type: this.shapeType,
      style:style,
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

  ovrRectChanged() {
    if (this.props.onRectChange) this.props.onRectChange(this);
  }

  ovrAdjustResize(x1, y1, x2, y2) {
    if (this.resizeCornor === 1) {
      if (x1 > x2 - 1) {
        x1 = x2 - 1;
      }
      if (y1 > y2 - 1) {
        y1 = y2 - 1;
      }
    }
    if (this.resizeCornor === 2) {
      if (x2 < x1 + 1) {
        x2 = x1 + 1;
      }
      if (y1 > y2 - 1) {
        y1 = y2 - 1;
      }
    }
    if (this.resizeCornor === 3) {
      if (x2 < x1 + 1) {
        x2 = x1 + 1;
      }
      if (y2 < y1 + 1) {
        y2 = y1 + 1;
      }
    }
    if (this.resizeCornor === 4) {
      if (x1 > x2) {
        x1 = x2 - 1;
      }
      if (y2 < y1) {
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
  }

  refreshStyle() {
    this.setState({
      style: this.styleCollection.output()
    });
  }

  select(v) {
    this.setState({ isSelected: v });
    if (v) {
      if (this.props.onSelected) this.props.onSelected(this);
    }
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
    // this.select(nave.target === this.target);
    
    if (this.props.onDrag) this.props.onDrag(this);
  }
  mouseup(e) {
    this.setState({ isMouseDown: false });
    if (this.props.onDrop) this.props.onDrop(this);
  } 
  
  updateRect(x, y, w, h) {
    if (w <= 0) w = 2;
    if (h <= 0) h = 2;
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
  mousemove(e) {
    if (this.state.isMouseDown) {
      let nave = e.nativeEvent;
      let delX = nave.offsetX - this.state.mousedownX;
      let delY = nave.offsetY - this.state.mousedownY;
      this.updateRect(
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
          this.updateRect(
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
      }
      if (this.resizeCornor === 2) {
        x2 = nave.clientX;
        y1 = nave.clientY;
      }
      if (this.resizeCornor === 3) {
        x2 = nave.clientX;
        y2 = nave.clientY;
      }
      if (this.resizeCornor === 4) {
        x1 = nave.clientX;
        y2 = nave.clientY;
      }
      this.ovrAdjustResize(x1, y1, x2, y2);

      // if (this.resizeCornor === 1) {
      //   x1 = nave.clientX;
      //   y1 = nave.clientY;
      //   if (x1 > x2 - 1) {
      //     x1 = x2 - 1;
      //   }
      //   if (y1 > y2 - 1) {
      //     y1 = y2 - 1;
      //   }
      // }
      // if (this.resizeCornor === 2) {
      //   x2 = nave.clientX;
      //   y1 = nave.clientY;
      //   if (x2 < x1 + 1) {
      //     x2 = x1 + 1;
      //   }
      //   if (y1 > y2 - 1) {
      //     y1 = y2 - 1;
      //   }
      // }
      // if (this.resizeCornor === 3) {
      //   x2 = nave.clientX;
      //   y2 = nave.clientY;
      //   if (x2 < x1 + 1) {
      //     x2 = x1 + 1;
      //   }
      //   if (y2 < y1 + 1) {
      //     y2 = y1 + 1;
      //   }
      // }
      // if (this.resizeCornor === 4) {
      //   x1 = nave.clientX;
      //   y2 = nave.clientY;
      //   if (x1 > x2) {
      //     x1 = x2;
      //   }
      //   if (y2 < y1) {
      //     y2 = y1;
      //   }
      // }
      // this.updateRect(x1, y1, x2 - x1, y2 - y1);
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

  getRect() {
    return {
      x: this.state.style.left,
      y: this.state.style.top,
      width: this.state.style.width,
      height: this.state.style.height
    };
  }

  render() {
    return (
      <div
        style={this.state.style}
        onMouseDown={this.mousedown.bind(this)}
        onMouseUp={this.mouseup.bind(this)}
        onMouseMove={this.mousemove.bind(this)}
      >
        <div>
          <div style={styles.inner}>
            {this.ovrInner()}
          </div>
          {this.state.isSelected && (
            <div style={styles.selected}>
              {this.dots[0] && (
                <div
                  style={Helper.merge(styles.selectedDot, styles.dot1)}
                  onMouseDown={() => this.startResize(1)}
                />
              )}
              {this.dots[1] && (
                <div
                  style={Helper.merge(styles.selectedDot, styles.dot2)}
                  onMouseDown={() => this.startResize(2)}
                />
              )}
              {this.dots[2] && (
                <div
                  style={Helper.merge(styles.selectedDot, styles.dot3)}
                  onMouseDown={() => this.startResize(3)}
                />
              )}
              {this.dots[3] && (
                <div
                  style={Helper.merge(styles.selectedDot, styles.dot4)}
                  onMouseDown={() => this.startResize(4)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

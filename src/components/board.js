import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { BaseComponent } from "./base-component";
import { ShapeDynamic } from "./shapes/shape-dynamic";
import { Shape } from "./shapes/shape";
import { ChartShape } from "./shapes/chart-shape";

const styles = {
  drawing: {
    background: "#ededed",
    width: "100%",
    height: "calc(100vh - 30px)"
  }
};

export class Board extends BaseComponent {
  controls: Shape[] = [];
  draggingShape: Shape;

  list = [
    // {
    //   id: 1,
    //   type: "Triangle",
    //   style: {
    //     color: "#333",
    //     width: 150,
    //     height: 50,
    //     x: 50,
    //     y: 100,
    //     selected: true,
    //     strokeColor: "#00ff00",
    //     strokeWidth: 10
    //   }
    // }
    // {
    //   id: 2,
    //   type: "Star",
    //   color: "#333",
    //   width: 150,
    //   height: 50,
    //   x: 50,
    //   y: 300,
    //   selected: true,
    //   strokeColor: "#00ff00",
    //   strokeWidth: 4
    // },
    // {
    //   id: 3,
    //   type: "Rectangle",
    //   color: "#ff0000",
    //   width: 150,
    //   height: 50,
    //   x: 50,
    //   y: 400,
    //   selected: true,
    //   strokeColor:"#00ff00",
    //   strokeWidth:10
    // },
    // {
    //   id: 1,
    //   type: "Line",
    //   color: "#333",
    //   width: 150,
    //   height: 50,
    //   x: 50,
    //   y: 300,
    //   selected: true
    // },
    // {
    //   id: 1,
    //   type: "Shape",
    //   background: "#445566",
    //   color:"#333",
    //   width: 50,
    //   height: 50,
    //   x: 100,
    //   y: 100
    // },
    // {
    //   id: 2,
    //   type: "Circle",
    //   background: "#3d3d3d",
    //   color: "#333",
    //   width: 20,
    //   height: 20,
    //   x: 200,
    //   y: 200
    // },
    // {
    //   id: 3,
    //   type: "TextBox",
    //   background: "#ffffff",
    //   color: "#333",
    //   width: 150,
    //   height: 50,
    //   x: 50,
    //   y: 300,
    //   text: "hello",
    //   selected: true
    // }
  ];

  constructor(props) {
    super(props);
    this.state = {
      shapes: this.list
    };
  }
  selectedShape() {
    for (let shape of this.controls) {
      if (shape.isSelected()) return shape;
    }
    return null;
  }
  mousemove(e) {
    if (this.draggingShape) {
      this.draggingShape.mousemoveOutside(e);
    }
  }
  mousedown(e) {
    for (let s of this.controls) {
      s.mousedownOutside(e);
    }
  }
  mouseup(e) {
    for (let s of this.controls) {
      s.mouseupOutside(e);
    }
  }

  initShape(shape) {
    this.controls.push(shape);
    // console.log("All shapes:", this.controls);
  }

  dragShape(shape) {
    // console.log("On drag:", shape);
    this.draggingShape = shape;
  }

  dropShape(shape) {
    // console.log("On drop:", shape);
    this.draggingShape = null;
  }

  shapeSelected(shape) {
    // console.log("selected:", shape, this.controls);
    // for (let s of this.controls) {
    //   console.log("compare:", shape, s);
      
    //   if (s !== shape)
    //     s.select(false);
    // }
    if (this.props.onShapeSelected) this.props.onShapeSelected(shape);
  }

  renderShape(shape) {
    return (
      <ShapeDynamic
        key={shape.id}
        onInit={this.initShape.bind(this)}
        onDrag={this.dragShape.bind(this)}
        onDrop={this.dropShape.bind(this)}
        onSelected={this.shapeSelected.bind(this)}
        shape={shape}
      />
    );
  }

  addShape(shape) {
    shape.id = this.list.length + 1;
    this.list.push(shape);
    this.setState({ shapes: this.list });
  }

  render() {
    return (
      <div
        style={styles.drawing}
        onMouseDown={this.mousedown.bind(this)}
        onMouseMove={this.mousemove.bind(this)}
        onMouseUp={this.mouseup.bind(this)}
      >
        {this.state.shapes.map(shape => this.renderShape(shape))}
      </div>
    );
  }
}

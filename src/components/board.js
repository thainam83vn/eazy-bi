import React from 'react';
import { Shape } from './shape';
import { Circle } from './circle';
import { TextBox } from './textbox';
import { Icon } from './icon';

const styles = {
  header:{

  },
  controls:{
    position:"absolute"
  },
  title:{

  },
  drawing:{
    background:"#ededed",
    width:"100%",
    height:"calc(100vh - 100px)"
    
  }
};

export class Board extends React.Component{
  shapes:any[] = [
    { type: "Shape", color:"#445566", width: 50, height: 50, x: 100, y: 100 },
    { type: "Circle", color: "#3d3d3d", width: 20, height: 20, x: 200, y: 200 },
    { type: "TextBox", color: "#ffffff", width: 150, height: 50, x: 50, y: 300, text: "hello", selected:true },
    // { type: "Icon", color: "transparent", width: 30, height: 30, x: 50, y: 500 },
  ];
  controls: Shape[] = [];
  currentControl: Shape;
  mousemove(e){
    if (this.currentControl){
      this.currentControl.mousemoveOutside(e);
    }
  }
  mouseup(e) {
    console.log("board: mouse up");
    for(let s of this.controls){
      s.undrag();
    }
  }

  initShape(shape){
    this.controls.push(shape);
    console.log("All shapes:", this.controls);
  }

  dragShape(shape){
    console.log("On drag:", shape);
    this.currentControl = shape;
    for (let s of this.controls) {
      s.select(false);
    }
  }

  dropShape(shape) {
    console.log("On drop:", shape);
    this.currentControl = null;
    for (let s of this.controls) {
      s.select(s === shape);
    }
  }

  renderShape(shape){
    if (shape.type === "Shape")
      return (
        <Shape onInit={this.initShape.bind(this)} onDrag={this.dragShape.bind(this)} onDrop={this.dropShape.bind(this)} data={shape}></Shape>
      );
    if (shape.type === "Circle")
      return (
        <Circle onInit={this.initShape.bind(this)} onDrag={this.dragShape.bind(this)} onDrop={this.dropShape.bind(this)} data={shape}></Circle>
      );
    if (shape.type === "TextBox")
      return (
        <TextBox onInit={this.initShape.bind(this)} onDrag={this.dragShape.bind(this)} onDrop={this.dropShape.bind(this)} text={shape.text} data={shape}></TextBox>
      );     
    if (shape.type === "Icon")
      return (
        <Icon onInit={this.initShape.bind(this)} onDrag={this.dragShape.bind(this)} onDrop={this.dropShape.bind(this)} text={shape.text} data={shape}></Icon>
      );           
  }

  render(){
    return (
      <div>
        <div style={styles.header}>
          <div style={styles.controls}>
            <button>+Circle</button>
            <button>+Rect</button>
          </div>
          <div style={styles.title}>Board</div>
        </div>
        <div style={styles.drawing}
          onMouseMove={this.mousemove.bind(this)}
          onMouseUp={this.mouseup.bind(this)}
          >
          {
            this.shapes.map(shape=>(              
              this.renderShape(shape)
            ))
          }
          
        </div>
        
      </div>
    );
  }
}

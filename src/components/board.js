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
  controls: Shape[] = [];
  currentControl: Shape;

  constructor(props){
    super(props);
    this.state = {
      shapes:[
        { id: 1, type: "Shape", color:"#445566", width: 50, height: 50, x: 100, y: 100 },
        { id: 2, type: "Circle", color: "#3d3d3d", width: 20, height: 20, x: 200, y: 200 },
        { id: 3, type: "TextBox", color: "#ffffff", width: 150, height: 50, x: 50, y: 300, text: "hello", selected:true }
      ]
    }
  }
  mousemove(e){
    if (this.currentControl){
      this.currentControl.mousemoveOutside(e);
    }
  }
  mousedown(e) {
    for (let s of this.controls) {
      s.mousedownOutside(e);
    }
  }  
  mouseup(e) {
    for(let s of this.controls){
      s.mouseupOutside(e);
    }
  }

  initShape(shape){
    this.controls.push(shape);
    console.log("All shapes:", this.controls);
  }

  dragShape(shape){
    console.log("On drag:", shape);
    this.currentControl = shape;
  }

  dropShape(shape) {
    console.log("On drop:", shape);
    this.currentControl = null;
  }

  renderShape(shape){
    if (shape.type === "Shape")
      return (
        <Shape key={shape.id} onInit={this.initShape.bind(this)} onDrag={this.dragShape.bind(this)} onDrop={this.dropShape.bind(this)} data={shape}></Shape>
      );
    if (shape.type === "Circle")
      return (
        <Circle key={shape.id} onInit={this.initShape.bind(this)} onDrag={this.dragShape.bind(this)} onDrop={this.dropShape.bind(this)} data={shape}></Circle>
      );
    if (shape.type === "TextBox")
      return (
        <TextBox key={shape.id} onInit={this.initShape.bind(this)} onDrag={this.dragShape.bind(this)} onDrop={this.dropShape.bind(this)} text={shape.text} data={shape}></TextBox>
      );     
    if (shape.type === "Icon")
      return (
        <Icon key={shape.id} onInit={this.initShape.bind(this)} onDrag={this.dragShape.bind(this)} onDrop={this.dropShape.bind(this)} text={shape.text} data={shape}></Icon>
      );           
  }

  addShape(shape){
    let shapes = this.state.shapes;
    shape.id = shapes.length + 1;    
    shapes.push(shape);
    this.setState({ shapes: shapes });
  }
  addCircle(){
    let circle = {type: "Circle", color: "#3d3d3d", width: 50, height: 50, x: 0, y: 0 };
    this.addShape(circle);
  }
  addRect() {
    let rect = { type: "Shape", color: "#3d3d3d", width: 50, height: 50, x: 0, y: 0 };
    this.addShape(rect);
  }

  render(){
    return (
      <div>
        <div style={styles.header}>
          <div style={styles.controls}>
            <button onClick={this.addCircle.bind(this)}>+Circle</button>
            <button onClick={this.addRect.bind(this)}>+Rect</button>
          </div>
          <div style={styles.title}>Board</div>
        </div>
        <div style={styles.drawing}
          onMouseDown={this.mousedown.bind(this)}        
          onMouseMove={this.mousemove.bind(this)}
          onMouseUp={this.mouseup.bind(this)}
          >
          {this.state.shapes.map(shape=>this.renderShape(shape))} 
          
        </div>
        
      </div>
    );
  }
}

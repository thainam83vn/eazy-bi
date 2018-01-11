import React from 'react';
import {Helper} from '../lib/Helper';

const styles = {
  selected:{
    position: "absolute",
    width: "100%",
    height: "100%"
  },
  selectedDot:{
    position: "absolute",
    width:5,
    height:5,
    background:"#3d3d3d"
  },
  dot1:{
    top:-5,
    left:-5
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

}

export class Shape extends React.Component {
  staticStyle = {};
  target: any = null;

  constructor(props){
    super(props);
    this.staticStyle = {
      cursor:'default',
      background: this.props.data.color,
      width: this.props.data.width,
      height: this.props.data.height,
      position: "absolute"
    };
    if (this.ovrExtraStyle()){
      let extra = this.ovrExtraStyle();
      for (let x in extra) {
        this.staticStyle[x] = extra[x];
      }
    }

    let style = {};
    for(let x in this.staticStyle){
      style[x] = this.staticStyle[x];
    }
    style.top = this.props.data.y;
    style.left = this.props.data.x;
    this.state = {
      isSelected: this.props.data.selected?this.props.data.selected:false,
      isMouseDown: false,
      mousedownX: 0, 
      mousedownY: 0,
      style:style
    }
    if (this.props.onInit)
      this.props.onInit(this);
  }

  ovrExtraStyle(){
    return null;
  }

  ovrInner(){
    return null;
  }

  select(v){
    this.setState({isSelected: v});
  }

  undrag() {
    this.setState({ isMouseDown: false });
  }

  mousedown(e){
    let nave = e.nativeEvent;
    this.target = nave.target;
    this.setState({isMouseDown : true, 
      mousedownX: nave.offsetX, mousedownY: nave.offsetY
    });
    if(this.props.onDrag)
      this.props.onDrag(this);
  }
  mouseup(e) {
    this.setState({ isMouseDown: false });
    if (this.props.onDrop)
      this.props.onDrop(this);    
  }
  mousemove(e) {
    if (this.state.isMouseDown){
      let nave = e.nativeEvent;
      let delX = nave.offsetX - this.state.mousedownX;
      let delY = nave.offsetY - this.state.mousedownY;
      let style = {};
      for (let x in this.staticStyle) {
        style[x] = this.staticStyle[x];
      }
      style.top = this.state.style.top + delY;
      style.left = this.state.style.left + delX;
      this.setState({
        style: style
      });
      // console.log(style);
    }
  }
  mousemoveOutside(e){
    let nave = e.nativeEvent;
    if (nave.target!=this.target){
      // debugger;
      let style = {};
      for (let x in this.staticStyle) {
        style[x] = this.staticStyle[x];
      }
      style.left = nave.clientX - this.props.data.width/2;
      style.top = nave.clientY - this.props.data.height/2;
      this.setState({
        style: style
      });
      // console.log("mousemoveOutside", nave); 
    }
  }

  render(){
    return (
      <div style={this.state.style} 
        onMouseDown={this.mousedown.bind(this)}
        onMouseUp={this.mouseup.bind(this)}
        onMouseMove={this.mousemove.bind(this)}
      >
        {this.ovrInner()}
        {this.state.isSelected&&
          <div style={styles.selected}>
            <div style={Helper.merge(styles.selectedDot, styles.dot1)}></div>
            <div style={Helper.merge(styles.selectedDot, styles.dot2)}></div>
            <div style={Helper.merge(styles.selectedDot, styles.dot3)}></div>
            <div style={Helper.merge(styles.selectedDot, styles.dot4)}></div>
          </div>}
      </div>
    );
  }
}
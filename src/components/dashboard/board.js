import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import Drawer from "material-ui/Drawer";
import FloatingActionButton from "material-ui/FloatingActionButton";

import varStyles from "./../../var-styles";
import { BaseComponent } from "./../base-component";
import { ShapeDynamic } from "./../shapes/shape-dynamic";
import { Shape } from "./../shapes/shape";
import { SampleData } from "./../../sample-data";
import { ShapeProperty } from "./../shapes/shape-property";
import { ChartProperty } from "./../charts/chart-property";
import { ProxyData } from "./../../base/proxy-data";

import {MenuButtonChartTypes} from './menu-button-chart-types'

const styles = {
  drawing: {
    background: "#ededed",
    width: "100%",
    height: "calc(100vh - 50px)",
    position:"relative"
  },
  toolbar: {
    height: "50px",
    // paddingTop: "12px",
    background: varStyles.theme.colorMain    
  },
  toolbarButton: {
    color: "#fff", 
    cursor: "pointer",
    marginRight: "10px"
  }
};

export class DesignBoard extends BaseComponent {
  propShapeView: ShapeProperty;
  propChartView: ChartProperty;

  shapeViews: Shape[] = [];
  draggingShape: Shape;
  sample = new SampleData();
  // selectedShapeView: Shape;

  datasources: ProxyData[];

  list = [];

  constructor(props) {
    super(props);
    this.list = this.props.dashboard.items;
    this.state = {
      shapes: this.list,
      openProperty: false,
      propertyMode: 1,
      selectedShapeView:null
    };
    console.log("board state:", this.state);
  }
  setDatasources(ds) {
    this.setState({ datasources: ds });
  }

  data() {
    let r = [];
    for (let c of this.shapeViews) {
      r.push(c.data());
    }
    return r;
  }
  getSelectedShapeView() {
    return this.state.selectedShapeView;
    // for (let shapeView of this.shapeViews) {
    //   if (shapeView.isSelected()) return shapeView;
    // }
    // return null;
  }
  getShapeViewByShape(shape) {
    for (let shapeView of this.shapeViews) {
      if (shapeView.shapeId === shape.id) return shapeView;
    }
    return null;
  }


  selectShapeView(shapeView) {
    // this.selectedShapeView = shapeView;
    this.setState({selectedShapeView:shapeView});
    this.selectShapeViewForShapeProperty();
    this.selectShapeViewForChartProperty();
    if (this.props.onShapeSelected) this.props.onShapeSelected(shapeView);
  }

  selectShapeViewForShapeProperty(){
    // if (this.propShapeView) this.propShapeView.setShape(this.selectedShapeView);
    if (this.propShapeView) this.propShapeView.setShape(this.state.selectedShapeView);
  }

  selectShapeViewForChartProperty(){
    if (this.propChartView)
        this.propChartView.setChart(
          this.state.selectedShapeView.props.data.chart,
          this.state.selectedShapeView.chart?this.state.selectedShapeView.chart.declares():null
        );
  }

  addShape(shape) {
    shape.id = this.list.length + 1;
    this.list.push(shape);
    this.setState({ shapes: this.list }, () => {
      let shapeView = this.getShapeViewByShape(shape);
      if (shapeView)
        this.selectShapeView(shapeView);
    });
  }

  showPropertyShape() {
    let open = !this.state.openProperty;
    if (this.state.propertyMode !== 1) open = true;
    this.setState({ openProperty: open, propertyMode: 1 });
    setTimeout(() => {
      this.selectShapeViewForShapeProperty();
    }, 100);
  }
  showPropertyChart() {
    let open = !this.state.openProperty;
    if (this.state.propertyMode !== 2) open = true;
    this.setState({ openProperty: open, propertyMode: 2 });
    setTimeout(() => {
      this.selectShapeViewForChartProperty();
    }, 100);
  }
  chartPropertyChanged(chartData) {
    console.log("chartPropertyChanged", chartData);
    this.state.selectedShapeView.setChartData(chartData);
  }  

  mousemove(e) {
    if (this.draggingShape) {
      this.draggingShape.mousemoveOutside(e);
    }
  }
  mousedown(e) {
    for (let s of this.shapeViews) {
      s.mousedownOutside(e);
    }
  }
  mouseup(e) {
    for (let s of this.shapeViews) {
      s.mouseupOutside(e);
    }
  }

  initShape(shape) {
    this.shapeViews.push(shape);
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

  shapeViewChanged(e){
    console.log("ShapeView changed:", e, this.state.shapes);
    for(let shape of this.state.shapes){
      if (shape.id === e.shapeId){
        shape.style = e.styleCollection.output();
      }
    }
    if (this.props.onChange)
      this.props.onChange(this.dashboard);
  }

  renderShape(shape) {
    return (
      <ShapeDynamic
        key={shape.id}
        onInit={this.initShape.bind(this)}
        onDrag={this.dragShape.bind(this)}
        onDrop={this.dropShape.bind(this)}
        onSelected={this.selectShapeView.bind(this)}
        onChange={this.shapeViewChanged.bind(this)}
        shape={shape}
      />
    );
  }
  

  render() {
    return (
      <div>
        <div style={styles.toolbar}>
          <MenuButtonChartTypes onSelect={this.addShape.bind(this)} />
        </div>
        <div
          style={styles.drawing}
          onMouseDown={this.mousedown.bind(this)}
          onMouseMove={this.mousemove.bind(this)}
          onMouseUp={this.mouseup.bind(this)}
        >
          {this.state.shapes.map(shape => this.renderShape(shape))}
        </div>
        <Drawer
          open={this.state.openProperty}
          docked={true}
          openSecondary={true}
          width={400}
        >
          {this.state.selectedShapeView && this.state.propertyMode === 1 && (
            <ShapeProperty
              onInit={e => this.ovrInitChild("propShapeView", e)}
            />
          )}
          {this.state.selectedShapeView && this.state.propertyMode === 2 && (
            <ChartProperty
              onInit={e => this.ovrInitChild("propChartView", e)}
              onChange={this.chartPropertyChanged.bind(this)}
            />
          )}
        </Drawer>
        {/* <div style={styles.footer}>{this.renderToolbar()}</div> */}
      </div>
    );
  }
}
// 3f51b5

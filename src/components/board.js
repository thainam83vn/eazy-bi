import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import Drawer from "material-ui/Drawer";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { BaseComponent } from "./base-component";
import { ShapeDynamic } from "./shapes/shape-dynamic";
import { Shape } from "./shapes/shape";
import { SampleData } from "./../sample-data";
import { ShapeProperty } from "./shapes/shape-property";
import { ChartProperty } from "./charts/chart-property";
import { ProxyData } from "./../base/proxy-data";

const styles = {
  drawing: {
    background: "#ededed",
    width: "100%",
    height: "calc(100vh - 50px)"
  },
  footer: {
    width: "100%",
    background: "#3f51b5",
    height: "50px"
  },
  toolbar: {
    marginLeft: "50px"
  }
};

export class DesignBoard extends BaseComponent {
  propShapeView: ShapeProperty;
  propChartView: ChartProperty;

  controls: Shape[] = [];
  draggingShape: Shape;
  sample = new SampleData();
  selectedShape: Shape;

  datasources: ProxyData[];

  list = [];

  constructor(props) {
    super(props);
    this.list = this.props.data;
    this.state = {
      shapes: this.list,
      openProperty: false,
      propertyMode: 1
    };
  }
  setDatasources(ds) {
    this.setState({ datasources: ds });
  }

  data() {
    let r = [];
    for (let c of this.controls) {
      r.push(c.data());
    }
    return r;
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
    this.selectedShape = shape;
    if (this.props.onShapeSelected) this.props.onShapeSelected(shape);
  }

  addShape(shape) {
    shape.id = this.list.length + 1;
    this.list.push(shape);
    this.setState({ shapes: this.list });
  }

  showPropertyShape() {
    let open = !this.state.openProperty;
    if (this.state.propertyMode !== 1) open = true;
    this.setState({ openProperty: open, propertyMode: 1 });
    setTimeout(() => {
      if (this.propShapeView) this.propShapeView.setShape(this.selectedShape);
    }, 100);
  }
  showPropertyChart() {
    let open = !this.state.openProperty;
    if (this.state.propertyMode !== 2) open = true;
    this.setState({ openProperty: open, propertyMode: 2 });
    setTimeout(() => {
      if (this.propChartView)
        this.propChartView.setChart(
          this.selectedShape.props.data.chart,
          this.selectedShape.chart.declares()
        );
    }, 100);
  }
  chartPropertyChanged(chartData) {
    console.log("chartPropertyChanged", chartData);
    this.selectedShape.setChartData(chartData);
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
  renderToolbar() {
    return (
      <div style={styles.toolbar}>
        <IconMenu
          iconButtonElement={
            <FloatingActionButton mini={true}>
              <i class="material-icons">add</i>
            </FloatingActionButton>
          }
          anchorOrigin={{ horizontal: "left", vertical: "top" }}
          targetOrigin={{ horizontal: "left", vertical: "top" }}
        >
          <MenuItem
            primaryText="Rectangle"
            onClick={() => this.addShape(this.sample.addRect())}
          />
          <MenuItem
            primaryText="Circle"
            onClick={() => this.addShape(this.sample.addCircle())}
          />
          <MenuItem primaryText="Icon" />
          <MenuItem primaryText="Text" />

          <MenuItem
            primaryText="Line Chart"
            onClick={() => this.addShape(this.sample.addChart())}
          />
          <MenuItem
            primaryText="Bar Chart"
            onClick={() => this.addShape(this.sample.addBarChart())}
          />
          <MenuItem
            primaryText="Area Chart"
            onClick={() => this.addShape(this.sample.addAreaChart())}
          />
          <MenuItem
            primaryText="Compose Chart"
            onClick={() => this.addShape(this.sample.addComposeChart())}
          />
          <MenuItem
            primaryText="Scatter Chart"
            onClick={() => this.addShape(this.sample.addScatterChart())}
          />
        </IconMenu>
        <FloatingActionButton
          mini={true}
          onClick={this.showPropertyShape.bind(this)}
        >
          <i class="material-icons">mode_edit</i>
        </FloatingActionButton>
        <FloatingActionButton
          mini={true}
          onClick={this.showPropertyChart.bind(this)}
        >
          <i class="material-icons">mode_edit</i>
        </FloatingActionButton>
      </div>
    );
  }

  render() {
    return (
      <div>
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
        >
          {this.state.propertyMode === 1 && (
            <ShapeProperty
              onInit={e => this.ovrInitChild("propShapeView", e)}
            />
          )}
          {this.state.propertyMode === 2 && (
            <ChartProperty
              onInit={e => this.ovrInitChild("propChartView", e)}
              onChange={this.chartPropertyChanged.bind(this)}
            />
          )}
        </Drawer>
        <div style={styles.footer}>{this.renderToolbar()}</div>
      </div>
    );
  }
}
// 3f51b5

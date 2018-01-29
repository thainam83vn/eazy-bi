import React from "react";
import { BaseComponent } from "./../base-component";
import components from "./chart-index";

export class ChartDynamic extends React.Component {
  initChart(chart) {
    if (this.props.onInit) this.props.onInit(chart);
  }
  render() {
    let t = this.props.type;
    if (components.hasOwnProperty(t)) {
      let Component = components[t];
      return (
        <Component
          id={this.props.id}
          type={this.props.type}
          onInit={this.initChart.bind(this)}
          attributes={this.props.chart.attributes}
          width={this.props.width}
          height={this.props.height}
          onChange={(e)=>{if (this.props.onChange) this.props.onChange(e)}}
        />
      );
    }
    return null;
  }
}

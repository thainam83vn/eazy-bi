import React from "react";
import { BaseComponent } from "./../base-component";
import components from './chart-index';

export class ChartDynamic extends React.Component {
  initChart(chart){
    if (this.props.onInit)
      this.props.onInit(chart);
  }
  render() {
    let t = this.props.type;
    if (components.hasOwnProperty(t)) {
      let Component = components[t];
      return <Component onInit={this.initChart.bind(this)}
        data={this.props.data} attributes={this.props.attributes} />
    }
    return null;
  }
}

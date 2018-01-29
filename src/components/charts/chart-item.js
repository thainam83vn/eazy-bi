import React from "react";
import { BaseComponent} from './../base-component';
import {
  Line,
  Area,
  Bar,
} from "recharts";
import components from './chart-item-index';


export class PanChartItem extends BaseComponent {
  initChartItem(item){
    if (this.props.onInit)
      this.props.onInit(item);
  }

  render() {
    let t = this.props.type;
    if (components.hasOwnProperty(t)) {
      let Component = components[t];
      return <Component onInit={this.initChartItem.bind(this)}
        dataKey={this.props.dataKey} stroke={this.props.stroke} fill={this.props.fill} />
    }
    return null;
  }
}

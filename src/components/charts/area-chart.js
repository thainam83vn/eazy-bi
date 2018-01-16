import React from "react";
import { BaseChart } from "./chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

export class PanAreaChart extends BaseChart {
  render() {
    return (
      <AreaChart
        width={this.state.attributes.width}
        height={this.state.attributes.height}
        data={this.state.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey={this.state.attributes.XAxis} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        {this.state.attributes.YAxis.map(yaxis => (
          <Area type="monotone" dataKey={yaxis.dataKey} stroke={yaxis.stroke} fill={yaxis.fill} />
        ))}
      </AreaChart>
    );
  }
}

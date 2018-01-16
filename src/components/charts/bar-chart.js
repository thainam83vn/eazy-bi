import React from "react";
import { BaseChart } from "./chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export class PanBarChart extends BaseChart {
  render() {
    return (
      <BarChart
        width={this.state.attributes.width}
        height={this.state.attributes.height}
        data={this.state.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey={this.state.attributes.XAxis} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        {this.state.attributes.YAxis.map(yaxis => (
          <Bar dataKey={yaxis.dataKey} fill={yaxis.fill} />
        ))}
      </BarChart>
    );
  }
}

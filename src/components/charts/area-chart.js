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
  declares() {
    return {
      datasourceName: { type: "ControlDatasourceSelector" },
      XAxis: {
        type: "ControlDataFieldSelector"
      },
      YAxis: [
        {
          dataKey: { type: "ControlDataFieldSelector" },
          fill: { type: "ControlColorSelector" }
        }
      ]
    };
  }
  render() {
    return (
      <AreaChart
        width={this.props.width}
        height={this.props.height}
        data={this.state.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey={this.state.attributes.XAxis} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        {this.state.attributes.YAxis.map(yaxis => (
          <Area
            type="monotone"
            dataKey={yaxis.dataKey}
            stroke={yaxis.stroke}
            fill={yaxis.fill}
          />
        ))}
      </AreaChart>
    );
  }
}

import React from "react";
import { BaseChart } from "./chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export class PanLineChart extends BaseChart {
  declares() {
    return {
      datasourceName: { type: "ControlDatasourceSelector" },
      XAxis: {
        type: "ControlDataFieldSelector"
      },
      YAxis: [
        {
          dataKey: { type: "ControlDataFieldSelector" },
          stroke: { type: "ControlColorSelector" }
        }
      ]
    };
  }
  render() {
    return (
      <LineChart
        width={this.props.width}
        height={this.props.height}
        data={this.state.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey={this.state.attributes.XAxis} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        {this.state.attributes.YAxis.map(yaxis => (
          <Line type="monotone" key={ yaxis.dataKey } dataKey={yaxis.dataKey} stroke={yaxis.stroke} />
        ))}
      </LineChart>
    );
  }
}

import React from "react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Area,
  Bar
} from "recharts";
import { BaseChart } from "./chart";
import { PanChartItem } from "./chart-item";

export class PanComposeChart extends BaseChart {
  renderItem(yaxis) {
    if (yaxis.type === "Line") {
      return (
        <Line
          key={yaxis.type}
          type={yaxis.type}
          dataKey={yaxis.dataKey}
          stoke={yaxis.stoke}
          fill={yaxis.fill}
        />
      );
    }
    if (yaxis.type === "Bar") {
      return (
        <Bar
          key={yaxis.type}
          type={yaxis.type}
          dataKey={yaxis.dataKey}
          stoke={yaxis.stoke}
          fill={yaxis.fill}
        />
      );
    }
    if (yaxis.type === "Area") {
      return (
        <Area
          key={yaxis.type}
          type={yaxis.type}
          dataKey={yaxis.dataKey}
          stoke={yaxis.stoke}
          fill={yaxis.fill}
        />
      );
    }
    // return (
    //   <PanChartItem
    //     type={yaxis.type}
    //     dataKey={yaxis.dataKey}
    //     fill={yaxis.fill}
    //     stroke={yaxis.stroke}
    //   ></PanChartItem>
    // )
    return null;
  }

  render() {
    return (
      <ComposedChart
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
        {this.state.attributes.YAxis.map(yaxis => 
          this.renderItem(yaxis)
        )}
      </ComposedChart>
    );
  }
}

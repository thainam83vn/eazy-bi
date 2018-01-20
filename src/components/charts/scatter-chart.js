import React from "react";
import { BaseChart } from "./chart";
import {
  ScatterChart,
  Scatter,
  XAxis, 
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export class PanScatterChart extends BaseChart {
  declares() {
    return {
      datasourceName: 'ControlDatasourceSelector',
      XAxis: 'ControlDataFieldSelector',
      YAxis: 'ControlDataFieldSelector'
    };
  }
  render() {
    return (
      <ScatterChart
        width={this.state.attributes.width}
        height={this.state.attributes.height}
        data={this.state.data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey={'x'} type="number" name='stature' unit='cm' />
        <YAxis dataKey={'y'} type="number" name='weight' unit='kg' />
        <CartesianGrid />
        <Scatter name='A school' data={this.state.data} fill='#8884d8' />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      </ScatterChart>
    );
  }
}
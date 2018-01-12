import React from "react";

import {LineChart} from 'react-d3-basic';

export class CustomLineChart extends React.Component {
  render() {
    var chartData = [
      { Year: 2010, Total: 100 },
      { Year: 2011, Total: 200 },
      { Year: 2012, Total: 300 },
      { Year: 2013, Total: 400 },
      { Year: 2014, Total: 500 },
      { Year: 2015, Total: 600 }
    ];

    var width = 500,
      height = 300,
      margins = { left: 100, right: 100, top: 50, bottom: 50 },
      // chart series,
      // field: is what field your data want to be selected
      // name: the name of the field that display in legend
      // color: what color is the line
      chartSeries = [
        {
          field: "total",
          name: "Total",
          color: "#ff7f0e"
        }
      ],
      // your x accessor
      x = function(d) {
        return d;
      },
      xScale = "time";
    return (
      <LineChart
        margins={margins}
        data={chartData}
        width={width}
        height={height}
        chartSeries={chartSeries}
        x={x}
        xScale={xScale}
      />
    );
  }
}

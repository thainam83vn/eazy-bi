const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
];

export class SampleData {
  addCircle() {
    return {
      type: "Circle",
      style: {
        background: "#3d3d3d",
        color: "#3d3d3d",
        width: 50,
        height: 50,
        x: 0,
        y: 0
      }
    };
  }
  addRect() {
    return {
      type: "Shape",
      style: {
        background: "#3d3d3d",
        color: "#3d3d3d",
        width: 50,
        height: 50,
        x: 0,
        y: 0
      }
    };
  }

  addChart() {
    return {
      type: "ChartShape",
      style: {
        background: "#3d3d3d",
        color: "#afafaf",
        width: 250,
        height: 250,
        x: 0,
        y: 0
      },
      chart: {
        type: "PanLineChart",
        attributes: {
          XAxis: "name",
          YAxis: [
            { dataKey: "uv", fill: "#ff0000", stroke: "#ff0000" },
            { dataKey: "pv", fill: "#00ff00", stroke: "#00ff00" }
          ]
        },
        data: data
      }
    };
  }

  addBarChart() {
    return {
      type: "ChartShape",
      style: {
        background: "#3d3d3d",
        color: "#afafaf",
        width: 250,
        height: 250,
        x: 0,
        y: 0
      },
      chart: {
        type: "PanBarChart",
        attributes: {
          XAxis: "name",
          YAxis: [
            { dataKey: "uv", fill: "#ff0000", stroke: "#ff0000" },
            { dataKey: "pv", fill: "#00ff00", stroke: "#00ff00" }
          ]
        },
        data: data
      }
    };
  }

  addAreaChart() {
    return {
      type: "ChartShape",
      style: {
        background: "#3d3d3d",
        color: "#afafaf",
        width: 250,
        height: 250,
        x: 0,
        y: 0
      },
      chart: {
        type: "PanAreaChart",
        attributes: {
          XAxis: "name",
          YAxis: [
            { dataKey: "uv", fill: "#ff0000", stroke: "#ff0000" },
            { dataKey: "pv", fill: "#00ff00", stroke: "#00ff00" }
          ]
        },
        data: data
      }
    };
  }

  addComposeChart() {
    return {
      type: "ChartShape",
      style: {
        background: "#3d3d3d",
        color: "#afafaf",
        width: 250,
        height: 250,
        x: 0,
        y: 0
      },
      chart: {
        type: "PanComposeChart",
        attributes: {
          XAxis: "name",
          YAxis: [
            { type: "Line", dataKey: "uv", fill: "#ff0000", stroke: "#ff0000" },
            { type: "Bar", dataKey: "uv", fill: "#00ff00", stroke: "#00ff00" },
            { type: "Area", dataKey: "uv", fill: "#0000ff", stroke: "#0000ff" }
          ]
        },
        data: data
      }
    };
  }
  addScatterChart() {
    return {
      type: "ChartShape",
      style: {
        background: "#3d3d3d",
        color: "#afafaf",
        width: 250,
        height: 250,
        x: 0,
        y: 0
      },
      chart: {
        type: "PanScatterChart",
        attributes: {
          XAxis: "x",
          YAxis: "y"
        },
        data: [{ x: 100, y: 200, z: 200 }, { x: 120, y: 100, z: 260 },
        { x: 170, y: 300, z: 400 }, { x: 140, y: 250, z: 280 },
        { x: 150, y: 400, z: 500 }, { x: 110, y: 280, z: 200 }]
      }
    };
  }
}

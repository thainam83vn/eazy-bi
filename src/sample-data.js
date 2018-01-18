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
  datasourceSampleCSV1(name){
    return {
      name : name,
      setting : {
        type: 'csv',
        fileName: 'f1.csv',
        content: `
        year,boys,girls
        1629,5218,4683
        1630,4858,4457
        1631,4422,4102
        1632,4994,4590
        1633,5158,4839
        `,
        desc: 'Datasource Sample CSV 1'
      }
    }
  }

  shapeList() {
    return [
      {
        id: 1,
        type: "Triangle",
        style: {
          color: "#333",
          width: 150,
          height: 50,
          left: 50,
          top: 100,
          selected: true,
          strokeColor: "#00ff00",
          strokeWidth: 10
        }
      },
      {
        id: 2,
        type: "Star",
        color: "#333",
        width: 150,
        height: 50,
        left: 50,
        top: 300,
        selected: true,
        strokeColor: "#00ff00",
        strokeWidth: 4
      },
      {
        id: 3,
        type: "Rectangle",
        color: "#ff0000",
        width: 150,
        height: 50,
        left: 50,
        top: 400,
        selected: true,
        strokeColor: "#00ff00",
        strokeWidth: 10
      },
      {
        id: 1,
        type: "Line",
        color: "#333",
        width: 150,
        height: 50,
        left: 50,
        top: 300,
        selected: true
      },
      {
        id: 1,
        type: "Shape",
        background: "#445566",
        color: "#333",
        width: 50,
        height: 50,
        left: 100,
        top: 100
      },
      {
        id: 2,
        type: "Circle",
        background: "#3d3d3d",
        color: "#333",
        width: 20,
        height: 20,
        left: 200,
        top: 200
      },
      {
        id: 3,
        type: "TextBox",
        background: "#ffffff",
        color: "#333",
        width: 150,
        height: 50,
        left: 50,
        top: 300,
        text: "hello",
        selected: true
      }
    ];
  }
  addCircle() {
    return {
      type: "Circle",
      style: {
        background: "#3d3d3d",
        color: "#3d3d3d",
        width: 50,
        height: 50,
        left: 0,
        top: 0
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
        left: 0,
        top: 0
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
        left: 0,
        top: 0
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
        left: 0,
        top: 0
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
        left: 0,
        top: 0
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
        left: 0,
        top: 0
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
        left: 0,
        top: 0
      },
      chart: {
        type: "PanScatterChart",
        attributes: {
          XAxis: "x",
          YAxis: "y"
        },
        data: [
          { x: 100, y: 200, z: 200 },
          { x: 120, y: 100, z: 260 },
          { x: 170, y: 300, z: 400 },
          { x: 140, y: 250, z: 280 },
          { x: 150, y: 400, z: 500 },
          { x: 110, y: 280, z: 200 }
        ]
      }
    };
  }
}

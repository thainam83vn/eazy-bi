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
    let c = `year,boys,girls
        1629,5218,4683
        1630,4858,4457
        1631,4422,4102
        1632,4994,4590
        1633,5158,4839
        `;
    return {
      name : name,
      setting : {
        type: 'csv',
        fileName: 'f1.csv',
        fileContent: c,
        desc: 'Datasource Sample CSV 1'
      }
    }
  }

  datasourceSampleCSV2(name) {
    let c = `name,uv,pv,amt
        Page A,4000,2400,2400
        Page B,3000,1398,2210
        Page C,2000,9800,2290
        Page D,2780,3908,2000
        Page E,1890,4800,2181
        Page F,2390,3800,2500
        Page G,3490,4300,2100
        `;
    return {
      name: name,
      setting: {
        type: 'csv',
        fileName: 'f2.csv',
        fileContent: c,
        desc: 'Datasource Sample CSV 2'
      }
    }
  }  

  datasourceSampleCSV3(name) {
    let c = `x,y
        1,2
        3,2
        3,1
        5,3
        1,4
        5,6
        7,8
        8,9
        `;
    return {
      name: name,
      setting: {
        type: 'csv',
        fileName: 'f3.csv',
        fileContent: c,
        desc: 'Datasource Sample CSV 3'
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
            { dataKey: "uv", stroke: "#ff0000" },
            { dataKey: "pv", stroke: "#00ff00" }
          ],
          datasourceName: "ds2"          
        }
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
          ],
          datasourceName: "ds2"  
          
        },
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
          ],
          datasourceName: "ds2"  
          
        },
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
          ],
          datasourceName: "ds2"  
          
        },
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
          YAxis: "y",
          datasourceName: "ds3"  
          
        },
      }
    };
  }
}
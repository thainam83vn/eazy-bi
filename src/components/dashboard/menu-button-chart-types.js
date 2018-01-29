import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";

import { BaseComponent } from "./../base-component";
import {SampleData} from "./../../sample-data";
const styles = {
  main: {},
  button: {
    color: "#fff",
    cursor: "pointer",
    marginRight: "10px"
  }
};

const sample = new SampleData();

export class MenuButtonChartTypes extends BaseComponent {
  addShape(shape){
    console.log("Add shape", shape);
    if (this.props.onSelect)
      this.props.onSelect(shape);
  }
  render() {
    return (
      <IconMenu
        iconButtonElement={
          <i className="material-icons" style={styles.button}>
            add
          </i>
        }
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        targetOrigin={{ horizontal: "left", vertical: "top" }}
      >
        {/* <MenuItem
          primaryText="Rectangle"
          onClick={() => this.addShape(sample.addRect())}
        />
        <MenuItem
          primaryText="Circle"
          onClick={() => this.addShape(sample.addCircle())}
        />
        <MenuItem primaryText="Icon" />
        <MenuItem primaryText="Text" /> */}

        <MenuItem
          primaryText="Line Chart"
          onClick={() => this.addShape(sample.addChart())}
        />
        <MenuItem
          primaryText="Bar Chart"
          onClick={() => this.addShape(sample.addBarChart())}
        />
        <MenuItem
          primaryText="Area Chart"
          onClick={() => this.addShape(sample.addAreaChart())}
        />
        <MenuItem
          primaryText="Compose Chart"
          onClick={() => this.addShape(sample.addComposeChart())}
        />
        <MenuItem
          primaryText="Scatter Chart"
          onClick={() => this.addShape(sample.addScatterChart())}
        />
        <MenuItem
          primaryText="Table"
          onClick={() => this.addShape(sample.addTableChart())}
        />
        <MenuItem
          primaryText="Slicer"
          onClick={() => this.addShape(sample.addSlicerChart())}
        />
      </IconMenu>   
    );
  }
}

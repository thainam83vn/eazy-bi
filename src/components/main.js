import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { BaseComponent } from "./base-component";
import { DatabaseBoard } from "./database/database-board";
import { DesignBoard } from "./dashboard/board";
import { SampleData } from "./../sample-data";
import { Datasource } from "./../models/datasource-model";
import { DatasourceService } from './../services/datasource-service';

const styles = {
  controls: {
    position: "absolute",
    bottom: 0,
    left: 0
  },
  toolbar: {
    display: "inline-block"
  }
};

const sample = new SampleData();

export class Main extends BaseComponent {
  state = {
    screen: "Design",
    dashboard: null    
  };
  viewDesign: DesignBoard;
  boardData = [];

  viewDatabase: DatabaseBoard;
  datasources = [
    new Datasource(sample.datasourceSampleCSV1("ds1")),
    new Datasource(sample.datasourceSampleCSV2("ds2")),
    new Datasource(sample.datasourceSampleCSV3("ds3"))
  ];

  constructor(props) {
    super(props);
    for (let ds of this.datasources) {
      DatasourceService.instance().getDatasource(ds.name, ds);
    }

    setTimeout(() => {
      let dashboard = sample.dashboardSample1("Dashboard 1");
      this.setState({
        dashboard: dashboard
      });
      console.log("Dashboard:", dashboard);

      // this.viewDesign.addShape(sample.addChart());

      // let circle = sample.addCircle();
      // circle.style.top = 500;
      // this.viewDesign.addShape(circle);
    }, 500);
  }

  datasourceChanged(ds) {
    this.datasources = ds;
    this.viewDesign.setDatasources(this.datasources);
  }

  renderScreen() {
    if (this.state.screen === "Design") {
      if (this.state.dashboard) {
        return (
          <DesignBoard
            onInit={e => this.ovrInitChild("viewDesign", e)}
            data={this.boardData}
            dashboard={this.state.dashboard}
          />
        );
      } else {
        return null;
      }
    } else {
      return (
        <DatabaseBoard
          datasources={this.datasources}
          onInit={e => this.ovrInitChild("viewDatabase", e)}
          onChange={this.datasourceChanged.bind(this)}
        />
      );
    }
  }

  renderScreenMenu() {
    return (
      <IconMenu
        iconButtonElement={
          <i style={{ color: "#fff", fontSize: "40px", cursor: "pointer", marginTop: "5px" }} className="material-icons">{this.state.screen === "Design" ? "insert_chart" : "storage"}</i>
        }
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        targetOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <MenuItem
          primaryText={
            <div>
              <span>Design</span>
              {this.state.screen === "Design" && <i style={{ fontSize: "20px", position: "absolute", top: 13, right: 1 }} className="material-icons">done</i>}
            </div>
          }
          onClick={() => this.state.screen !== "Design" && this.switchTo("Design")}
        />
        <MenuItem
          primaryText={
            <div>
              <span>Database</span>
              {this.state.screen === "Database" && <i style={{ fontSize: "20px", position: "absolute", top: 13, right: 1 }} className="material-icons">done</i>}
            </div>
          }
          onClick={() => this.state.screen !== "Database" && this.switchTo("Database")}
        />
      </IconMenu>
    );
  }

  switchTo(mode) {
    if (this.state.screen !== mode) {
      if (mode !== "Design") {
        this.boardData = this.viewDesign.data();
        console.log("Board data:", this.boardData);
      }
      this.setState({ screen: mode });
    }
  }

  addShape(shape) {
    this.viewDesign.addShape(shape);
  }

  render() {
    return (
      <div>
        {this.renderScreen()}
        <div style={styles.controls}>{this.renderScreenMenu()}</div>
      </div>
    );
  }
}

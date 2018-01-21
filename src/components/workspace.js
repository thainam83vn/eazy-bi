import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FloatingActionButton from "material-ui/FloatingActionButton";
import SplitterLayout from 'react-splitter-layout';

import { BaseComponent } from "./base-component";
import { ControlSelectMini } from './controls/control-select-mini';
import { SampleData } from "./../sample-data";
import { Datasource } from "./../models/datasource-model";
import { DatasourceService } from './../services/datasource-service';
import { ArrayHelper } from "../base/array-helper";
import { DialogService } from "../services/dialog-service";
import { Helper } from "../lib/Helper";
import { DesignBoard } from "./board";
import { ObjectHelper } from "../base/object-helper";

const StrDashboard = "Dashboard";

const styles = {
  body: {
    width: "100%",
    background: "#fff",
    height: "calc(100vh - 50px)"
  },
  footer: {
    width: "100%",
    background: "#3f51b5",
    height: "50px"
  },
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

export class WorkSpace extends BaseComponent {
  state = {
    screen: "Design"
  };
  datasources = [
    new Datasource(sample.datasourceSampleCSV1("ds1")),
    new Datasource(sample.datasourceSampleCSV2("ds2")),
    new Datasource(sample.datasourceSampleCSV3("ds3"))
  ];
  dashboards = {
    "Dashboard 1":sample.dashboardSample1("Dashboard 1")
  };

  constructor(props) {
    super(props);
    for (let ds of this.datasources) {
      DatasourceService.instance().getDatasource(ds.name, ds);
    }

    this.state = {
      selectedDashboard: null
    };

    setTimeout(() => {
    }, 500);
  }

  renderScreen() {
    return null;
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

      </IconMenu>
    );
  }

  selectDashboard(e) {
    this.setState({
      selectedDashboard: null
    });
    setTimeout(()=>{
      this.setState({
        selectedDashboard: e[StrDashboard]
      });  
    }, 50);
  }

  addDashboard() {
    console.log("addDashboard");
    DialogService.instance().prompt("New Dashboard", "Dashboard Name", "", (r) => {
      if (r) {
        if (this.dashboards[r]){
          DialogService.instance().alert('Invalid Dashboard Name', `Name ${r} is not available`, () => {
            this.addDashboard();
          });
        } else {
          let dashboard = sample.dashboardSample1(r);
          this.dashboards[r] = dashboard;
          this.selectDashboard(r);
        }
      }
    });
  }

  boardChanged(dashboard){
    console.log("BoardChanged:", this.dashboards, dashboard);
  }

  render() {
    return (
      <div>
        <div style={styles.body}>
          <SplitterLayout percentage="true" secondaryInitialSize="80">
            <div >
              <div style={{ height: 30, width: "100%" }}>
                <ControlSelectMini
                  valueField="name"
                  textField="name"
                  itemButton={(value) =>
                    <div style={{ width: "100%" }}>
                      <span>{value}</span>
                      <i style={{ position: "absolute", top: 0, right: 0 }} className="material-icons">keyboard_arrow_down</i>
                    </div>
                  }
                  attributes={{ name: StrDashboard, value: this.state.selectedDashboard, options: Helper.asArray(ObjectHelper.merge(this.dashboards, {"New Dashboard..":{ name: "New Dashboard..", value: "@NewDashboard" }})) }}
                  onBeforeChange={e => {
                    if (e[StrDashboard] === "New Dashboard..") {
                      this.addDashboard();
                      return true;
                    }
                    return false;
                  }}
                  onChange={(e) => this.selectDashboard(e)} />
              </div>
              <div>
                Object Explorer
              </div>
            </div>
            <div>
              {this.state.selectedDashboard && (
                <DesignBoard
                  onInit={e => this.ovrInitChild("viewDesign", e)}
                  dashboard={this.dashboards[this.state.selectedDashboard]}
                  onChange={this.boardChanged.bind(this)}
                />
              )}
            </div>
          </SplitterLayout>
        </div>
        <div style={styles.footer}></div>
      </div>
    );
  }
}

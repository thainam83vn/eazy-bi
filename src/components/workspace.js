import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FloatingActionButton from "material-ui/FloatingActionButton";
import SplitterLayout from "react-splitter-layout";

import varStyles from "./../var-styles";
import { BaseComponent } from "./base-component";
import { DesignBoard } from "./dashboard/board";
import { DatasourceView } from "./database/datasource-view";
import { WorkspaceMenu } from "./workspace-menu";
import { ControlSelectMini } from "./controls/control-select-mini";

import { SampleData } from "./../sample-data";
import { Datasource } from "./../models/datasource-model";
import { DatasourceService } from "./../services/datasource-service";
import { ArrayHelper } from "../base/array-helper";
import { DialogService } from "../services/dialog-service";
import { Helper } from "../lib/Helper";
import { ObjectHelper } from "../base/object-helper";
import { ObjectExplorer } from "./object-explorer";
import { EntityService } from "../services/entity-service";

const StrDashboard = "Dashboard";

const styles = {
  main: {
    color: varStyles.theme.textColor
  },
  footer: {
    width: "100%",
    background: varStyles.theme.colorDark,
    height: "50px"
  },
  body: {
    width: "100%",
    background: "#fff",
    height: "calc(100vh - 50px)"
  },
  left: {
    background: varStyles.theme.colorLight,
    height: "100%"
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
  selectedWorkspace = sample.workspaceSample1("Workspace 1");
  constructor(props) {
    super(props);
    for (let ds of Helper.asArray(this.selectedWorkspace.datasources)) {
      DatasourceService.instance().getDatasource(ds.name, ds);
    }
    // let entities = sample.entitiesSample();
    // for (let key in entities) {
    //   EntityService.instance().getEntity(key, entities[key]);
    // }

    this.state = {
      selectedDashboard: null,
      selectedDatasource: null
    };

    setTimeout(() => {}, 500);
  }

  selectDashboard(e) {
    this.setState({
      selectedDashboard: null,
      selectedDatasource: null
    });
    setTimeout(() => {
      this.setState({
        selectedDashboard: e
      });
    }, 50);
  }

  selectDatasource(e) {
    this.setState({
      selectedDashboard: null,
      selectedDatasource: null      
    });
    setTimeout(() => {
      this.setState({
        selectedDatasource: e
      });
    }, 50);
  }

  addDashboard() {
    console.log("addDashboard");
    DialogService.instance().prompt(
      "New Dashboard",
      "Dashboard Name",
      "",
      r => {
        if (r) {
          if (this.dashboards[r]) {
            DialogService.instance().alert(
              "Invalid Dashboard Name",
              `Name ${r} is not available`,
              () => {
                this.addDashboard();
              }
            );
          } else {
            let dashboard = sample.dashboardSample1(r);
            this.dashboards[r] = dashboard;
            this.selectDashboard(r);
          }
        }
      }
    );
  }

  boardChanged(dashboard) {
    console.log("BoardChanged:", this.dashboards, dashboard);
  }

  datasourceChanged(ds) {
  }

  render() {
    return (
      <div style={styles.main}>
        <div style={styles.footer} />

        <div style={styles.body}>
          <SplitterLayout percentage="true" secondaryInitialSize="65">
            <div style={styles.left}>
              <WorkspaceMenu
                style={{
                  background: varStyles.theme.colorMain,
                  color: varStyles.theme.textColor,
                  textSelectedColor: varStyles.theme.textSelectedColor
                }}
                workspace={this.selectedWorkspace}
                onSelectDashboard={this.selectDashboard.bind(this)}
                onSelectDatasource={this.selectDatasource.bind(this)}
              />
            </div>
            <div style={styles.right}>
              {this.state.selectedDashboard && (
                <DesignBoard
                  onInit={e => this.ovrInitChild("viewDesign", e)}
                  dashboard={this.state.selectedDashboard}
                  onChange={this.boardChanged.bind(this)}
                />
              )}
              {this.state.selectedDatasource && (
                <DatasourceView
                  style={{ headerBackground: varStyles.theme.colorMain}}
                  datasource={this.state.selectedDatasource}
                />
              )}
            </div>
          </SplitterLayout>
        </div>
      </div>
    );
  }
}

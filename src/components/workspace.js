import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import SplitterLayout from "react-splitter-layout";

import varStyles from "./../var-styles";
import { BaseComponent } from "./base-component";
import { DesignBoard } from "./dashboard/board";
import { DatasourceView } from "./database/datasource-view";
import { WorkspaceMenu } from "./workspace-menu";
import { ControlSelectMini } from "./controls/control-select-mini";
import { ControlCheck } from "./controls/control-check";

import { SampleData } from "./../sample-data";
import { Datasource } from "./../models/datasource-model";
import { DatasourceService } from "./../services/datasource-service";
import { DialogService } from "../services/dialog-service";
import { Helper } from "../lib/Helper";

import { DSWorkspace } from "./../reducers/ds-workspace";

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

class Workspace extends BaseComponent {
  state = {
    screen: "Design"
  };
  selectedWorkspace = sample.workspaceSample1("Workspace 1");
  constructor(props) {
    super(props);
    for (let ds of Helper.asArray(this.selectedWorkspace.datasources)) {
      DatasourceService.instance().getDatasource(ds.name, ds);
    }

    DSWorkspace.ins();

    this.state = {
      selectedDashboard: null,
      selectedDatasource: null
    };
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

  createWorkspace() {
    DialogService.instance().prompt(
      "Create Workspace",
      "Workspace Name",
      "",
      r => {
        return [];
      },
      r => {
        if (r) {
          let newWp = sample.workspaceSample1(r);
          DSWorkspace.ins().create(newWp).then((data) => {
            // this.props.actRefreshWorkspace();
          });
        }
      }
    );
  }

  activeWorkspace(wp) {
    DSWorkspace.ins()
      .setActive(wp)
      .then(e => {
        // this.props.actRefreshWorkspace();
      });
  }

  createDashboard(name) {
    let dashboard = sample.dashboardSample1(name);
    this.props.workspaces.active.dashboards[name] = dashboard;
    this.selectDashboard(dashboard);
  }

  createDatasource(name) {
    let datasource = new Datasource(sample.datasourceSampleCSV1(name));
    this.props.workspaces.active.datasources[name] = datasource;
    this.selectDatasource(datasource);
  }

  boardChanged(dashboard) {
    console.log("BoardChanged:", this.dashboards, dashboard);
  }

  datasourceChanged(ds) {}

  showHomeDialog() {
    DialogService.instance().alert("Test", "Go home", () => {});
  }

  render() {
    return (
      <div style={styles.main}>
        <div style={styles.footer}>
          <ControlCheck attributes={{ value: true }} />
        </div>

        <div style={styles.body}>
          <SplitterLayout percentage="true" secondaryInitialSize="80">
            <div style={styles.left}>
              <div>
                <div>
                  <span>Workspaces</span>
                  <i
                    className="material-icons button"
                    onClick={this.createWorkspace.bind(this)}
                  >
                    add
                  </i>
                </div>
                <ul>
                  {this.props.workspaces.entities.map(wp => (
                    <li onClick={() => this.activeWorkspace(wp)}>
                      {wp.workspaceName}
                    </li>
                  ))}
                </ul>
              </div>
              {this.props.workspaces.active && (
                <WorkspaceMenu
                  style={{
                    background: varStyles.theme.colorMain,
                    color: varStyles.theme.textColor,
                    textSelectedColor: varStyles.theme.textSelectedColor
                  }}
                  workspace={this.props.workspaces.active}
                  onSelectDashboard={this.selectDashboard.bind(this)}
                  onSelectDatasource={this.selectDatasource.bind(this)}
                  onCreateDashboard={this.createDashboard.bind(this)}
                  onCreateDatasource={this.createDatasource.bind(this)}
                />
              )}
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
                  style={{ headerBackground: varStyles.theme.colorMain }}
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

let mapStateToProps = state => {
  return {
    workspaces: state.workspaces,
  };
};

export default connect(mapStateToProps)(Workspace);

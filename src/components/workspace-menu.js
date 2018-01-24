import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";
import { Helper } from "./../lib/Helper";

import varStyles from "./../var-styles";
import "./workspace-menu.css";
import { BaseComponent } from "./base-component";
import { DialogService } from "./../services/dialog-service";

const styles = {
  main: {}
};

export class WorkspaceMenu extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  setSelected(obj) {
    this.setState({
      selected: obj
    });
  }

  addDashboard() {
    DialogService.instance().prompt(
      "New Dashboard",
      "Dashboard Name",
      "",
      r=>{
        if (this.props.workspace.dashboards[r]){
          return [`Dashboard name ${r} is not available`];
        }
        return [];
      },
      r => {
        if (r) {
          if (this.props.onCreateDashboard) this.props.onCreateDashboard(r);
        }
      }
    );
  }

  addDatasource() {
    DialogService.instance().prompt(
      "New Datasource",
      "Datasource Name",
      "",
      r=>{
        if (this.props.workspace.datasources[r]){
          return [`Datasource name ${r} is not available`];
        }
        return [];
      },
      r => {
        if (r) {
          if (this.props.onCreateDatasource) this.props.onCreateDatasource(r);
        }
      }
    );
  }

  dashboardClick(dashboard) {
    if (this.state.selected !== dashboard) {
      this.setSelected(dashboard);
      if (this.props.onSelectDashboard) this.props.onSelectDashboard(dashboard);
    }
  }
  datasourceClick(datasource) {
    if (this.state.selected !== datasource) {
      this.setSelected(datasource);
      if (this.props.onSelectDatasource)
        this.props.onSelectDatasource(datasource);
    }
  }

  renderDashboards() {
    let dashboards = this.props.workspace.dashboards;
    let items = [];
    for (let dashboard of Helper.asArray(dashboards)) {
      // items.push(
      //   <MenuItem value={dashboard.dashboardName} primaryText={dashboard.dashboardName}  />
      // );
      items.push(
        <li
          style={{
            color:
              this.state.selected === dashboard
                ? this.props.style.textSelectedColor
                : this.props.style.textColor
          }}
          onClick={() => this.dashboardClick(dashboard)}
        >
          {dashboard.dashboardName}
        </li>
      );
    }
    return (
      <div className="menu">
        <div>
          <span>Dashboards</span>
          <i
            className="material-icons button"
            onClick={this.addDashboard.bind(this)}
          >
            add
          </i>
        </div>
        <ul>{items}</ul>
      </div>
    );
  }

  renderDatasources() {
    let datasources = this.props.workspace.datasources;
    let items = [];
    for (let datasource of Helper.asArray(datasources)) {
      // items.push(
      //   <MenuItem value={dashboard.dashboardName} primaryText={dashboard.dashboardName}  />
      // );
      items.push(
        <li
          style={{
            color:
              this.state.selected === datasource
                ? this.props.style.textSelectedColor
                : this.props.style.textColor
          }}
          onClick={() => this.datasourceClick(datasource)}
        >
          {datasource.name}
        </li>
      );
    }
    return (
      <div className="menu">
        <div>
          <span>Datasets</span>
          <i
            className="material-icons button"
            onClick={this.addDatasource.bind(this)}
          >
            add
          </i>
        </div>
        <ul>{items}</ul>
      </div>
    );
  }

  render() {
    return (
      <Card style={{ background: this.props.style.background }}>
        <CardHeader
          title={
            <div style={{ whiteSpace: "nowrap" }}>
              {this.props.workspace.workspaceName}
            </div>
          }
          actAsExpander={true}
          showExpandableButton={true}
          titleStyle={{ color: this.props.style.color }}
        />
        <CardText expandable={true} style={{ color: "#fff" }}>
          {this.renderDashboards()}
          {this.renderDatasources()}
        </CardText>
      </Card>
    );
  }
}

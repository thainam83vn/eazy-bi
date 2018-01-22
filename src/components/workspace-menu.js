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
import { BaseComponent } from "./base-component";

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
        <div
          style={{
            cursor: "pointer",
            color:
              this.state.selected === dashboard
                ? this.props.style.textSelectedColor
                : this.props.style.textColor
          }}
          onClick={() => this.dashboardClick(dashboard)}
        >
          {dashboard.dashboardName}
        </div>
      );
    }
    return (
      <Card style={{ background: this.props.style.background }}>
        <CardHeader
          title="Dashboard"
          titleStyle={{ color: this.props.style.color }}
        />
        <CardText style={{ color: "#fff" }}>
          <div style={{ color: "#fff", cursor: "pointer" }}>{items}</div>
        </CardText>
      </Card>
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
        <div
          style={{
            cursor:"pointer",
            color:
            this.state.selected === datasource
                ? this.props.style.textSelectedColor
                : this.props.style.textColor
          }}
          onClick={() => this.datasourceClick(datasource)}
        >
          {datasource.name}
        </div>
      );
    }
    return (
      <Card style={{ background: this.props.style.background }}>
        <CardHeader
          title="Datasets"
          titleStyle={{ color: this.props.style.color }}
        />
        <CardText style={{ color: "#fff" }}>
          <div style={{ color: "#fff" }}>{items}</div>
        </CardText>
      </Card>
    );
  }

  render() {
    return (
      <Card style={{ background: this.props.style.background }}>
        <CardHeader
          title={
            <div style={{ whiteSpace: "nowrap" }}>{this.props.workspace.workspaceName}</div>
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

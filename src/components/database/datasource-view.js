import React from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import { BaseComponent } from "./../base-component";
import { Datasource } from "./../../base/datasource-model";
import { DatasourceSetting } from "./datasource-setting";
import { DatasourceData } from "./datasource-data";

export class DatasourceView extends BaseComponent {
  state = {
    datasource: null
  };
  constructor(props) {
    super(props);
  }
  setDatasource(d: Datasource) {
    this.setState({
      datasource: d
    });
  }
  render() {
    return (
      <div>
        <Tabs>
          <Tab label="Configuration">
            {this.state.datasource && (
              <DatasourceSetting datasource={this.state.datasource} />
            )}
          </Tab>
          <Tab label="Data">
            {this.state.datasource && (
              <DatasourceData datasource={this.state.datasource} />
            )}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

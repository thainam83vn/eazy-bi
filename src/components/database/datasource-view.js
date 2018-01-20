import React from "react";
import { Tabs, Tab } from "material-ui/Tabs";
import { BaseComponent } from "./../base-component";
import { Datasource } from "./../../base/datasource-model";
import { DatasourceSetting } from "./datasource-setting";
import { DatasourceData } from "./datasource-data";

import { ProxyData } from './../../base/proxy-data';

export class DatasourceView extends BaseComponent {
  viewData : DatasourceData;

  proxyData: ProxyData;
  state = {
    datasource: null
  };
  constructor(props) {
    super(props);
  }
  setDatasource(d: ProxyData) {
    this.proxyData = d;
    this.setState({
      datasource: d.data
    });
  }

  settingChange(ds){
    // this.proxyData.update(ds);
    this.viewData.refresh(ds);
  }

  render() {
    return (
      <div>
        <Tabs>
          <Tab label="Configuration">
            {this.state.datasource && (
              <DatasourceSetting datasource={this.state.datasource} onChange={this.settingChange.bind(this)} />
            )}
          </Tab>
          <Tab label="Data">
            {this.state.datasource && (
              <DatasourceData datasource={this.state.datasource} onInit={(e) => this.ovrInitChild("viewData", e)} />
            )}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

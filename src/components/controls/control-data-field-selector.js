import React from "react";
import { ControlSelect } from "./control-select";
import { DatasourceService } from "./../../services/datasource-service";

import { BaseControl } from "./base-control";

export class ControlDataFieldSelector extends BaseControl {
  constructor(props) {
    super(props);
    let proxyData = DatasourceService.instance().getDatasource(
      this.props.attributes.datasourceName
    );
    let datasource = proxyData.data;
    let attributes = this.props.attributes;
    attributes.options = [];
    if (datasource) {
      for (let name of datasource.data.header) {
        attributes.options.push({
          text: name,
          value: name
        });
      }
    }

    this.state = {
      attributes: attributes
    };

    this.props.attributes.onDatasourceChange.subcribe((dsName)=>{
      this.setDatasourceName(dsName);
    });
  }

  setDatasourceName(dsName){
    let proxyData = DatasourceService.instance().getDatasource(dsName);
    let datasource = proxyData.data;
    let attributes = this.props.attributes;
    attributes.options = [];
    if (datasource) {
      for (let name of datasource.data.header) {
        attributes.options.push({
          text: name,
          value: name
        });
      }
    }

    this.setState({
      attributes: attributes
    });
  }
  render() {
    return <ControlSelect onChange={e => this.valueChanged(e[this.state.attributes.name])} attributes={this.state.attributes} />;
  }
}

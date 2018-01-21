import React from "react";
import { ControlSelect } from "./control-select";
import { DatasourceService } from "./../../services/datasource-service";

import { BaseControl } from "./base-control";

export class ControlDatasourceSelector extends BaseControl {
  constructor(props) {
    super(props);
    let attributes = this.props.attributes;
    attributes.options = [];
    let dsNames = DatasourceService.instance().getDatasourceNames();
    for (let name of dsNames) {
      attributes.options.push({
        text: name,
        value: name
      });
    }

    this.state = {
      attributes: attributes
    };
  }
  render() {
    return <ControlSelect style={this.props.style} onChange={(e) => this.valueChanged(e[this.state.attributes.name])} attributes={this.state.attributes} />;
  }
}

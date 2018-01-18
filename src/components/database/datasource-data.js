import React from "react";
import { BaseComponent } from "./../base-component";
import { Datasource } from "./../../base/datasource-model";

export class DatasourceData extends BaseComponent {
  state = {
    datasource: null
  };
  constructor(props) {
    super(props);
    this.state = {
      datasource: props.datasource
    };
  }
  setDatasource(d: Datasource) {
    this.setState({
      datasource: d
    });
  }
  render() {
    return (
      <div>Data
      </div>
    );
  }
}

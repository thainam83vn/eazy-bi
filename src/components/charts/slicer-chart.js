import React from "react";
import { BaseChart } from "./chart";
import { ControlCheck } from "./../controls/control-check";
import { Helper } from "./../../lib/Helper";
import { DatasourceService } from "../../services/datasource-service";

export class SlicerChart extends BaseChart {
  constructor(props) {
    super(props);
    this.state = {
      attributes: this.props.attributes,
      values: null,

    };
    setTimeout(() => {
      this.ovrUpdateStateData();
    }, 50);
  }
  declares() {
    return {
      datasourceName: { type: "ControlDatasourceSelector" },
      field: { type: "ControlDataFieldSelector" }
    };
  }

  updateFilter(e) {
    console.log("updateFilter:", e);
    // let field = this.state.attributes.field;
    // let datasource = this.state.datasource;
    // datasource.updateFilter(field, v);
    // this.forceUpdate();
  }

  ovrInitState() {
    //override chart's method
  }

  ovrExtraStateValue() {
    return { values: [] };
  }

  ovrUpdateStateData() {
    // super.ovrUpdateStateData();
    this.proxyData = DatasourceService.instance().getDatasource(
      this.props.attributes.datasourceName
    );

    let field = this.state.attributes.field;
    let datasource = this.proxyData.data;
    let id = this.props.id;
    if (!datasource.filters[id])
      datasource.updateFilter(id, field, []);
    let oldField = datasource.filters[id].field;
    let filterValues = datasource.filters[id].values;
    if (oldField !== field) {
      datasource.updateFilter(id, field, []);
      // datasource.filters[id] = {field:field, values:[]};
    }

    let names = datasource.distinct(this.state.attributes.field);
    let options = {};
    for (let name of names) {
      let v = filterValues.indexOf(name) >= 0;
      options[name] = {
        name: name,
        value: v
      };
    }
    this.setState({
      values: options
    });
  }

  ovrDestroy() {
    let field = this.state.attributes.field;
    let datasource = this.proxyData.data;
    let id = this.props.id;
    datasource.updateFilter(id, field, []);
  }

  itemChanged(v, e) {
    let id = this.props.id;
    v.value = e[v.name];
    console.log("Item changed:", v, e, this.state.values);
    let filter = [];
    for (let option of Helper.asArray(this.state.values)) {
      if (option.value) {
        filter.push(option.name);
      }
    }
    let datasource = this.proxyData.data;
    datasource.updateFilter(id, this.state.attributes.field, filter);
    if (this.props.onChange)
      this.props.onChange(e);
  }

  render() {
    console.log("render slicechart");
    if (this.state.values) {
      return (
        <div style={{ width: this.props.width, height: this.props.height }}>
          <ul>
            {Helper.asArray(this.state.values).map(v => (
              <li key={v.name}>
                <ControlCheck
                  attributes={{
                    name: v.name,
                    value: v.value
                  }}
                  onChange={(e) => this.itemChanged(v, e)}
                />
                {v.name}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  }
}

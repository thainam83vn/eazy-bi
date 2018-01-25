import React from "react";
import { BaseChart } from "./chart";
import { ControlCheck } from "./../controls/control-check";
import { Helper } from "./../../lib/Helper";

export class SlicerChart extends BaseChart {
  constructor(props){
    super(props);
    setTimeout(()=>{
      this.ovrUpdateStateData();
    }, 100);
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

  ovrExtraStateValue() {
    return {values: []};
  }

  ovrUpdateStateData(){
    super.ovrUpdateStateData();
    let field = this.state.attributes.field;
    let datasource = this.state.datasource;
    let filter = datasource.filters[field];
    if (!filter) filter = [];
    let options = datasource.distinct(this.state.attributes.field);
    let values = {};
    for(let option of options){
      values[option] = {
        name:option,
        value:false
      };
    }
    this.setState({
      values:values
    });
  }

  render() {
    console.log("render slicechart");
    if (this.state.table) {
      return (
        <div style={{ width: this.props.width, height: this.props.height }}>
          <ul>
            {Helper.asArray(this.state.values).map(v => (
              <li>
                <ControlCheck
                  attributes={{
                    value: v.value
                  }}
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

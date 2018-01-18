import React from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

import { BaseComponent } from "./../base-component";
import { CsvSetting } from "./csv-setting";
import { Datasource } from "./../../base/datasource-model";

export class DatasourceSetting extends BaseComponent {
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
  updateField(name, value) {
    console.log("updateField:", name, value);
    this.setState((prevState, props)=>{
      prevState.datasource.setting[name] = value;
      return {
        datasource:prevState.datasource
      }
    });
  }
  renderDetailSetting(){
    if (this.state.datasource.setting.type === 'csv'){
      return (
        <CsvSetting />
      );
    }
    return null;
  }
  render() {
    if (this.state.datasource) {
      return (
        <div>
          <div>
            <SelectField
              floatingLabelText="Datasource Type"
              value={this.state.datasource.setting.type}
              onChange={(event, index, value) => this.updateField("type", value)}
            >
              <MenuItem value="csv" primaryText="CSV" />
              <MenuItem value="rest" primaryText="REST" />
              <MenuItem value="sqlserver" primaryText="SQL Server" />
            </SelectField>
            {this.renderDetailSetting()}
          </div>
        </div>
      );
    }
    return null;
  }
}

import React from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

import { BaseComponent } from "./../base-component";
import { CsvSetting } from "./csv-setting";
import { RestSetting } from "./rest-setting";
import { Datasource } from "./../../models/datasource-model";

const styles = {
  main: {
    height: "calc(100vh - 48px)"
  }
};

export class DatasourceSetting extends BaseComponent {
  state = {
    datasource: null
  };
  constructor(props) {
    super(props);
    this.state = {
      datasource: this.props.datasource
    };
  }
  setDatasource(d: Datasource) {
    this.setState({
      datasource: d
    });
  }
  updateField(name, value) {
    
    this.setState((prevState, props) => {
      prevState.datasource.setSetting({[name]: value});
      return {
        datasource: prevState.datasource
      };
    }, ()=>{
      console.log("updateField:", name, value, this.state.datasource);
      if (this.props.onChange) this.props.onChange(this.state.datasource);            
    });
  }
  // updateSettingCsv(csvStr) {
  //   console.log("updateSettingCsv:", csvStr);
  //   this.setState((prevState, props) => {
  //     prevState.datasource.setSetting(name, value);      
  //     prevState.datasource.setting.fileContent = csvStr;
  //     if (this.props.onChange) this.props.onChange(prevState.datasource);
  //     return {
  //       datasource: prevState.datasource
  //     };
  //   });
  // }
  renderDetailSetting() {
    if (this.state.datasource.setting.type === "csv") {
      return (
        <CsvSetting
          csv={this.state.datasource.setting.fileContent}
          onChange={csvStr => this.updateField("fileContent", csvStr)}
        />
      );
    }
    if (this.state.datasource.setting.type === "rest") {
      return (
        <RestSetting
          datasource={this.state.datasource}
          setting={this.state.datasource.setting}
          onChange={changes => this.updateField(changes)}
        />
      );
    }
    return null;
  }
  render() {
    if (this.state.datasource) {
      return (
        <div style={styles.main}>
          <div>
            <SelectField
              floatingLabelText="Datasource Type"
              value={this.state.datasource.setting.type}
              onChange={(event, index, value) =>
                this.updateField("type", value)}
            >
              <MenuItem value="csv" primaryText="CSV" />
              <MenuItem value="rest" primaryText="REST" />
              <MenuItem value="sqlserver" primaryText="SQL Server" />
            </SelectField>
            <div>{this.renderDetailSetting()}</div>
          </div>
        </div>
      );
    }
    return null;
  }
}

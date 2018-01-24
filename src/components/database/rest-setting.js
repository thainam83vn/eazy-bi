import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import JSONTree from 'react-json-tree';

import { BaseComponent } from "./../base-component";
import { ControlForm } from "./../controls/control-form";
import { HttpService } from "./../../services/http-service";

const declares = {
  url: { type: "ControlTextField" },
  method: {
    type: "ControlSelect",
    params: {
      options: [
        { text: "GET", value: "GET" },
        { text: "POST", value: "POST" },
        { text: "PUT", value: "PUT" },
        { text: "DELETE", value: "DELETE" }
      ]
    }
  },
  path: {
    type: "ControlTextField"
  },
  body: {
    type: "ControlTextField"
  }
};

export class RestSetting extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      setting: this.props.setting,
      restResult: "empty"
    };
    this.callRest();
  }
  callRest() {
    this.props.datasource.toJson((res)=>{
      this.setState({ restResult: res });
    });
    // HttpService.instance()
    //   .fetch(this.state.setting.url)
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log("Rest result:", res);
    //     this.setState({ restResult: JSON.stringify(res) });
    //   });
  }
  formChanged(data) {
    console.log("formChanged:", data);
  }
  render() {
    return (
      <div>
        <ControlForm
          declares={declares}
          data={this.state.setting}
          onChange={this.formChanged.bind(this)}
        />
        <RaisedButton onClick={this.callRest.bind(this)} primary={true}>Call Url</RaisedButton>
        <div style={{ boder: "1px solid #3d3d3d", color: "#3d3d3d" }}>
          <JSONTree data={this.state.restResult} />
        </div>
      </div>
    );
  }
}

import React from "react";
import { EventEmitter } from "./../../base/event-emitter";
import { BaseComponent } from "./../base-component";
import { ControlArray } from "./control-array";
import { ControlDynamic } from "./control-dynamic";
import components from "./control-index";

const StrDatasourceName = "datasourceName";

export class ControlForm extends BaseComponent {
  onDatasourceChange: EventEmitter = new EventEmitter();
  datasourceName = null;
  constructor(props) {
    super(props);
    this.datasourceName = this.props.data.datasourceName;
    this.state = {
      declares: this.props.declares,
      data: this.props.data
    };
  }
  valueChanged(e) {
    let newDatasourceName = null;
    for (let key in e) {
      this.state.data[key] = e[key];
      if (key === StrDatasourceName) {
        newDatasourceName = e[key];
      }
    }
    if (newDatasourceName) {
      this.datasourceName = newDatasourceName;
      this.onDatasourceChange.emit(newDatasourceName);
    }
    this.setState({ data: this.state.data });
    if (this.props.onChange)
      this.props.onChange(this.state.data);
    console.log("data change:", this.state.data);
  }
  renderRecursive(fieldName, atts, data) {
    if (typeof atts === "string") {
      // let Control = components[atts];
      // return <Control key={atts} attributes={{name:atts, value: data}} />;
      return (
        <ControlDynamic
          onChange={this.valueChanged.bind(this)}
          attributes={{
            name: fieldName,
            value: data,
            control: atts,
            datasourceName: this.datasourceName,
            onDatasourceChange: this.onDatasourceChange
          }}
        />
      );
    } else if (typeof atts === "object" && atts.length) {
      return (
        <ControlArray
          onChange={this.valueChanged.bind(this)}
          attributes={{
            name: fieldName,
            declares: atts,
            data: data,
            datasourceName: this.datasourceName,
            onDatasourceChange: this.onDatasourceChange
          }}
        />
      );
    } else if (typeof atts === "object") {
      let ls = [];
      for (let attKey in atts) {
        let attValue = atts[attKey];
        let dataValue = data[attKey];
        ls.push(this.renderRecursive(attKey, attValue, dataValue));
      }
      return <div className={fieldName}>{ls}</div>;
    }
  }

  render() {
    return (
      <div>
        {this.renderRecursive(
          "formControl",
          this.props.declares,
          this.props.data
        )}
      </div>
    );
  }
}

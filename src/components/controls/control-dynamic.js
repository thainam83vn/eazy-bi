import React from "react";
import { BaseControl } from "./base-control";
import components from "./control-index";

export class ControlDynamic extends BaseControl {
  valueChanged(e) {
    if (this.props.onChange) this.props.onChange(e);
  }
  render() {
    let Control = components[this.props.attributes.control];
    return (
      <Control
        onChange={this.valueChanged.bind(this)}
        key={this.props.attributes.name}
        attributes={this.props.attributes}
      />
    );
  }
}

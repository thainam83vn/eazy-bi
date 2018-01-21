import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";

import { BaseControl } from "./base-control";

const StrValueField = "value";
const StrTextField = "text";
export class ControlSelectMini extends BaseControl {
  renderButton() {
    if (this.props.itemButton) {
      let value = this.state.value ? this.state.value : this.props.attributes.name;
      return this.props.itemButton(value);
    }
    return <FlatButton style={{ width: "100%" }} label={(this.state.value ? this.state.value : this.props.attributes.name)} />;
  }
  render() {
    return (
      <IconMenu style={{ width: "100%" }}
        iconButtonElement={this.renderButton()}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        targetOrigin={{ horizontal: "left", vertical: "top" }}
      >
        {this.props.attributes.options.map(option => (
          <MenuItem value={this.props.valueField ? option[[this.props.valueField]] : option[[StrValueField]]} 
          primaryText={this.props.textField ? option[[this.props.textField]] : option[[StrTextField]]} 
          onClick={() => this.valueChanged(this.props.valueField ? option[[this.props.valueField]] : option[[StrValueField]])} />
        ))}
      </IconMenu>
    );
  }
}

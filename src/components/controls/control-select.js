import React from "react";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

import { BaseControl } from "./base-control";

export class ControlSelect extends BaseControl {
  render() {
    return (
      <SelectField
        floatingLabelText={this.props.attributes.name}
        value={this.state.value}
        onChange={(event, index, value) => this.valueChanged(value)}
      >
        {this.props.attributes.options.map(option => (
          <MenuItem value={option.value} primaryText={option.text} />
        ))}
      </SelectField>
    );

    // return <TextField
    //   defaultValue={this.props.attributes.value}
    //   floatingLabelText={this.props.attributes.name}
    //   onChange={e => this.valueChanged(e.nativeEvent.target.value)}
    // />;
  }
}

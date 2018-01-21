import React from 'react';
import TextField from "material-ui/TextField";

import { BaseControl } from './base-control';

export class ControlTextField extends BaseControl {
  render(){
    return <TextField
      style={this.props.style}
      defaultValue={this.props.attributes.value}
      floatingLabelText={this.props.attributes.name}
      onChange={e => this.valueChanged(e.nativeEvent.target.value)}
    />;
  }
}
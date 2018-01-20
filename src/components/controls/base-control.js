import React from "react";
import { BaseComponent } from "./../base-component";

export class BaseControl extends BaseComponent {
  constructor(props) {
    super(props);
    let value = null;
    if (this.props.attributes) value = this.props.attributes.value;
    this.state = {
      value: value
    };
  }
  valueChanged(value) {
    this.setState({ value: value }, () => {
      if (this.props.onChange)
        this.props.onChange({ [this.props.attributes.name]: value });
    });
  }
}

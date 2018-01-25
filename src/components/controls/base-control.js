import React from "react";
import { BaseComponent } from "./../base-component";

export class BaseControl extends BaseComponent {
  constructor(props) {
    super(props);
    let value = null;
    if (this.props.attributes) 
      value = this.props.attributes.value;
    
    this.ovrUpdateValue(value);
  }

  ovrUpdateValue(value) {
    if (!this.state) {
      this.state = {
        value: value
      };
    } else {
      this.setState({ value: value });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.ovrUpdateValue(nextProps.attributes.value);
  }

  valueChanged(v) {
    let cancel = false;
    if (this.props.onBeforeChange) {
      cancel = this.props.onBeforeChange({ [this.props.attributes.name]: v });
    }
    if (!cancel) {
      this.setState((prevState, props)=>{
        return { value: v};
        }, () => {
        if (this.props.onChange)
          this.props.onChange({ [this.props.attributes.name]: v });
      });
    }
  }
}

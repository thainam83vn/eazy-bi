import React from "react";
import { BaseControl } from "./base-control";

export class ControlCheck extends BaseControl {
  vc(e){
    e.preventDefault();
    console.log("vc");    
    this.valueChanged(!this.state.value);
  }
  render() {
    console.log("Checkbox render");
    return (
      <i class="material-icons no-mousedown" onClick={this.vc.bind(this)}>
        {this.state.value ? "check_box" : "check_box_outline_blank"}
      </i>
    );
  }
}

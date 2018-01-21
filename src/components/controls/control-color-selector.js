import React from "react";
import IconMenu from "material-ui/IconMenu";
import FlatButton from "material-ui/FlatButton";
import { SketchPicker } from "react-color";
import { BaseControl } from "./base-control";
import { ObjectHelper } from "./../../base/object-helper";

const styles = {
  boxBottomLine:{
    border:"none",
    borderBottom:"5px solid"
  }
}

export class ControlColorSelector extends BaseControl {
  value = "#ffffff";
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.attributes.value
    };
    this.value = this.props.attributes.value;
  }

  valueChanged(e){
    super.valueChanged(e);
    this.value = e;
    this.forceUpdate();
  }
 
  render() {
    return (
      <IconMenu style={this.props.style}
        iconButtonElement={
          <div>
            <div style={ObjectHelper.merge(styles.boxBottomLine, {borderBottomColor:this.value})}>
              <FlatButton label={this.props.attributes.name} />
            </div>            
          </div>
        }
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        targetOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <SketchPicker
          color={this.value}
          onChangeComplete={e => this.valueChanged(e.hex)}
        />
      </IconMenu>
    );

    // <SketchPicker />;
    // return <TextField
    //   defaultValue={this.props.attributes.value}
    //   floatingLabelText={this.props.attributes.name}
    //   onChange={e => this.valueChanged(e.nativeEvent.target.value)}
    // />;
  }
}

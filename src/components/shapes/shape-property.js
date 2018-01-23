import React from "react";
import TextField from "material-ui/TextField";
import { BaseComponent } from "./../base-component";
import { ControlForm } from "./../controls/control-form";
import { Helper } from "./../../lib/Helper";
import { Shape } from "./shape";

const styles = {
  main: {
    padding: "10px"
  }
};

export class ShapeProperty extends BaseComponent {
  shape: Shape;
  state = {
    styles: null
  };
  round = 0;

  constructor(props) {
    super(props);
  }
  setShape(shape) {
    this.loading(true, () => {
      this.round++;
      this.shape = shape;
      // let styles = Helper.predict(
      //   Helper.asArray(this.shape.styleCollection.styles),
      //   o => o.editor
      // );
      let styles = this.shape.styleCollection.output();
      for (let key in styles) {
        if (!StyleControlMapping[key]) delete styles[key];
      }
      this.setState({ styles: styles });
      this.loading(false);
      // console.log("property:", styles);
    });
  }
  valueChanged(e, style) {
    if (this.props.onChange) this.props.onChange(e);
    // console.log("Value changed:", e, style);
    // let name = style.name;
    // let value = e.target.value;
    // this.shape.updateStyle(e);

    // this.shape.styleCollection.update(style.name, e.target.value);
    // this.shape.refreshStyle();
  }
  render() {
    return (
      <div style={styles.main}>
        <div>
          <ControlForm
            onChange={this.valueChanged.bind(this)}
            declares={StyleControlMapping}
            data={this.props.data}
          />
        </div>
      </div>
    );
    // if (this.state.styles) {
    //   if (!this.isLoading) {
    //     return (
    //       <div style={styles.main}>
    //         <div>Style Properties</div>
    //         <div>
    //           <ControlForm
    //             onChange={this.valueChanged.bind(this)}
    //             declares={StyleControlMapping}
    //             data={this.state.styles}
    //           />
    //         </div>
    //       </div>
    //     );
    //   } else {
    //     return this.ovrLoadComponent();
    //   }
    // }
    return null;
  }
}

const StyleControlMapping = {
  background: {type:"ControlColorSelector"},
  color: {type:"ControlColorSelector"}
};

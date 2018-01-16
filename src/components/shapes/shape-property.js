import React from "react";
import TextField from "material-ui/TextField";
import { BaseComponent } from "./../base-component";
import { Helper } from "./../../lib/Helper";
import { Shape } from "./shape";

export class ShapeProperty extends BaseComponent {
  shape: Shape;
  state = {
    styles: []
  };
  round = 0;

  constructor(props) {
    super(props);
  }
  setShape(shape) {
    this.round++;
    this.shape = shape;
    let styles = Helper.predict(
      Helper.asArray(this.shape.styleCollection.styles),
      o => o.editor
    );
    this.setState({ styles: styles });
    console.log("property:", styles);
  }
  valueChanged(e, style) {
    console.log("Value changed:", e, style);
    let name = style.name;
    let value = e.target.value;
    this.shape.updateStyle({[name]:value});

    // this.shape.styleCollection.update(style.name, e.target.value);
    // this.shape.refreshStyle();
  }
  render() {
    return (
      <div>
        <div>Properties</div>
        <div>
          {this.state.styles.map(style => (
            <TextField
              key={this.round + style.name}
              defaultValue={style.value}
              floatingLabelText={style.name}
              onChange={e => this.valueChanged(e, style)}
            />
          ))}
        </div>
      </div>
    );
  }
}

import React from "react";
import components from './shape-index';

export class ShapeDynamic extends React.Component {
  initShape(shape) {
    if (this.props.onInit) this.props.onInit(shape);
  }
  dragShape(shape) {
    if (this.props.onDrag) this.props.onDrag(shape);
  }
  dropShape(shape) {
    if (this.props.onDrop) this.props.onDrop(shape);
  }
  selected(shape) {
    if (this.props.onSelected) this.props.onSelected(shape);
  }

  render() {
    let shape = this.props.shape;
    if (components.hasOwnProperty(shape.type)) {
      let Component = components[shape.type];
      return <Component key={shape.id}
        onInit={this.initShape.bind(this)}
        onDrag={this.dragShape.bind(this)}
        onDrop={this.dropShape.bind(this)}
        onSelected={this.selected.bind(this)}
        data={shape} />
    }
    return null;
  }
}

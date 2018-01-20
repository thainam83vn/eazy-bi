import React from "react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import IconButton from "material-ui/IconButton";
import { BaseControl } from "./base-control";
import { ControlDynamic } from "./control-dynamic";

const styles = {
  main: {
    border: "1px solid #adadad"
  }
};

export class ControlArray extends BaseControl {
  constructor(props) {
    super(props);
    this.state = {
      attributes: this.props.attributes
    };
  }
  addRow() {
    let newrow = {};
    for (let key in this.state.attributes.declares[0]) {
      newrow[key] = "";
    }
    this.state.attributes.data.push(newrow);
    this.setState({ attributes: this.state.attributes });
    if (this.props.onChange)
      this.props.onChange({
        [this.props.attributes.name]: this.state.attributes.data
      });
  }
  removeRow(row) {
    for (let i = 0; i < this.props.attributes.data.length; i++) {
      if (this.props.attributes.data[i] === row) {
        this.props.attributes.data.splice(i, 1);
        this.setState({ attributes: this.state.attributes });
        return;
      }
    }
    if (this.props.onChange)
      this.props.onChange({
        [this.props.attributes.name]: this.state.attributes.data
      });
  }
  itemChanged(row, e) {
    for (let key in e) {
      row[key] = e[key];
    }
    if (this.props.onChange)
      this.props.onChange({
        [this.props.attributes.name]: this.state.attributes.data
      });
  }
  render() {
    let result = [];
    for (let row of this.state.attributes.data) {
      let rowControl = [];
      for (let field in this.state.attributes.declares[0]) {
        let controlName = this.state.attributes.declares[0][field];
        let value = row[field];
        rowControl.push(
          <ControlDynamic
            onChange={e => this.itemChanged(row, e)}
            attributes={{
              name: field,
              value: value,
              control: controlName,
              datasourceName: this.props.attributes.datasourceName,
              onDatasourceChange: this.props.attributes.onDatasourceChange
            }}
          />
        );
      }
      result.push(
        <div>
          {rowControl}
          <IconButton onClick={() => this.removeRow(row)}>
            <i class="material-icons">delete</i>
          </IconButton>
        </div>
      );
    }
    return (
      <div style={styles.main}>
        <div style={styles.header}>{this.state.attributes.name}</div>
        {result}
        <FloatingActionButton mini={true} onClick={this.addRow.bind(this)}>
          <i class="material-icons">add</i>
        </FloatingActionButton>
      </div>
    );
  }
}

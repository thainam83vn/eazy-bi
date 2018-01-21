import React from "react";
import FlatButton from "material-ui/FlatButton";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from "material-ui/IconButton";
import { BaseControl } from "./base-control";
import { ControlDynamic } from "./control-dynamic";

import './control-array.css';

const styles = {
  main: {
    border: "1px solid #adadad"
  },
  row:{
    border:"none",
    borderBottom:"1px solid #adadad",
    position:'relative'
  },
  item: {
    width: 100
  }
};

export class ControlArray extends BaseControl {
  constructor(props) {
    super(props);
    this.state = {
      attributes: this.props.attributes
    };
  }
  emitOnChange(){
    if (this.props.onChange)
      this.props.onChange({
        [this.props.attributes.name]: this.state.attributes.data
      });
  }
  addRow() {
    let newrow = {};
    for (let key in this.state.attributes.declares[0]) {
      newrow[key] = "";
    }
    this.state.attributes.data.push(newrow);
    this.setState({ attributes: this.state.attributes }, ()=>{
      this.emitOnChange();
    });
  }
  removeRow(row) {
    for (let i = 0; i < this.props.attributes.data.length; i++) {
      if (this.props.attributes.data[i] === row) {
        this.props.attributes.data.splice(i, 1);
        this.setState({ attributes: this.state.attributes }, ()=>{
          this.emitOnChange();
        });
        return;
      }
    }
  }
  itemChanged(row, e) {
    for (let key in e) {
      row[key] = e[key];
    }
    this.emitOnChange();
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
            key={field}
            style={{width:100}}
            onChange={e => this.itemChanged(row, e)}
            attributes={{
              name: field,
              value: value,
              control: controlName,
              datasourceName: this.props.attributes.datasourceName,
              onDatasourceChange: this.props.attributes.onDatasourceChange,
              mini: true
            }}
          />
        );
      }
      result.push(
        <div style={styles.row}>
          {rowControl}
          <IconButton style={{position:"absolute", top: 0, right: 0}} onClick={() => this.removeRow(row)}>
            <i className="material-icons">delete</i>
          </IconButton>
        </div>
      );
    }
    return (
      <Card style={this.props.style}>
        <CardHeader
          title={
            <div>
              <span>{this.state.attributes.name}</span>
              {/* <FlatButton onClick={this.addRow.bind(this)} label="Add" />         */}
              <IconButton style={{position:"absolute", top: 0, right: 0}} onClick={this.addRow.bind(this)} >
                <i className="material-icons">add</i>
              </IconButton>
            </div>
          }
          // actAsExpander={true}
          // showExpandableButton={true}
        />        
        <CardText 
        // expandable={true}
        >
          {result}
          {/* <FlatButton onClick={this.addRow.bind(this)} label="Add" /> */}
        </CardText>
      </Card>
    );
  }
}

{/* <div style={styles.main}>
        <div style={styles.header}>{this.state.attributes.name}</div>
        
        <FloatingActionButton mini={true} onClick={this.addRow.bind(this)}>
          <i className="material-icons">add</i>
        </FloatingActionButton>
      </div> */}

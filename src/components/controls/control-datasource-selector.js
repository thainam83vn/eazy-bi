import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import Popover from "material-ui/Popover";
import "./control-datasource-selector.css";

import varStyles from "../../var-styles";
import { DatasourceService } from "./../../services/datasource-service";
import { BaseControl } from "./base-control";
import { Helper } from "../../lib/Helper";

export class ControlDatasourceSelector extends BaseControl {
  constructor(props) {
    super(props);
  }
  handleClick = event => {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  itemClicked(name) {
    let v = name;
    if (this.state.value !== v) {
      this.valueChanged(v);
      this.handleRequestClose();
    }
  }

  render() {
    let dsNames = DatasourceService.instance().getDatasourceNames();
    let cards = [];
    for (let name of dsNames) {
      cards.push(
        <li className="table" onClick={() => this.itemClicked(name)}>
          {this.state.value === name && (
            <i class="fa fa-check check" aria-hidden="true" />
          )}
          <span>{name}</span>
        </li>
      );
    }

    return (
      <div>
        <div>{this.props.attributes.name}</div>
        <RaisedButton
          onClick={this.handleClick}
          label={
            this.state.value ? (
              this.state.value
            ) : (
                this.props.attributes.name
              )
          }
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
          targetOrigin={{ horizontal: "left", vertical: "top" }}
          onRequestClose={this.handleRequestClose}
          style={{ background: varStyles.theme.colorLight }}
        >
          <ul className="tables">{cards}</ul>
        </Popover>
      </div>
    );
  }
  
  // render() {
  //   return <ControlSelect style={this.props.style} onChange={(e) => this.valueChanged(e[this.state.attributes.name])} attributes={this.state.attributes} />;
  // }
}

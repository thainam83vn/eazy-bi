import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import Popover from "material-ui/Popover";
import "./control-data-field-selector.css";

import varStyles from "../../var-styles";
import { DatasourceService } from "./../../services/datasource-service";
import { BaseControl } from "./base-control";
import { Helper } from "../../lib/Helper";

export class ControlDataFieldSelector extends BaseControl {
  constructor(props) {
    super(props);

    this.props.attributes.onDatasourceChange.subcribe(dsName => {
      this.forceUpdate();
    });
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

  itemClicked(datasource, header) {
    let v = `${header}`;
    if (this.state.value !== v) {
      this.valueChanged(v);
      this.handleRequestClose();
    }
  }

  render() {
    let ds = DatasourceService.instance().getDatasource(
      this.props.attributes.datasourceName
    ).data;
    let cards = [];
    let items = [];
    for (let header of ds.data.header) {
      items.push(
        <li className="field" onClick={() => this.itemClicked(ds, header)}>
          {this.state.value === header && (
            <i class="fa fa-check check" aria-hidden="true" />
          )}
          <span>{header}</span>
        </li>
      );
    }
    let card = (
      <li>
        <div>
          <i
            className="fa fa-table"
            aria-hidden="true"
            style={{ marginRight: 10 }}
          />
          {ds.name}
          <ul className="table">{items}</ul>
        </div>
      </li>
    );
    cards.push(card);

    return (
      <div>
        <div>{this.props.attributes.name}</div>
        <div>
          <RaisedButton
            onClick={this.handleClick}
            label={
              this.state.value ? this.state.value : this.props.attributes.name
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
            <ul className="tables-fields">{cards}</ul>
          </Popover>
        </div>
      </div>
    );
  }
}

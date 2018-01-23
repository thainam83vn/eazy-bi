import React from "react";
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

// import { ControlSelect } from "./control-select";
// import { ControlSelectMini } from "./control-select-mini";
import { DatasourceService } from "./../../services/datasource-service";

import { BaseControl } from "./base-control";
import { Card, CardHeader } from "material-ui/Card";
import CardText from "material-ui/Card/CardText";
import varStyles from "../../var-styles";
import { Helper } from "../../lib/Helper";

export class ControlDataFieldSelector extends BaseControl {
  constructor(props) {
    super(props);
    let proxyData = DatasourceService.instance().getDatasource(
      this.props.attributes.datasourceName
    );
    let datasource = proxyData.data;
    let attributes = this.props.attributes;
    attributes.options = [];
    if (datasource) {
      for (let name of datasource.data.header) {
        attributes.options.push({
          text: name,
          value: name
        });
      }
    }

    this.state = {
      attributes: attributes
    };

    this.props.attributes.onDatasourceChange.subcribe((dsName) => {
      this.setDatasourceName(dsName);
    });
  }

  setDatasourceName(dsName) {
    let proxyData = DatasourceService.instance().getDatasource(dsName);
    let datasource = proxyData.data;
    let attributes = this.props.attributes;
    attributes.options = [];
    if (datasource) {
      for (let name of datasource.data.header) {
        attributes.options.push({
          text: name,
          value: name
        });
      }
    }

    this.setState({
      attributes: attributes,
      open: false,
    });
  }
  handleClick = (event) => {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  itemClicked(datasource, header){
    let v = `${datasource.name}.${header}`;
    if (this.state.attributes.value!==v){
      this.valueChanged(v);
    }
  }

  render() {
    let allDS = DatasourceService.instance().getDatasources();
    let cards = [];
    for (let ds of allDS) {
      let items = [];
      for (let header of ds.data.header) {
        items.push(
          <li className="field" onClick={()=>this.itemClicked(ds, header)}>
            {this.state.attributes.value===`${ds.name}.${header}`&&<i class="fa fa-check check" aria-hidden="true"></i>}
            <span>{header}</span>
          </li>
        );
      }
      let card = (
        <li>
          <div >
            <i className="fa fa-table" aria-hidden="true" style={{ marginRight: 10 }}></i>{ds.name}
            <ul className="table">
              {items}
            </ul>
          </div>
        </li>

        // <Card style={{ background: varStyles.theme.colorMain }}>
        //   <CardHeader
        //     title={ds.name}
        //     titleStyle={{ color: varStyles.theme.textColor }}
        //     actAsExpander={true}
        //     showExpandableButton={true}
        //   />
        //   <CardText style={{ color: varStyles.theme.textColor }}  expandable={true}>
        //     {items}
        //   </CardText>
        // </Card>
      );
      cards.push(card);
    }

    return (
      <div>
        <RaisedButton
          onClick={this.handleClick}
          label={this.props.attributes.name}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
          style={{ background: varStyles.theme.colorLight }}
        >
          <ul className="tables-fields">
            {cards}
          </ul>
          {/* {allDS.map(ds =>
            <Menu>
              <MenuItem primaryText="Refresh" />
              <MenuItem primaryText="Help &amp; feedback" />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Sign out" />
            </Menu>
          )} */}

          {/* <Menu>
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help &amp; feedback" />
            <MenuItem primaryText="Settings" />
            <MenuItem primaryText="Sign out" />
          </Menu> */}
        </Popover>
      </div>
    );
    // if (this.props.attributes.mini == true)
    //   return <ControlSelectMini style={this.props.style} onChange={e => this.valueChanged(e[this.state.attributes.name])} attributes={this.state.attributes} />;
    // else  
    //   return <ControlSelect style={this.props.style} onChange={e => this.valueChanged(e[this.state.attributes.name])} attributes={this.state.attributes} />;

  }
}

// {
//   <Card style={{ background: varStyles.theme.colorMain}}>
//     <CardHeader
//       title={ds.name}
//       titleStyle={{ color: varStyles.theme.textColor }}
//     />
//     <CardText style={{ color: varStyles.theme.textColor }}>
//       {ds.data.header.map(h => {
//         <div style={{ color: "#fff", cursor: "pointer" }}>{h}</div>
//       })
//       }
//     </CardText>
//   </Card>
// }
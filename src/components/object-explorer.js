import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import { BaseComponent } from "./base-component";
import { ControlSelectMini } from './controls/control-select-mini';
import { SampleData } from "./../sample-data";
import { Datasource } from "./../models/datasource-model";
import { DatasourceService } from './../services/datasource-service';
import { ArrayHelper } from "../base/array-helper";
import { DialogService } from "../services/dialog-service";
import { Helper } from "../lib/Helper";
import { DesignBoard } from "./board";
import { ObjectHelper } from "../base/object-helper";
import { EntityService } from "../services/entity-service";

const StrDashboard = "Dashboard";

const styles = {
  main: {

  }
};

const sample = new SampleData();

export class ObjectExplorer extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    let names = EntityService.instance().getEntityNames();
    let items = [];
    for (let name of names) {
      items.push(
        <MenuItem value={name}
          primaryText={name}
          onClick={() => this.selectChart(name)} />
      );
    }
    return <div style={styles.main}>
      <Card >
        <CardHeader
          title="Charts"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <div>
            {items}
          </div>
          <div>
            <FlatButton label="Add" />
          </div>
        </CardText>
      </Card>
    </div>;
  }
}
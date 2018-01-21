import React from "react";
import { BaseComponent } from "./base-component";
import { ControlForm } from './controls/control-form';

import {Datasource} from './../models/datasource-model';
import {DatasourceService} from './../services/datasource-service';
import {SampleData} from './../sample-data';
const sample = new SampleData();

export class TestProperty extends BaseComponent {
  datasources = [
    new Datasource(sample.datasourceSampleCSV1("ds1")),
    new Datasource(sample.datasourceSampleCSV2("ds2"))
  ];

  constructor(props){
    super(props);
    for (let ds of this.datasources) {
      DatasourceService.instance().getDatasource(ds.name, ds);
    }
    this.state = {
      data: {
        XAxis: "name",
        YAxis: [
          { dataKey: "uv", fill: "#ff0000", stroke: "#ff0000" },
          { dataKey: "pv", fill: "#00ff00", stroke: "#00ff00" }
        ],
        datasourceName: "ds2"
      },
      declares: {
        XAxis: 'ControlTextField',
        YAxis: [
          { dataKey: "ControlDataFieldSelector", fill: "ControlColorSelector", stroke: "ControlColorSelector" },
        ],
        datasourceName: 'ControlDatasourceSelector'
      },
      loading: true
    };
    setTimeout(()=>{
      this.setState({
        loading: false
      })
    }, 100)
  }
  render(){
    if (!this.state.loading)
      return <ControlForm declares={this.state.declares} data={this.state.data} />;
    return null;
  }
}
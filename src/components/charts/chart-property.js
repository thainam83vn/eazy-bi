import React from "react";
import { BaseComponent } from "./../base-component";
import { ControlForm } from "./../controls/control-form";

import { Datasource } from "./../../models/datasource-model";
import { DatasourceService } from "./../../services/datasource-service";
import { Helper } from "./../../lib/Helper";

const styles = {
  main: {
    padding: "10px"
  }
};

export class ChartProperty extends BaseComponent {
  round = 0;

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      declares: this.props.declares
    };
  }

  setChart(chart, declares) {
    this.round++;
    this.chart = chart;
    this.setState({ chart: chart, declares: declares });
  }
  valueChanged(data) {
    if (this.props.onChange) this.props.onChange(data);
  }
  render() {
    return <div style={styles.main}>
      <ControlForm
        onChange={this.valueChanged.bind(this)}
        declares={this.state.declares}
        data={this.state.data.attributes}
      />
    </div>;
  }
}

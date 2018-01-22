import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";

import varStyles from "./../../var-styles";
import { BaseComponent } from "./../base-component";
import { ChartProperty } from "./../charts/chart-property";
import { ShapeProperty } from "./../shapes/shape-property";
import { ObjectHelper } from "./../../base/object-helper";

const styles = {
  main: {},
  button: {
    cursor: "pointer",
    marginRight: "10px"
  }
};

export class PropertyView extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 1,
      shapeView: this.props.shapeView
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps", nextProps);
    this.setShapeView(nextProps.shapeView);
  }

  selectTab(i) {
    if (this.state.tabIndex !== i) this.setState({ tabIndex: i });
  }

  setShapeView(shapeView) {
    if (this.state.shapeView !== shapeView)
      this.setState({ shapeView: shapeView });
  }

  shapePropertyChanged(e) {
    this.state.shapeView.updateStyle(e);
  }
  chartPropertyChanged(chartData) {
    console.log("chartPropertyChanged", chartData);
    this.state.shapeView.setChartData(chartData);
  }

  render() {
    console.log("property-view", this.state.shapeView);
    return (
      <div>
        <div>
          <i
            className="material-icons"
            style={ObjectHelper.merge(styles.button, {
              color:
                this.state.tabIndex === 1
                  ? varStyles.theme.textSelectedColor
                  : varStyles.theme.textColor
            })}
            onClick={() => this.selectTab(1)}
          >
            style
          </i>
          <i
            className="material-icons"
            style={ObjectHelper.merge(styles.button, {
              color:
                this.state.tabIndex === 2
                  ? varStyles.theme.textSelectedColor
                  : varStyles.theme.textColor
            })}
            onClick={() => this.selectTab(2)}
          >
            mode_edit
          </i>
        </div>
        {this.state.tabIndex === 1 &&
        this.state.shapeView && (
          <ShapeProperty
            data={this.state.shapeView.styleCollection.output()}
            onChange={this.shapePropertyChanged.bind(this)}
          />
        )}
        {this.state.tabIndex === 2 &&
        this.state.shapeView && (
          <ChartProperty
            data={this.state.shapeView.props.data.inner}
            declares={this.state.shapeView.chartView.declares()}
            onChange={this.chartPropertyChanged.bind(this)}
          />
        )}
        <div />
      </div>
    );
  }
}

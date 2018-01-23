import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";

import varStyles from "./../../var-styles";
import { BaseComponent } from "./../base-component";
import { ChartProperty } from "./../charts/chart-property";
import { ShapeProperty } from "./../shapes/shape-property";
import { ObjectHelper } from "./../../base/object-helper";

const styles = {
  main: {
    background: varStyles.theme.colorLight,
    color:"#fff"
  },
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
      shapeView: this.props.shapeView,
      show: true
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

  toggleMenu() {
    this.setState((prevState, props) => {
      return {
        show: !prevState.show
      }
    }, () => {
      if (this.props.onWidthChange)
        this.props.onWidthChange(this.getWidth());
    });
  }

  getWidth() {
    return this.state.show ? 300 : 30;
  }

  renderBody() {
    if (this.state.show) {
      let view = null;
      if (this.state.shapeView) {
        view = this.state.tabIndex === 1 ?
          (
            <ShapeProperty
              data={this.state.shapeView.styleCollection.output()}
              onChange={this.shapePropertyChanged.bind(this)}
            />
          ) :
          (<ChartProperty
            data={this.state.shapeView.props.data.inner}
            declares={this.state.shapeView.chartView.declares()}
            onChange={this.chartPropertyChanged.bind(this)}
          />
          );
      }
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
          {view}
        </div>
      );
    }


  }

  render() {
    console.log("property-view", this.state.shapeView);
    return (
      <div style={ObjectHelper.merge(styles.main, { width: this.getWidth() })}>
      
        <i className={this.state.show?"fa fa-bars":"fa fa-bars fa-rotate-90"} style={ObjectHelper.merge(styles.button, { position: "absolute", top: 5, right: -5, fontSize:20 })}
          onClick={this.toggleMenu.bind(this)}></i>
        {this.renderBody()}
      </div>
    );
  }
}

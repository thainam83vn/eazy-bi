import React from "react";
import { BaseComponent } from "./../base-component";
import { Shape } from "./shape";
import { ChartDynamic } from "./../charts/chart-dynamic";
import { BaseChart } from "./../charts/chart";
const styles = {
  main: {
    position: "absolute",
    top: 0,
    left: 0,
    overflow: "hidden"
  }
};

export class ChartShape extends Shape {
  chartData = null;
  chart: BaseChart;
  constructor(props) {
    super(props);
    this.chartData = this.props.data.chart;
    this.props.data.chart.attributes.width = this.props.data.style.width;
    this.props.data.chart.attributes.height = this.props.data.style.height;
    // this.setState({ loading: false });
    this.state.loading = false;
  }

  data(){
    let r = super.data();
    r.chart = this.chartData;
    return r;
  }

  initChart(chart) {
    this.chart = chart;
  }

  ovrDeclareStyle() {
    super.ovrDeclareStyle();
  }

  ovrRectChanged() {
    super.ovrRectChanged();
    this.setState({ loading: true });
    this.refreshChart();
  }

  setChartData(chartData){
    this.setState({ loading: true });
    setTimeout(() => {
      this.props.data.chart.attributes = chartData;
      console.log("updateChartData:", this.props.data.chart);
      
      this.setState({ loading: false });
    }, 200);
  }

  refreshChart() {
    if (this.state.loading) {
      if (this.state.isMouseDown) {
        setTimeout(() => {
          this.refreshChart();
        }, 100);
      } else {
        this.reloadChart();
      }
    }
  }

  reloadChart() {
    this.props.data.chart.attributes.width = this.state.style.width;
    this.props.data.chart.attributes.height = this.state.style.height;
    // this.chart.attributes.updateMany({
    //   width: this.state.style.width,
    //   height: this.state.style.height
    // });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 200);
  }

  ovrInner() {
    return (
      <div style={styles.main}>
        {this.state.loading && <span>moving...</span>}
        {!this.state.loading && (
          <ChartDynamic
            onInit={this.initChart.bind(this)}
            type={this.props.data.chart.type}
            chart={this.props.data.chart}
            onChange={(e)=>{if (this.props.onChange) this.props.onChange(e)}}
          />
        )}
      </div>
    );
  }
}

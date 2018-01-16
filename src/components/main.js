import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Drawer from "material-ui/Drawer";
import { BaseComponent } from "./base-component";
import { Board } from "./board";
import { ShapeProperty } from "./shapes/shape-property";
import { SampleData } from "./../sample-data";

const styles = {
  controls: {
    position: "absolute",
    bottom: 0,
    left: 0
  }
};

export class Main extends BaseComponent {
  state = {
    shapePropertyOpen: false
  };
  board: Board;
  propView: ShapeProperty;

  sample = new SampleData();

  initBoard(board) {
    this.board = board;
  }
  initProperty(propView) {
    this.propView = propView;
  }

  showProperty() {
    this.setState({ shapePropertyOpen: !this.state.shapePropertyOpen });
  }

  boardSelection(selected) {
    console.log("Shape selected:", selected);
    this.propView.setShape(selected);
  }

  addShape(shape) {
    this.board.addShape(shape);
  }

  render() {
    return (
      <div>
        <Drawer
          open={this.state.shapePropertyOpen}
          docked={true}
          openSecondary={true}
        >
          <ShapeProperty onInit={this.initProperty.bind(this)} />
        </Drawer>
        <Board
          onInit={this.initBoard.bind(this)}
          onShapeSelected={this.boardSelection.bind(this)}
        />
        <div style={styles.controls}>
          <IconMenu
            iconButtonElement={
              <FloatingActionButton mini={true}>
                <i class="material-icons">add</i>
              </FloatingActionButton>
            }
            anchorOrigin={{ horizontal: "left", vertical: "top" }}
            targetOrigin={{ horizontal: "left", vertical: "top" }}
          >
            <MenuItem
              primaryText="Rectangle"
              onClick={() => this.addShape(this.sample.addRect())}
            />
            <MenuItem
              primaryText="Circle"
              onClick={() => this.addShape(this.sample.addCircle())}
            />
            <MenuItem primaryText="Icon" />
            <MenuItem primaryText="Text" />

            <MenuItem
              primaryText="Line Chart"
              onClick={() => this.addShape(this.sample.addChart())}
            />
            <MenuItem
              primaryText="Bar Chart"
              onClick={() => this.addShape(this.sample.addBarChart())}
            />
            <MenuItem
              primaryText="Area Chart"
              onClick={() => this.addShape(this.sample.addAreaChart())}
            />
            <MenuItem
              primaryText="Compose Chart"
              onClick={() => this.addShape(this.sample.addComposeChart())}
            />
            <MenuItem
              primaryText="Scatter Chart"
              onClick={() => this.addShape(this.sample.addScatterChart())}
            />
          </IconMenu>
          <FloatingActionButton
            mini={true}
            onClick={this.showProperty.bind(this)}
          >
            <i class="material-icons">mode_edit</i>
          </FloatingActionButton>
        </div>
      </div>
    );
  }
}

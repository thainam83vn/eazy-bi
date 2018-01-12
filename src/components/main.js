import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FloatingActionButton from "material-ui/FloatingActionButton";
import Drawer from "material-ui/Drawer";

import { Board } from "./board";
import { ShapeProperty } from "./shapes/shape-property";
import { CustomLineChart } from "./charts/line-chart";

const styles = {
  controls: {
    position: "absolute",
    bottom: 0,
    left: 0
  }
};

export class Main extends React.Component {
  state = {
    shapePropertyOpen: false
  };
  board: Board;
  propView: ShapeProperty;

  addCircle() {
    let circle = {
      type: "Circle",
      background:"#3d3d3d",
      color: "#3d3d3d",
      width: 50,
      height: 50,
      x: 0,
      y: 0
    };
    this.board.addShape(circle);
  }
  addRect() {
    let rect = {
      type: "Shape",
      background: "#3d3d3d",
      color: "#3d3d3d",
      width: 50,
      height: 50,
      x: 0,
      y: 0
    };
    this.board.addShape(rect);
  } 

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
              onClick={this.addRect.bind(this)}
            />
            <MenuItem
              primaryText="Circle"
              onClick={this.addCircle.bind(this)}
            />
            <MenuItem primaryText="Icon" />
            <MenuItem primaryText="Text" />
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

import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { BaseComponent } from "./base-component";
import { DatabaseBoard } from "./database/database-board";
import { DesignBoard } from "./board";

const styles = {
  controls: {
    position: "absolute",
    bottom: 10,
    left: 0
  },
  toolbar: {
    display: "inline-block"
  }
};

export class Main extends BaseComponent {
  state = {
    screen: "Database"
  };
  board: DesignBoard;
  boardData = [];

  dbboard: DatabaseBoard;

  renderScreen() {
    if (this.state.screen === "Design") {
      return (
        <DesignBoard
          onInit={e => this.ovrInitChild("board", e)}
          data={this.boardData}
        />
      );
    } else {
      return <DatabaseBoard onInit={e => this.ovrInitChild("dbboard", e)} />;
    }
  }

  renderScreenMenu() {
    return (
      <IconMenu
        iconButtonElement={
          <FloatingActionButton mini={true}>
            {this.state.screen === "Design" && (
              <i class="material-icons">insert_chart</i>
            )}
            {this.state.screen === "Database" && (
              <i class="material-icons">storage</i>
            )}
          </FloatingActionButton>
        }
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
        targetOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <MenuItem
          primaryText="Design"
          onClick={() => this.switchTo("Design")}
        />
        <MenuItem
          primaryText="Database"
          onClick={() => this.switchTo("Database")}
        />
      </IconMenu>
    );
  }

  switchTo(mode) {
    if (this.state.mode !== mode) {
      if (mode !== "Design") {
        this.boardData = this.board.data();
        console.log("Board data:", this.boardData);
      }
      this.setState({ screen: mode });
    }
  }

  addShape(shape) {
    this.board.addShape(shape);
  }

  render() {
    return (
      <div>
        {this.renderScreen()}
        <div style={styles.controls}>{this.renderScreenMenu()}</div>
      </div>
    );
  }
}

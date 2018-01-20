import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FloatingActionButton from "material-ui/FloatingActionButton";
import { BaseComponent } from "./base-component";
import { DatabaseBoard } from "./database/database-board";
import { DesignBoard } from "./board";
import { SampleData } from "./../sample-data";
import { Datasource} from "./../base/datasource-model";
import { DatasourceService} from './../services/datasource-service';

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

const sample = new SampleData();

export class Main extends BaseComponent {
  state = {
    screen: "Design"
  };
  viewDesign: DesignBoard;
  boardData = [];

  viewDatabase: DatabaseBoard;
  datasources = [
    new Datasource(sample.datasourceSampleCSV1("ds1")),
    new Datasource(sample.datasourceSampleCSV2("ds2")),
    new Datasource(sample.datasourceSampleCSV3("ds3"))
  ];

  constructor(props){
    super(props);
    for(let ds of this.datasources){
      DatasourceService.instance().getDatasource(ds.name, ds);
    }
  }

  datasourceChanged(ds) {
    this.datasources = ds;
    this.viewDesign.setDatasources(this.datasources);
  }

  renderScreen() {
    if (this.state.screen === "Design") {
      return (
        <DesignBoard
          onInit={e => this.ovrInitChild("viewDesign", e)}
          data={this.boardData}
        />
      );
    } else {
      return (
        <DatabaseBoard
          datasources={this.datasources}
          onInit={e => this.ovrInitChild("viewDatabase", e)}
          onChange={this.datasourceChanged.bind(this)}
        />
      );
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
    if (this.state.screen !== mode) {
      if (mode !== "Design") {
        this.boardData = this.viewDesign.data();
        console.log("Board data:", this.boardData);
      }
      this.setState({ screen: mode });
    }
  }

  addShape(shape) {
    this.viewDesign.addShape(shape);
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

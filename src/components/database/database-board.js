import React from "react";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FloatingActionButton from "material-ui/FloatingActionButton";
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import { BaseComponent } from "./../base-component";
import { DatasourceView } from "./datasource-view";
import { Datasource } from "./../../base/datasource-model";
import { DialogService } from "./../../services/dialog-service";
import { SampleData } from './../../sample-data';

const styles = {
  main: {
    background: "#ededed",
    width: "100%",
    height: "calc(100vh - 50px)",
    display: "flex"
  },
  nav: {
    width: "150px",
    height: "100%",
    border: "none",
    borderRight: "1px solid #333",
    display: "inline-block"
  },
  content: {
    width: "calc(100% - 145px)",
    display: "inline-block"
  },
  footer: {
    width: "100%",
    background: "#3f51b5",
    height: "50px"
  },
  toolbar: {
    marginLeft: "50px"
  }
};

const sample = new SampleData();

export class DatabaseBoard extends BaseComponent {
  state = {
    datasources: []
  };

  datasourceView: DatasourceView;


  constructor(props) {
    super(props);
    this.datasources = this.props.datasources;
    if (!this.datasources) this.datasources = [];
  }
  selectDatasource(d){
    this.datasourceView.setDatasource(null);
    setTimeout(()=>{
      this.datasourceView.setDatasource(d);
    }, 100);
  }
  addSource() {
    DialogService.instance().prompt(
      "New Datasource",
      "Input Datasource Name",
      "",
      res => {
        if (res) {
          this.setState((prevState, props) => {
            let newds = prevState.datasources;
            newds.push(new Datasource(sample.datasourceSampleCSV1(res)));
            console.log("Datasources:", newds);
            return {
              datasources: newds
            };
          });
        }
      }
    );
  }
  renderToolbar() {
    return (
      <div style={styles.toolbar}>
        <IconMenu
          iconButtonElement={
            <FloatingActionButton mini={true}>
              <i class="material-icons">add</i>
            </FloatingActionButton>
          }
          anchorOrigin={{ horizontal: "left", vertical: "top" }}
          targetOrigin={{ horizontal: "left", vertical: "top" }}
        >
          <MenuItem primaryText="Source" onClick={() => this.addSource()} />
        </IconMenu>
      </div>
    );
  }
  render() {
    return (
      <div>
        <div style={styles.main}> 
          <div style={styles.nav}>
            <List>
              {this.state.datasources.map(d =>
                <ListItem primaryText={d.name} onClick={() => this.selectDatasource(d)}/>
              )}
            </List>
          
          </div>
          <div style={styles.content}>
            <DatasourceView onInit={(e) => this.ovrInitChild("datasourceView", e)} />
          </div>
        </div>
        <div style={styles.footer}>{this.renderToolbar()}</div> 
      </div>
    );
  }
}

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './workspace.css';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import SplitterLayout from 'react-splitter-layout';

import varStyles from './../var-styles';
import { BaseComponent } from './base-component';
import { DesignBoard } from './dashboard/board';
import { DatasourceView } from './database/datasource-view';
import { WorkspaceMenu } from './workspace-menu';
import { ControlSelectMini } from './controls/control-select-mini';
import { ControlCheck } from './controls/control-check';

import { SampleData } from './../sample-data';
import { Datasource } from './../models/datasource-model';
import { DatasourceService } from './../services/datasource-service';
import { DialogService } from '../services/dialog-service';
import { Helper } from '../lib/Helper';

import { DSWorkspace } from './../reducers/ds-workspace';

// const styles = {
//   main: {
//     color: varStyles.theme.textColor
//   },
//   footer: {
//     width: "100%",
//     background: varStyles.theme.colorDark,
//     height: "50px"
//   },
//   body: {
//     width: "100%",
//     background: "#fff",
//     height: "calc(100vh - 50px)"
//   },
//   left: {
//     background: varStyles.theme.colorLight,
//     height: "100%"
//   },
//   controls: {
//     position: "absolute",
//     bottom: 0,
//     left: 0
//   },
//   toolbar: {
//     display: "inline-block"
//   }
// };

const sample = new SampleData();

class Workspace extends BaseComponent {
  state = {
    screen: 'Design'
  };
  selectedWorkspace = sample.workspaceSample1('Workspace 1');
  constructor(props) {
    super(props);
    for (let ds of Helper.asArray(this.selectedWorkspace.datasources)) {
      DatasourceService.instance().getDatasource(ds.name, ds);
    }

    DSWorkspace.ins();

    this.state = {
      selectedDashboard: null,
      selectedDatasource: null
    };
  }
  componentWillReceiveProps(nextProps) {
    let selectedDashboard = null;
    if (
      !this.selectedDashboard &&
      nextProps.workspaces &&
      nextProps.workspaces.active
    ) {
      let arrDashboards = Helper.asArray(
        nextProps.workspaces.active.dashboards
      );
      if (arrDashboards.length > 0) {
        selectedDashboard = arrDashboards[0];
        this.state = {
          selectedDashboard: selectedDashboard
        };
      }
    }
  }

  selectDashboard(e) {
    this.setState({
      selectedDashboard: null,
      selectedDatasource: null
    });
    setTimeout(() => {
      this.setState({
        selectedDashboard: e
      });
    }, 50);
  }

  selectDatasource(e) {
    this.setState({
      selectedDashboard: null,
      selectedDatasource: null
    });
    setTimeout(() => {
      this.setState({
        selectedDatasource: e
      });
    }, 50);
  }

  createWorkspace() {
    DialogService.instance().prompt(
      'Create Workspace',
      'Workspace Name',
      '',
      r => {
        return [];
      },
      r => {
        if (r) {
          let newWp = sample.workspaceSample1(r);
          DSWorkspace.ins()
            .create(newWp)
            .then(data => {
              // this.props.actRefreshWorkspace();
            });
        }
      }
    );
  }

  activeWorkspace(wp) {
    DSWorkspace.ins()
      .setActive(wp)
      .then(e => {
        // this.props.actRefreshWorkspace();
      });
  }

  createDashboard(name) {
    let dashboard = sample.dashboardSample1(name);
    this.props.workspaces.active.dashboards[name] = dashboard;
    this.selectDashboard(dashboard);
  }

  createDatasource(name) {
    let datasource = new Datasource(sample.datasourceSampleCSV1(name));
    this.props.workspaces.active.datasources[name] = datasource;
    this.selectDatasource(datasource);
  }

  boardChanged(dashboard) {
    console.log('BoardChanged:', this.dashboards, dashboard);
  }

  datasourceChanged(ds) {}

  render() {
    return (
      <div className='main'>
        <div className='footer'>
          {/* <ControlCheck attributes={{ value: true }} /> */}
          <div className='logo'>Eazy BI powered by Thai</div>
        </div>

        <div className='body'>
          <SplitterLayout percentage={true} secondaryInitialSize={80}>
            <div className='left'>
              <div className='workspace-dropdown'>
                <IconMenu
                  iconButtonElement={
                    <div>
                      <span>
                        {this.props.workspaces.active
                          ? this.props.workspaces.active.workspaceName
                          : 'Select Workspace'}
                      </span>
                      <i className='fa fa-angle-right' aria-hidden='true' />
                    </div>
                  }
                  anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
                  targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                  {this.props.workspaces.entities.map(wp => (
                    <MenuItem
                      key={wp.workspaceName}
                      onClick={() => this.activeWorkspace(wp)}
                      primaryText={
                        <div className='workspace-dropdown-item'>
                          <span>{wp.workspaceName}</span>
                          {this.props.workspaces.active === wp && (
                            <i class='fa fa-check' aria-hidden='true' />
                          )}
                        </div>
                      }
                    />
                  ))}
                  <MenuItem
                    key='CREATE_WORKSPACE'
                    onClick={() => this.createWorkspace()}
                    primaryText={
                      <div className='workspace-dropdown-item'>
                        <span>Create Workspace</span>
                        {<i class='fa fa-add' aria-hidden='true' />}
                      </div>
                    }
                  />
                </IconMenu>
              </div>
              {this.props.workspaces.active && (
                <WorkspaceMenu
                  style={{
                    background: varStyles.theme.colorMain,
                    color: varStyles.theme.textColor,
                    textSelectedColor: varStyles.theme.textSelectedColor
                  }}
                  workspace={this.props.workspaces.active}
                  onSelectDashboard={this.selectDashboard.bind(this)}
                  onSelectDatasource={this.selectDatasource.bind(this)}
                  onCreateDashboard={this.createDashboard.bind(this)}
                  onCreateDatasource={this.createDatasource.bind(this)}
                />
              )}
            </div>
            <div className='right'>
              {this.state.selectedDashboard && (
                <DesignBoard
                  onInit={e => this.ovrInitChild('viewDesign', e)}
                  dashboard={this.state.selectedDashboard}
                  onChange={this.boardChanged.bind(this)}
                />
              )}
              {this.state.selectedDatasource && (
                <DatasourceView
                  style={{ headerBackground: varStyles.theme.colorMain }}
                  datasource={this.state.selectedDatasource}
                />
              )}
            </div>
          </SplitterLayout>
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    workspaces: state.workspaces
  };
};

export default connect(mapStateToProps)(Workspace);

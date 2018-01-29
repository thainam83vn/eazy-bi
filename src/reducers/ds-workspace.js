import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { SampleData } from "./../sample-data";
import { WorkspaceModel} from './../models/workspace-model';
import { StoreService} from './index';

let sample = new SampleData();

export class DSWorkspace {
  _ins = null;
  static ins(): DSWorkspace{
    if (!DSWorkspace._ins) DSWorkspace._ins = new DSWorkspace();
    return DSWorkspace._ins;
  }

  entities = [
  ];
  active = null;

  constructor(){
    this.entities = [
      sample.workspaceSample1("workspace 1"),
      sample.workspaceSample1("workspace 2")
    ];
    this.active = this.entities[0];
    this.dispatchStore();
  }

  dispatchStore(){
    StoreService.ins().dispatch({ type: "WORKSPACE_REFRESH", payload: this.data() });            
  }

  data(){
    return {
      entities: this.entities,
      active: this.active
    }
  }

  refresh(onSuccess, onFail){
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        this.dispatchStore();
        resolve(this.data);
      }, 500);
    });
  }

  create(wp: WorkspaceModel, onSuccess, onFail){
    return new Promise((resolve, reject)=>{
      setTimeout(() => {
        this.entities.push(wp);
        this.refresh().then((data)=>{
          resolve(data);
        });
      }, 500);
    });
  }

  setActive(wp, onSuccess, onFail){
    this.active = wp;    
    return new Promise((resolve, reject)=>{
      this.dispatchStore();
      resolve();
    });
    
  }
}


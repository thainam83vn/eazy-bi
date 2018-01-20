import { BaseModel } from "./base-model";
import { JsonHelper } from "./json-helper";

export class Datasource extends BaseModel {
  constructor(props) {
    super(props);
    this.toJson(data=>{
      this.data = data;
    })
  }

  toJson(callback) {
    let csv = this.setting.fileContent;
    JsonHelper.csvtojson(csv, json => {
      this.data = json;
      if (callback) callback(this.data);
    });
  }

  name: string;
  setting: any;
  data = [];

  getData(callback){
    
  }

  setSetting(setting){
    this.setting = setting;
    this.toJson();
    if (this.proxy) this.proxy.update(this);
  }
}

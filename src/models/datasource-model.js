import { BaseModel } from "./base-model";
import { JsonHelper } from "./../base/json-helper";

export class Datasource extends BaseModel {
  name: string;
  setting: any;
  data = [];
    
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

  setSetting(setting){
    this.setting = setting;
    this.toJson();
    if (this.proxy) this.proxy.update(this);
  }
}

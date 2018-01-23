import { BaseModel } from "./base-model";
import { JsonHelper } from "./../base/json-helper";
import { HttpService } from "./../services/http-service";

export class Datasource extends BaseModel {
  name: string;
  setting: any;
  data = [];

  constructor(props) {
    super(props);
    this.toJson(data => {
      this.data = data;
    });
  }

  toJson(callback) {
    if (this.setting.type === "csv") {
      let csv = this.setting.fileContent;
      JsonHelper.csvtojson(csv, json => {
        this.data = json;
        if (callback) callback(this.data);
      });
    }
    if (this.setting.type === "rest") {
      fetch(this.setting.url, {
        method: this.setting.method
      })
        .then(res => res.json())
        .then(res => {
          let r = res;
          let arrPath = this.setting.path.split(".");
          for (let pathItem of arrPath) {
            if (pathItem && pathItem !== "") {
              r = r[pathItem];
              if (!r) {
                if (callback) callback(r);
                return;
              }
            }
          }
          if (!r.length){
            r=[r];
          }
          let header = [];
          for (let k in r[0]) {
            header.push(k);
          }
          let data = {
            header: header,
            rows: r
          };
          this.data = data;
          if (callback) callback(data);
        });
    }
  }

  setSetting(pairs) {
    for (let k in pairs) {
      this.setting[k] = pairs[k];
    }
    this.toJson();
    if (this.proxy) this.proxy.update(this);
  }
}

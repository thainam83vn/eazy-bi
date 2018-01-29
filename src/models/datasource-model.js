import { BaseModel } from "./base-model";
import { JsonHelper } from "./../base/json-helper";
import { HttpService } from "./../services/http-service";
import { EventEmitter } from "../base/event-emitter";
import { Helper } from './../lib/Helper';


export class Datasource extends BaseModel {
  onChange: EventEmitter = new EventEmitter();

  name: string;
  setting: any;
  filters: any = {};
  rawData: any;
  data = [];

  constructor(props) {
    super(props);
    this.toJson(data => {
    });
  }

  toJson(callback) {
    if (this.setting.type === "csv") {
      let csv = this.setting.fileContent;
      JsonHelper.csvtojson(csv, json => {
        this.rawData = json;
        this.applyFilters();
        if (callback) callback(this.data);
        this.onChange.emit(this.data);
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
                this.onChange.emit(this.data);
                return;
              }
            }
          }
          if (!r.length) {
            r = [r];
          }
          let header = [];
          for (let k in r[0]) {
            header.push(k);
          }
          let data = {
            header: header,
            rows: r
          };
          this.rawData = data;
          this.applyFilters();
          if (callback) callback(data);
          this.onChange.emit(this.data);
        });
    }
  }

  applyFilters() {
    let result = [];
    if (this.rawData) {
      for (let row of this.rawData.rows) {
        if (this.validateFilter(row)) {
          result.push(row);
        }
      }
    }
    if (this.data.rows !== result) {
      this.data = {
        header: this.rawData.header,
        rows:result
      };
      this.onChange.emit(this.data);
    }
  }

  validateFilter(row) {
    let b = true;
    for (let key in this.filters) {
      let {field, values} = this.filters[key];
      if (values === null || values.length ===0)
        continue;
      let v = row[field];
      b = b && values.indexOf(v)>=0;
      if (!b) return false;
    }
    return b;
  }

  updateFilter(id, field, v) {
    console.log("updateFilter", field, v);
    this.filters[id] = {
      field: field,
      values: v
    }
    this.applyFilters();
  }

  distinct(field) {
    let r = [];
    this.rawData.rows.map(row => {
      if (r.indexOf(row[field]) < 0)
        r.push(row[field]);
    });
    return r;
  }

  setSetting(pairs) {
    for (let k in pairs) {
      this.setting[k] = pairs[k];
    }
    this.toJson();
    if (this.proxy) this.proxy.update(this);
  }
}

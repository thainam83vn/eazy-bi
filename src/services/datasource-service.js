import { ProxyData } from "./../base/proxy-data";
import { BaseService } from "./base-service";

export class DatasourceService extends BaseService {
  static _instance = null;
  static instance(): DatasourceService {
    if (!DatasourceService._instance) {
      DatasourceService._instance = new DatasourceService();
    }
    return DatasourceService._instance;
  }

  datasources = {};

  getDatasource(name, datasource): ProxyData {
    if (!this.datasources[name]) {
      let proxydata = new ProxyData(datasource);
      this.datasources[name] = proxydata;
    }
    return this.datasources[name];
  }

  getDatasourceNames(): string[]{
    let names = [];
    for(let k in this.datasources){
      names.push(k);
    }
    return names;
  }
}

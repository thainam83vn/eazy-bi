import { ProxyData } from "./../base/proxy-data";
import { BaseService } from "./base-service";

export class EntityService extends BaseService {
  static _instance = null;
  static instance(): EntityService {
    if (!EntityService._instance) {
        EntityService._instance = new EntityService();
    }
    return EntityService._instance;
  }

  entity = {};

  getEntity(name, entity): ProxyData {
    if (!this.entity[name]) {
      let proxydata = new ProxyData(entity);
      this.entity[name] = proxydata;
    }
    return this.entity[name];
  }

  getEntityNames(): string[]{
    let names = [];
    for(let k in this.entity){
      names.push(k);
    }
    return names;
  }
}

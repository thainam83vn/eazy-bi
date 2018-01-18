import {BaseService} from './base-service';

export class DialogService extends BaseService {
  static _instance = null;
  static instance(): DialogService{
    if (!DialogService._instance){
      DialogService._instance = new DialogService();
    }
    return DialogService._instance;
  }

  alert(title, message, callback){
    alert(message);
    if (callback) callback();
  }

  confirm(title, message, callback) {
    var res = window.confirm(message);
    if (callback) callback(res);
  }

  prompt(title, message, value, callback) {
    var res = prompt(message, value);
    if (callback) callback(res);
  }
}
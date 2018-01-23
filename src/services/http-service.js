import { BaseService } from "./base-service";

export class HttpService extends BaseService {
  static _instance = null;
  static instance(): HttpService {
    if (!HttpService._instance) {
      HttpService._instance = new HttpService();
    }
    return HttpService._instance;
  }

  fetch(url){
    return fetch(url);
  }
}








// if (this.setting.type === "rest") {
//   fetch(this.setting.url)
//     .then(res => res.json())
//     .then(res => {
//       if (callback) callback(res);
//     });
// }
import { BaseModel } from "./base-model";
import { EntityModel } from "./entity-model";

export class DashboardItemModel extends BaseModel {
  id: string;
  inner: any;
  styles:any;
  constructor(props) {
    super(props);
  }
}


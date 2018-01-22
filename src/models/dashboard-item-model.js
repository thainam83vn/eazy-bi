import { BaseModel } from "./base-model";
import { EntityModel } from "./entity-model";

export class DashboardItemModel extends BaseModel {
  id: string;
  chartName: string;
  styles:any;
  constructor(props) {
    super(props);
  }
}


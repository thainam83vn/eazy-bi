import { BaseModel } from "./base-model";
import { DashboardItemModel } from "./dashboard-item-model";

export class DashboardModel extends BaseModel {
  name: string;
  items: DashboardItemModel[];
  constructor(props) {
    super(props);
  }
}


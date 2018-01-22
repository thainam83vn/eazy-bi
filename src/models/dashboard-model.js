import { BaseModel } from "./base-model";
import { DashboardItemModel } from "./dashboard-item-model";

export class DashboardModel extends BaseModel {
  dashboardName: string;
  items: DashboardItemModel[];
  constructor(props) {
    super(props);
  }
}


import { BaseModel } from "./base-model";

export class WorkspaceModel extends BaseModel {
  workspaceName: string;
  dashboards: any;
  datasources: any;
  constructor(props) {
    super(props);
  }
}


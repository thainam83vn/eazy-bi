import { BaseModel } from "./base-model";

export class EntityModel extends BaseModel {
  name: string;
  type: string;
  attributes: any;
  constructor(props) {
    super(props);
  }
}


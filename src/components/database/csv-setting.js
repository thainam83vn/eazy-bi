import React from "react";
import { BaseComponent } from "./../base-component";
import { Uploader } from "./../commons/uploader";

import { Datasource } from "./../../base/datasource-model";

export class CsvSetting extends BaseComponent {
  render(){
    return (
      <Uploader />
    );
  }
}
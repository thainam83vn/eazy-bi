import React from "react";

import { BaseComponent } from "./../base-component";
import { Uploader } from "./../commons/uploader";

export class CsvSetting extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = {
      csv: this.props.csv
    }
  }
  uploaded(csvStr) {
    this.setState({csv:csvStr});
    if (this.props.onChange) this.props.onChange(csvStr);
  }
  render() {
    return (
      <div>
        <Uploader onUploaded={this.uploaded.bind(this)} />
        {this.state.csv}
      </div>
    );
  }
}

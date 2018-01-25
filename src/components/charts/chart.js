import React from "react";
import { BaseComponent } from "./../base-component";
import { AttributeCollection } from "./../../base/attribute-collection";
import { ProxyData } from "./../../base/proxy-data";
import { DatasourceService } from "./../../services/datasource-service";

export class BaseChart extends BaseComponent {
  proxyData: ProxyData;
  attributes: AttributeCollection;
  constructor(props) {
    super(props);
    this.ovrDeclareAttributes();
    this.proxyData = DatasourceService.instance().getDatasource(
      this.props.attributes.datasourceName
    );
    this.proxyData.onChange.subcribe(d => {
      this.ovrUpdateStateData();
    });

    let stateValues = {
      datasource: this.proxyData.data,
      table: this.proxyData.data.data,
      data: this.proxyData.data.data.rows,
      attributes: this.attributes.output()
    }
    let extra = this.ovrExtraStateValue();
    for(let k in extra){
      stateValues[k] = extra[k];
    }
    this.state = stateValues;
  }

  ovrExtraStateValue() {
    return {};
  }

  ovrUpdateStateData() {
    this.setState({ data: this.proxyData.data.data.rows });
  }

  ovrDeclareAttributes() {
    this.attributes = new AttributeCollection();
    for (let k in this.props.attributes) {
      this.attributes.add(k, this.props.attributes[k], "TextBox");
    }
    this.attributes.onChange.subcribe(e => {
      this.setState({ attributes: this.attributes.output() });
    });
  }

  declares() {
    return {};
  }
}

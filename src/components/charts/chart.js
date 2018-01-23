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
    let arrData = this.props.attributes.
    this.proxyData = DatasourceService.instance().getDatasource(
      this.props.attributes.datasourceName
    );
    this.proxyData.onChange.subcribe(d => {
      this.setStateData();
    });

    this.state = {
      data: this.proxyData.data.data.rows,
      attributes: this.attributes.output()
    };
  }

  setStateData() {
    this.setState({ data: this.proxyData.data.data.rows });
    // this.proxyData.data.toJson(data=>{
    //   this.setState({data: data.rows});
    // });
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

import React from "react";
import { BaseComponent } from "./../base-component";
import { AttributeCollection } from "./../../base/attribute-collection";
import { ProxyData } from "./../../base/proxy-data";
import { DatasourceService } from "./../../services/datasource-service";

export class BaseChart extends BaseComponent {
  proxyData: ProxyData;
  attributes: AttributeCollection;

  idChangeHandleHandle = null;

  changeHandle = d => {
    console.log("Datasource changed", d);
    this.ovrUpdateStateData();
  };
  constructor(props) {
    super(props);
    this.ovrDeclareAttributes();    
    this.ovrInitState();
  }

  componentWillUnmount() {
    this.proxyData.data.onChange.unsubcribe(this.idChangeHandleHandle);
  }

  ovrInitState(){
    this.proxyData = DatasourceService.instance().getDatasource(
      this.props.attributes.datasourceName
    );
    // this.proxyData.onChange.subcribe(d => {
    //   this.ovrUpdateStateData();
    // });
    this.idChangeHandleHandle = this.proxyData.data.onChange.subcribe(this.changeHandle);

    let stateValues = {
      datasource: this.proxyData.data,
      table: this.proxyData.data.data,
      data: this.proxyData.data.data.rows,
      attributes: this.attributes.output()
    }
    let extra = this.ovrExtraStateValue();
    for (let k in extra) {
      stateValues[k] = extra[k];
    }
    this.state = stateValues;
  }

  ovrExtraStateValue() {
    return {};
  }

  ovrUpdateStateData() {
    console.log("ovrUpdateStateData " + this.props.type);
    this.setState({
      table: this.proxyData.data.data,
      data: this.proxyData.data.data.rows
    });
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

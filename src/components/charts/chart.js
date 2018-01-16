import React from 'react';
import { BaseComponent } from "./../base-component";
import { AttributeCollection } from './../../base/attribute-collection';

export class BaseChart extends BaseComponent {
  attributes: AttributeCollection;
  constructor(props){
    super(props);    
    this.ovrDeclareAttributes();

    this.state = {
      data: this.props.data,
      attributes: this.attributes.output()
    };
  }

  ovrDeclareAttributes(){
    this.attributes = new AttributeCollection();
    for(let k in this.props.attributes){
      this.attributes.add(k, this.props.attributes[k], "TextBox");
    }
    this.attributes.onChange.subcribe((e) => {
      this.setState({ attributes: this.attributes.output() });
    });
  }
}
import React from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";

import { BaseComponent } from "./../base-component";
import { Datasource } from "./../../models/datasource-model";
export class DatasourceData extends BaseComponent {
  datasource: Datasource;
  constructor(props) {
    super(props);
    this.state = {
      table: null
    };
    this.refresh(props.datasource);
  }

  refresh(ds) {
    this.datasource = ds;
    this.refreshData();
  }

  refreshData() {
    this.setState({
      table: this.datasource.data
    });
    // this.datasource.toJson(table=>{
    //   this.setState({
    //     table: table
    //   });
    // });
  }

  setDatasource(d: Datasource) {
    this.setState({
      datasource: d
    });
  }
  render() {
    if (this.state.table) {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              {this.state.table.header.map(h => (
                <TableHeaderColumn key={h}>{h}</TableHeaderColumn>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.state.table.rows.map(r => (
              <TableRow key={r.index}>
                {this.state.table.header.map(h => (
                  <TableRowColumn key={h + r.index}>{r[h]}</TableRowColumn>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
    return null;
  }
}

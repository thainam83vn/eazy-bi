import React from "react";
import Dropzone from "react-dropzone";

import { BaseComponent } from "./../base-component";

export class Uploader extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { table: null, csv: null, file: null };
  }

  onDrop(files) {
    console.log(files);
    let file = files[0];
    let start = 0;
    let stop = file.size - 1;
    let reader = new FileReader();
    reader.onloadend = evt => {
      if (evt.target.readyState === FileReader.DONE) {
        let csvStr = evt.target.result;
        this.setState({csv: csvStr});
        if (this.props.onUploaded)
          this.props.onUploaded(csvStr);
      }
    };
    var blob = file.slice(start, stop + 1);
    reader.readAsBinaryString(blob);
    this.setState({file: file});
  }

  
  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p style={{color:"#3d3d3d"}}>
              Try dropping some files here, or click to select files to upload.
            </p>
          </Dropzone>
        </div>
        <br/>
        <aside>
          {this.state.file}
        </aside>
      </section>
    );
  }
}

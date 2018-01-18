import React from 'react';
import Dropzone from 'react-dropzone';

import {BaseComponent} from './../base-component';

export class Uploader extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = { files: [] }
  }

  onDrop(files) {
    console.log(files);
    this.setState({
      files
    });
  }

  render() {
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    );
  }
  
}
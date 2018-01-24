import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import { EventEmitter } from "./../base/event-emitter";
import { BaseService } from "./base-service";
import { ControlTextField } from "./../components/controls/control-text-field";

export class DialogService extends BaseService {
  static _instance = null;
  static instance(): DialogService {
    if (!DialogService._instance) {
      DialogService._instance = new DialogService();
    }
    return DialogService._instance;
  }

  onShowDialog: EventEmitter = new EventEmitter();
  onCloseDialog: EventEmitter = new EventEmitter();

  state = {};

  alert(title, message, callback) {
    let handleClose = () => {
      if (callback) callback();
      this.onCloseDialog.emit();
    };
    const actions = [
      <FlatButton
        label="Okay"
        primary={true}
        keyboardFocused={true}
        onClick={handleClose}
      />
    ];

    let dialog = (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={handleClose}
      >
        {message}
      </Dialog>
    );
    this.onShowDialog.emit(dialog);
  }

  confirm(title, message, callback) {
    let handleClose = r => {
      if (callback) callback(r);
      this.onCloseDialog.emit();
    };
    const actions = [
      <FlatButton
        label="Okay"
        primary={true}
        keyboardFocused={true}
        onClick={() => handleClose(true)}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        keyboardFocused={true}
        onClick={() => handleClose(false)}
      />
    ];

    let dialog = (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={handleClose}
      >
        {message}
      </Dialog>
    );
    this.onShowDialog.emit(dialog);
  }

  prompt(title, message, value, validator, callback) {
    let dialog = (
      <PromptDialog
        title={title}
        message={message}
        value={value}
        validator={validator}
        callback={r => callback(r)}
        onCloseDialog={() => this.onCloseDialog.emit()}
      />
    );
    this.onShowDialog.emit(dialog);

    /*
    let handleChange = e => {
      this.state.promptInput = e.input;
      if (validator) {
        let errors = validator(this.state.promptInput);
      }
    };
    let handleClose = r => {
      if (callback) callback(r);
      delete this.state.promptInput;
      this.onCloseDialog.emit();
    };
    const actions = [
      <FlatButton
        label="Okay"
        primary={true}
        keyboardFocused={true}
        onClick={() => handleClose(this.state.promptInput)}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        keyboardFocused={true}
        onClick={() => handleClose(null)}
      />
    ];

    let body = (
      <ControlTextField
        attributes={{ name: "input", value: value }}
        onChange={e => handleChange(e)}
      />
    );

    let dialog = (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={handleClose}
      >
        {body}
      </Dialog>
    );
    this.onShowDialog.emit(dialog);
    */
  }
}

export class PromptDialog extends React.Component {
  state = {
    promptInput: null,
    errors: []
  };
  handleChange(e) {
    this.state.promptInput = e.input;
    if (this.props.validator) {
      let errors = this.props.validator(this.state.promptInput);
      if (errors!==this.state.errors)
        this.setState({ errors: errors });
    }
  }
  handleClose(r) {
    if (this.props.callback) this.props.callback(r);
    // delete this.state.promptInput;
    this.props.onCloseDialog();
  }

  render() {
    const actions = [
      <FlatButton
        label="Okay"
        primary={true}
        keyboardFocused={true}
        onClick={() => this.handleClose(this.state.promptInput)}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        keyboardFocused={true}
        onClick={() => this.handleClose(null)}
      />
    ];

    let body = (
      <ControlTextField
        attributes={{ name: "input", value: this.props.value }}
        onChange={e => this.handleChange(e)}
      />
    );

    let errorMessages = (
      <ul style={{color:"#ff00000"}}>
        {this.state.errors.map(error => 
          <li>{error}</li>
        )}
      </ul>
    );

    let dialog = (
      <Dialog
        title={this.props.title}
        actions={actions}
        modal={false}
        open={true}
        onRequestClose={() => this.handleClose(null)}
      >
        {body}
        {errorMessages}
      </Dialog>
    );
    return dialog;
  }
}
// export class DialogService extends BaseService {
//   static _instance = null;
//   static instance(): DialogService{
//     if (!DialogService._instance){
//       DialogService._instance = new DialogService();
//     }
//     return DialogService._instance;
//   }

//   alert(title, message, callback){
//     alert(message);
//     if (callback) callback();
//   }

//   confirm(title, message, callback) {
//     var res = window.confirm(message);
//     if (callback) callback(res);
//   }

//   prompt(title, message, value, callback) {
//     var res = prompt(message, value);
//     if (callback) callback(res);
//   }
// }

import React from "react";
import { DialogService } from "./../services/dialog-service";

export class DialogContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: null
    };

    DialogService.instance().onShowDialog.subcribe(dialog => {
      console.log("Received Dialog Comp", this.state.dialog);
      this.setState({ dialog: dialog });
    });
    DialogService.instance().onCloseDialog.subcribe(() => {
      this.setState({ dialog: null });
    });
  }

  render() {
    console.log("Dialog Comp",this.state.dialog);
    return <div>{this.state.dialog}</div>;
  }
}

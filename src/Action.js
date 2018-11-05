import React, { Component } from "react";
import Option from "./Option";
import Update from "./Update";
import AddNew from "./AddNew";
class Action extends Component {
  constructor() {
    super();
    this.state = {
      owners: [],
      changedUser: { name: "Emily Durham", email: "", text: "" }
    };
  }

  render() {
    // let owners = this.props.owners;
    // let names = this.props.names;
    // let emailType = this.props.emailType;
    return (
      <div className="Action">
        <Update
          owners={this.props.owners}
          emailType={this.props.emailType}
          selectedUser={this.props.selectedUser}
          searchUserByName={this.props.searchUserByName}
          names={this.props.names}
          changeUser={this.props.changeUser}
        />
        <AddNew
          addNewUser={this.props.addNewUser}
          owners={this.props.owners}
          emailType={this.props.emailType}
        />
      </div>
    );
  }
}

export default Action;

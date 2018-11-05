import React, { Component } from "react";
class ClientsRow extends Component {
  userSold = user => {
    if (user) {
      return <div>&#10003;</div>;
    } else {
      return <div>&#215;</div>;
    }
  };

  changes = event => {
    this.props.openChangesWindow(this.props.data);
    this.props.userData(this.props.data);
  };
  render() {
    let user = this.props.data;
    return (
      <div
        onClick={event => {
          this.changes(event);
        }}
        myattribute="id"
        className="table-wrapper"
      >
        <div>{user.name.split(" ")[0]}</div>
        <div>{user.name.split(" ")[1]}</div>
        <div>{user.country}</div>
        <div>{user.firstContact.slice(0, 7)}</div>
        <div>{user.emailType}</div>
        <div>{this.userSold(user.sold)}</div>
        <div>{user.owner}</div>
      </div>
    );
  }
}

export default ClientsRow;

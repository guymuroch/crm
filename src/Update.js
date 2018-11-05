import React, { Component } from "react";
import Option from "./Option";
import TextInput from "react-autocomplete-input";
import "react-autocomplete-input/dist/bundle.css";

class Update extends Component {
  constructor() {
    super();
    this.state = {
      change: {},
      changesConfirm: false
    };
  }

  // change chosen user owner
  userOwnerUpdate = event => {
    let ownerName = event.target.value;
    let Newchange = this.state.change;
    Newchange.owner = ownerName;
    this.setState({
      change: Newchange
    });
  };

  // change chosen user emailType
  userEmailUpdate = event => {
    let emailType = event.target.value;
    let Newchange = this.state.change;
    Newchange.emailType = emailType;
    this.setState({
      change: Newchange
    });
  };

  // fetch chosen user object by name
  getName(event) {
    let text = event.substring(1, event.length);
    text = event.substring(1, event.length - 1);
    this.props.searchUserByName(text);
  }
  submitChanges = () => {
    let user = this.props.selectedUser;
    let changes = this.state.change;
    if (changes.owner === undefined) {
    } else if (changes.owner.length >= 3) {
      user.owner = changes.owner;
    }
    if (changes.emailType === undefined) {
    } else if (changes.emailType.length >= 1) {
      user.emailType = changes.emailType;
    }
    this.props.changeUser(user);
    this.setState({
      changesConfirm: true
    });
    setTimeout(() => {
      this.setState({ changesConfirm: false });
    }, 2000);
  };
  confirmMessage = () => {
    if (this.state.changesConfirm) {
      return (
        <div className="confirm-message">
          <h1> Changes have been made</h1>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    let owners = this.props.owners;
    let emailType = this.props.emailType;
    return (
      <div className="update">
        <this.confirmMessage />
        <div className="row-head">
          <h1>Update</h1>
          <span>client:</span>
          <TextInput
            onChange={event => {
              this.getName(event);
            }}
            placeholder="please add  @  before the search"
            style={{ width: "300px", height: "20px" }}
            options={this.props.names}
          />
        </div>
        <div className="row">
          <span>transfer ownership to:</span>
          <select
            onChange={event => {
              this.userOwnerUpdate(event);
            }}
          >
            <option
              style={{ backgroundColor: "red" }}
              value={this.props.selectedUser.owner}
            >
              {this.props.selectedUser.owner}
            </option>

            {owners.map((owner, index) => {
              if (owner === this.props.selectedUser.owner) {
              } else {
                return <Option key={index} data={owner} />;
              }
            })}
          </select>
        </div>
        <div className="row">
          <span>Send email:</span>
          <select
            onChange={event => {
              this.userEmailUpdate(event);
            }}
          >
            <option
              style={{ backgroundColor: "red" }}
              value={this.props.selectedUser.emailType}
            >
              {this.props.selectedUser.emailType}
            </option>

            {emailType.map((email, index) => {
              if (email === this.props.selectedUser.emailType) {
              } else {
                return <Option key={index} data={email} />;
              }
            })}
          </select>
        </div>
        <div className="row">
          <button onClick={this.submitChanges} className="sumbit-changes">
            submit
          </button>
        </div>
      </div>
    );
  }
}

export default Update;

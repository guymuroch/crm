import React, { Component } from "react";
import Option from "./Option";
let createHash = require("hash-generator");
class AddNew extends Component {
  constructor() {
    super();
    this.state = {
      newUser: {},
      changesConfirm: false
    };
  }
  getUserInfo(event) {
    let text = event.target.value;
    let name = event.target.name;
    let user = this.state.newUser;
    user[name] = text;
    let d = new Date();
    let n = d.getFullYear();
    n = n + "-" + d.getMonth();
    user["firstContact"] = n;
    this.setState({
      newUser: user
    });
  }
  getOnwer(event) {
    let selectedOwner = event.target.value;
    let user = this.state.newUser;
    if (selectedOwner === undefined) {
      user.owner = this.props.owners[0];
    }
    user.owner = selectedOwner;
    this.setState({
      newUser: user
    });
  }
  submitChanges = () => {
    let user = this.state.newUser;
    if (user.surname === undefined) {
    } else {
      user.name = user.name + " " + user.surname;
    }
    user.email = "";
    user.emailType = "";
    delete user.surname;
    user.sold = true;
    var hashLength = 24;
    var hash = createHash(hashLength);
    user._id = hash;
    this.props.addNewUser(user);
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
    return (
      <div className="add-new-user">
        <this.confirmMessage />
        <h1>add new user</h1>
        <span>First name :</span>
        <input
          onChange={event => {
            this.getUserInfo(event);
          }}
          name={"name"}
        />
        <span>Surname name :</span>
        <input
          onChange={event => {
            this.getUserInfo(event);
          }}
          name={"surname"}
        />
        <span>Counrty name :</span>
        <input
          onChange={event => {
            this.getUserInfo(event);
          }}
          name={"country"}
        />
        <span>Owner :</span>
        <select
          onChange={event => {
            this.getOnwer(event);
          }}
        >
          {this.props.owners.map((owner, index) => {
            return <Option key={index} data={owner} />;
          })}
        </select>
        <button onClick={this.submitChanges} className="add-new-users">
          submit
        </button>
      </div>
    );
  }
}

export default AddNew;

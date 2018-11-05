import React, { Component } from "react";
class ChangesWindow extends Component {
  constructor() {
    super();
    this.state = {
      newUserData: {}
    };
  }

  newUserDate = event => {
    let option = event.target.name;
    let text = event.target.value;
    let user = this.state.newUserData;
    user[option] = text;
    this.setState({
      newUserData: user
    });
  };

  submitChanges = () => {
    let user = this.props.userToChange;
    let newuser = this.state.newUserData;
    if (newuser.name === undefined) {
    } else if (newuser.name.length > 1) {
      user.name = newuser.name;
    }
    if (newuser.surname === undefined) {
    } else if (newuser.surname.length > 1) {
      if (newuser.name.length > 1) {
        user.name = newuser.name + " " + newuser.surname;
      } else {
        user.name = newuser.surname;
      }
    }
    if (newuser.country === undefined) {
    } else if (newuser.country.length >= 3) {
      user.country = newuser.country;
    }
    console.log(user);
    this.props.submitchangesUser(user);
  };
  RenderPopUpMessege = () => {
    if (this.props.show) {
      return (
        <div className="pop-up-changes">
          <span onClick={this.props.remove} className="closing-sign">
            &#9746;
          </span>
          <input
            onChange={event => {
              this.newUserDate(event);
            }}
            name="name"
            placeholder={this.props.userToChange.name.split(" ")[0]}
            className="input-text"
          />
          <span className="span-N">Name</span>
          <input
            onChange={event => {
              this.newUserDate(event);
            }}
            name="surname"
            placeholder={this.props.userToChange.name.split(" ")[1]}
            className="input-text"
          />
          <span className="span-N">Surname</span>
          <input
            onChange={event => {
              this.newUserDate(event);
            }}
            name="country"
            placeholder={this.props.userToChange.country}
            class="input-text"
          />
          <span class="span-N">Country</span>
          <a href="#" onClick={this.submitChanges} className="changes-button">
            Update
          </a>
        </div>
      );
    } else {
      return <div />;
    }
  };

  render() {
    console.log(this.state.newUserData);
    return (
      <div>
        <this.RenderPopUpMessege />
      </div>
    );
  }
}

export default ChangesWindow;

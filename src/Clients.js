import React, { Component } from "react";
import ClientRow from "./ClientRow";
import ChangesWindow from "./ChangesPopMessege";
// import "bootstrap/dist/css/bootstrap.min.css";
class Clients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterOption: "name",
      userText: "",
      popUpMessagedisplay: false,
      userToChange: {}
    };
  }
  // handle the pages move when user want to go back
  paginitionMinus = () => {
    if (this.props.page.start < 10) {
    } else {
      let start = this.props.page.start - 10;
      let finish = this.props.page.finish - 10;
      this.props.paginition(start, finish);
    }
  };

  // handle the pages move when user want to go forward
  paginitionPlus = () => {
    if (this.props.page.start === this.props.maxPages - 1) {
    } else {
      let start = this.props.page.start + 10;
      let finish = this.props.page.finish + 10;
      this.props.paginition(start, finish);
    }
  };

  // showing results according to user search
  filterResults = event => {
    let option = this.state.filterOption;
    this.props.filterResults(event.target.value, option);
  };

  // tracking on user input text in the filter search
  changeText = event => {
    this.setState({
      userText: event.target.value
    });
  };

  // tracking on user option select in the filter search
  userSelect = event => {
    this.setState({
      filterOption: event.target.value
    });
  };

  // open user change window
  openChangesWindow = () => {
    if (this.state.popUpMessagedisplay) {
      this.setState({
        popUpMessagedisplay: !this.state.popUpMessagedisplay,
        popUpMessage: { name: "", surname: "", country: "", id: null }
      });
    } else {
      this.setState({
        popUpMessagedisplay: !this.state.popUpMessagedisplay,
        popUpMessage: { name: "", surname: "", country: "", id: null }
      });
    }
  };

  // submit the new data to the current user by invoking function from the App commponent
  submitchangesUser = user => {
    console.log(user);
    this.props.changeUser(user);
    this.setState({
      popUpMessagedisplay: !this.state.popUpMessagedisplay
    });
  };

  // hold the current user data before change
  userData = data => {
    console.log(data);
    this.setState({
      userToChange: data
    });
  };

  // hold the new data for the user change
  newUserDate = (data, text) => {
    let user = this.state.popUpMessage;
    if (data === undefined) {
    } else {
      user[data] = text;
      this.setState({
        popUpMessage: user
      });
    }
  };
  page = () => {
    this.props.page(10, 30);
  };

  render() {
    return (
      <div className="clients">
        <ChangesWindow
          userToChange={this.state.userToChange}
          onChange={this.newUserDate}
          remove={this.openChangesWindow}
          show={this.state.popUpMessagedisplay}
          submitchangesUser={this.submitchangesUser}
        />
        <div className="sort">
          <span name="guy" onClick={this.paginitionPlus}>
            &#8658;
          </span>

          <span
            name="guy"
            onClick={this.paginitionMinus}
            className="first-span"
          >
            &#8656;
            {[this.props.page.start + "-" + this.props.page.finish]}
          </span>
          <input
            onChange={event => {
              this.changeText(event);
              this.filterResults(event);
            }}
            className="input-sort"
            placeholder="Search"
            value={this.state.userText}
          />
          <select onChange={this.userSelect} className="select" name="cars">
            <option value="name">Name</option>
            <option value="country">Country</option>
            <option value="email">Email</option>
            <option value="sold">Sold</option>
            <option value="owner">Owner</option>
          </select>
        </div>
        <div className="header-table">
          <div className="table-header">Name</div>
          <div className="table-header">Surname</div>
          <div className="table-header">Country</div>
          <div className="table-header">First contact</div>

          <div className="table-header">Email</div>
          <div className="table-header">Sold</div>

          <div className="table-header">Owner</div>
        </div>

        {this.props.currentSearch.map((user, index) => {
          return (
            <ClientRow
              key={user._id}
              userData={this.userData}
              openChangesWindow={this.openChangesWindow}
              data={user}
            />
          );
        })}
      </div>
    );
  }
}

export default Clients;

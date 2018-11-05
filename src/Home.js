import React, { Component } from "react";
class Home extends Component {
  render() {
    return (
      <ul className="nav-bar">
        <li>
          <a href="/Clients">Clients</a>
        </li>
        <li>
          <a href="/Action">Action</a>
        </li>
        <li>
          <a href="/Analystic">Analystic</a>
        </li>
      </ul>
    );
  }
}

export default Home;

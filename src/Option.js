import React, { Component } from "react";
class Option extends Component {
  ChangeState() {
    // this.props.onChange(this.props.onwer);
    console.log("sda");
  }
  render() {
    let onwer = this.props.data;
    return <option value={onwer}>{onwer}</option>;
  }
}

export default Option;

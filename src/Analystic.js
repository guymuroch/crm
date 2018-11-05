import React, { Component } from "react";
import Charts from "./Charts";
import image from "./charts.png";
import image1 from "./envelope.png";
import image2 from "./profile.png";
import image3 from "./earth.png";
import MathCalculations from "./MathCalculations";
class Analystic extends Component {
  constructor() {
    super();
    this.MathClass = new MathCalculations();
  }
  render() {
    return (
      <div className="Analystic">
        <div className="flex-icons-head">
          <div className="icon-area">
            <div
              style={{ backgroundImage: "url(" + image + ")" }}
              className="icon"
            />
            <h1>{this.MathClass.findClientsOfThisMonth().name}</h1>
            <p>new {this.MathClass.findClientsOfThisMonth().number} clients</p>
          </div>
          <div className="icon-area">
            <div
              style={{
                backgroundImage: "url(" + image1 + ")"
              }}
              className="icon1"
            />
            <h1>{this.MathClass.getEmails()}</h1>
            <p>Emails sent</p>
          </div>
          <div className="icon-area">
            <div
              style={{
                backgroundImage: "url(" + image2 + ")"
              }}
              className="icon2"
            />
            <h1>{this.MathClass.getClientsSold()}</h1>
            <p>outstanding clients</p>
          </div>
          <div className="icon-area">
            <div
              style={{
                backgroundImage: "url(" + image3 + ")"
              }}
              className="icon3"
            />
            <h1>{this.MathClass.getCountries().name}</h1>
            <p>Hottest Country</p>
          </div>
        </div>
        <Charts
          topCountry={this.props.topCountry}
          topSellers={this.props.topSellers}
          getClientsByDate={this.MathClass.getClientsByDate()}
        />
      </div>
    );
  }
}

export default Analystic;

import React, { Component } from "react";
import {
  LineChart,
  ComposedChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import MathCalculations from "./MathCalculations";
class Charts extends Component {
  render() {
    let data = this.props.topSellers;
    let data2 = this.props.topCountry;
    // let data3 = this.props.getClientsByDate;
    return (
      <div>
        <div className="first-chart">
          <h2>Top Employees</h2>
          <ComposedChart layout="vertical" width={400} height={265} data={data}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Sales" barSize={15} fill="#413ea0" />
          </ComposedChart>
        </div>
        <div className="second-chart">
          <h2>Sales by Country</h2>
          <BarChart width={700} height={250} data={data2}>
            <XAxis dataKey="name" tickSize={10} />
            <YAxis />
            <Bar dataKey="times" barSize={50} fill="#413ea0" />
          </BarChart>
        </div>
        <div>
          {/* <LineChart width={300} height={100} data={data3}>
            <Line type="" dataKey="name" stroke="#8884d8" strokeWidth={2} />
            <XAxis dataKey="name" tickSize={10} />
          </LineChart> */}
        </div>
      </div>
    );
  }
}

export default Charts;

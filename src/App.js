// CHANGE THE WAY OBJECT ARE TREVELS AROUND THE Component

// 1)MAKE A STATE INSIDE CHANGESWINDOW SO ITS POSIBLE TO SEND AZAX FROM THERE

import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Home from "./Home";
import Clients from "./Clients";
import Action from "./Action";
import Analystic from "./Analystic";
class App extends Component {
  constructor() {
    super();
    this.state = {
      selectedUser: {},
      users: [],
      owners: [],
      emailType: [],
      topSellers: [],
      topCountry: [],
      names: [],
      page: { start: 0, finish: 15 },
      currentSearch: []
    };
  }

  currentSearch = pages => {
    let page = pages;
    let users = this.state.users;
    let currentSearch = [];
    for (let x = page.start; x < page.finish; x++) {
      currentSearch.push(users[x]);
    }
    let refiendCurrentSearch = new Set(currentSearch);
    currentSearch = [...refiendCurrentSearch];
    this.setState({
      currentSearch: currentSearch
    });
  };
  componentDidMount() {
    axios.get("/getUsers/getUsers_allDate_forInit").then(data => {
      this.setState({
        users: data.data
      });
      let users = this.state.users;
      let names = [];
      let countries = [];
      let owner = [];
      let currentSearch = [];
      let emailType = [];
      for (let x = this.state.page.start; x < this.state.page.finish; x++) {
        currentSearch.push(users[x]);
      }
      for (let x in users) {
        names.push(users[x].name);
        owner.push(users[x].owner);
        emailType.push(users[x].emailType);
        countries.push(users[x].country);
      }
      let refiendCurrentSearch = new Set(currentSearch);
      let refiendNames = new Set(names);
      let refiendOwners = new Set(owner);
      let refiendEmails = new Set(emailType);
      let refiendCountries = new Set(countries);
      currentSearch = [...refiendCurrentSearch];
      names = [...refiendNames];
      owner = [...refiendOwners];
      emailType = [...refiendEmails];
      countries = [...refiendCountries];

      this.setState({
        currentSearch: currentSearch,
        names: names,
        owners: owner,
        emailType: emailType
      });
      let sellersAvrage = 0;
      let sellers = [];
      owner.forEach(own => {
        sellers.push({ name: own, Sales: 0 });
      });
      for (let x in sellers) {
        users.map(user => {
          if (user.owner === sellers[x].name) {
            sellers[x].Sales++;
          }
        });
      }
      for (let x in sellers) {
        sellersAvrage += sellers[x].Sales;
      }
      sellersAvrage = sellersAvrage / sellers.length;
      function findtheMostProfitSaleMan(array, number) {
        let top = [];
        for (let x in array) {
          if (array[x].Sales >= number) {
            top.push(array[x]);
          }
        }
        return top;
      }
      sellers = findtheMostProfitSaleMan(sellers, sellersAvrage + 5);

      // topCountry chats math
      let avrage = 0;
      let topCountry = [];
      countries.forEach(country => {
        topCountry.push({ name: country, times: 0 });
      });
      for (let x in topCountry) {
        users.map(user => {
          if (user.country === topCountry[x].name) {
            topCountry[x].times++;
          }
        });
      }
      for (let x in topCountry) {
        avrage += topCountry[x].times;
      }
      avrage = avrage / topCountry.length;

      /*******************************************
        
        
       
    
 invoke of the counrty mose profit function and set state


 
 *****************************************/

      topCountry = this.findTheBestCountriesSell(topCountry, avrage);
      this.setState({
        topSellers: sellers,
        topCountry: topCountry
      });
    });
  }
  /******************************************


 show the user results according to hes search



 **********************************************/
  filterResults = (userText, userOption) => {
    let text = userText;
    let option = userOption;
    let usersList = this.state.users;
    let results = [];
    if (option === "sold") {
      results = usersList.filter(item => {
        return item[option] === true;
      });
    } else {
      results = usersList.filter(item => {
        return item[option].includes(text);
      });
    }
    this.setState({
      currentSearch: results
    });
  };

  /***************************************
   *
   *
   * update user with new info
   *
   *
   *
   **************************************/
  updateUser = userChangedData => {
    let users = [...this.state.users];
    for (let x in users) {
      if (users[x].name === userChangedData.name) {
        if (userChangedData.owner.length > 2) {
          users[x].owner = userChangedData.owner;
        }
        if (userChangedData.emailType.length > 0) {
          users[x].emailType = userChangedData.emailType;
        }
        axios({
          method: "post",
          url: "/getUsers",
          data: users[x]
        }).then(data => {
          // users[x] = data;
        });
      }
    }
  };
  /*******************************************
 * 
 * 
 * 
 search the country with the most selling 



 *******************************************/
  findTheBestCountriesSell(array, number) {
    let top = [];
    for (let x in array) {
      if (array[x].times > number - 10) {
        top.push(array[x]);
      }
    }
    return top;
  }

  changeUser = user => {
    axios({
      method: "post",
      url: "/getUsers",
      data: user
    });
  };
  addNewUser = user => {
    axios({
      method: "post",
      url: "/getUsers/addNewUser",
      data: user
    }).then(() => {
      axios({
        method: "get",
        url: "/getUsers/getUsers_allDate_forInit"
      }).then(data => {
        this.setState({
          users: data.data
        });
      });
    });
  };

  paginition = (start, finish) => {
    let pageS = { start: start, finish: finish };
    this.setState({
      page: pageS
    });
    this.currentSearch(pageS);
  };

  searchUserByName = name => {
    let users = this.state.users;
    for (let x in users) {
      if (users[x].name === name) {
        this.setState({
          selectedUser: users[x]
        });
      }
    }
  };

  render() {
    return (
      <Router>
        <div className="container">
          <Route path="/" excat render={() => <Home />} />
          <Route
            path="/Clients"
            excat
            render={() => (
              <Clients
                // filter feature to search user
                filterResults={this.filterResults}
                // to know the max pages
                maxPages={this.state.users.length}
                // function to change user in the view and database
                changeUser={this.changeUser}
                // page state to represent the the pages the user look at
                page={this.state.page}
                // the function that handle all the page changes
                paginition={this.paginition}
                // array of the current items that the user searched or see
                currentSearch={this.state.currentSearch}
              />
            )}
          />
          <Route
            path="/Action"
            excat
            render={() => (
              <Action
                selectedUser={this.state.selectedUser}
                emailType={this.state.emailType}
                owners={this.state.owners}
                names={this.state.names}
                searchUserByName={this.searchUserByName}
                changeUser={this.changeUser}
                addNewUser={this.addNewUser}
              />
            )}
          />
          <Route
            path="/Analystic"
            excat
            render={() => (
              <Analystic
                topCountry={this.state.topCountry}
                topSellers={this.state.topSellers}
              />
            )}
          />
        </div>
      </Router>
    );
  }
}

export default App;

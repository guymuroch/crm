import axios from "axios";
class MathCalculations {
  constructor() {
    axios.get("/getUsers/getUsers_allDate_forInit").then(data => {
      this.users = data.data;
    });
  }
  /********************************************
   all the user that joined in the current month
   **********************************************/
  findClientsOfThisMonth() {
    var d = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let allUser = this.users;
    let year = `${d.getFullYear()}`;
    let date = d.getMonth();
    let month = { name: monthNames[date - 1], number: 0 };
    for (let x in allUser) {
      if (
        allUser[x].firstContact[3] == year[3] &&
        allUser[x].firstContact[6] == date
      ) {
        month.number++;
      }
    }
    return month;
  }
  /********************************************
   all the user emails
   **********************************************/
  getEmails() {
    let emails = 0;
    let users = this.users;
    for (let x in users) {
      if (users[x].emailType !== null) {
        emails++;
      }
    }
    return emails;
  }
  /********************************************
   all the users sold
   **********************************************/
  getClientsSold() {
    let users = this.users;
    let number = 0;
    for (let x in users) {
      if (users[x].sold) {
        number++;
      }
    }
    return number;
  }
  /********************************************
   all the users countries and find the most profit
   **********************************************/
  getCountries() {
    let domeinCountry = { name: "", times: 0 };
    let users = this.users;
    let topCountry = [];
    let countries = [];
    for (let i in users) {
      countries.push(this.users[i].country);
    }
    let refiendCountries = new Set(countries);
    countries = [...refiendCountries];
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
      if (domeinCountry === undefined) {
        domeinCountry = {
          name: topCountry[x].name,
          times: topCountry[x].times
        };
      } else if (topCountry[x].times > domeinCountry.times) {
        domeinCountry = {
          name: topCountry[x].name,
          times: topCountry[x].times
        };
      }
    }
    return domeinCountry;
  }
  /********************************************
   the last mounth sales
   **********************************************/
  getClientsByDate() {
    var d = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let allUser = this.users;
    let year = `${d.getFullYear()}`;
    let date = d.getMonth();

    let month = [];
    for (let x in allUser) {
      if (
        allUser[x].firstContact[3] == year[3] &&
        allUser[x].firstContact[6] == date
      ) {
        let data = allUser[x].firstContact.split("");
        data = data[8] + data[9];
        let days = { name: 0, number: 1 };
        days.name = parseInt(data);
        if (month.length < 1) {
          month.push(days);
          console.log(month);
        } else if (month.length >= 1) {
          let add = false;
          for (let i in month) {
            if (parseInt(month[i].name) === days.name) {
              month[i].number++;
            } else {
              add = true;
            }
          }
          if (add) {
            month.push(days);
          }
        }
      }
    }
    // console.log(month);
    return month;
  }
}
export default MathCalculations;

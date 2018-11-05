var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

mongoose.connect("mongodb://localhost/react-porject");
var Schema = mongoose.Schema;
var userSchema = new Schema({
  _id: Schema.Types.Mixed,
  name: String,
  email: String,
  firstContact: Schema.Types.Mixed,
  emailType: Schema.Types.Mixed,
  sold: Boolean,
  owner: String,
  country: String
});
let data = require("./data.json");
var User = mongoose.model("User", userSchema);
for (let i in data) {
  let user = new User({
    _id: data[i]._id,
    name: data[i].name,
    email: data[i].email,
    firstContact: data[i].firstContact,
    emailType: data[i].emailType,
    sold: data[i].sold,
    owner: data[i].owner,
    country: data[i].country
  });
  user.save();
}
router.get("/getUsers_allDate_forInit", function(req, res) {
  // for (let i in data) {
  //   let user = new User({
  //     _id: data[i]._id,
  //     name: data[i].name,
  //     email: data[i].email,
  //     firstContact: data[i].firstContact,
  //     emailType: data[i].emailType,
  //     sold: data[i].sold,
  //     owner: data[i].owner,
  //     country: data[i].country
  //   });
  //   user.save();
  // }
  User.find({}, function(req, users) {
    res.send(users);
  });
});
router.post("/", (req, res) => {
  User.findByIdAndUpdate(req.body._id, req.body, { new: true }, function(
    err,
    user
  ) {
    res.send(user);
  });
});
router.post("/addNewUser", function(req, res) {
  let newUser = req.body;
  let user = new User({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    firstContact: newUser.firstContact,
    emailType: newUser.emailType,
    sold: newUser.sold,
    owner: newUser.owner,
    country: newUser.country
  });
  console.log(newUser);
  user.save();
});

module.exports = router;

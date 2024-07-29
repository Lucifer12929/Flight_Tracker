const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const FlightModel = require("./models/flight");
const UserModel = require("./models/user");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://shawprateek91:T3XqPMzIoiRsYl3E@cluster0.cf2j3hf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.get("/getFlights", (req, res) => {
  FlightModel.find({})
    .then(function (flights) {
      res.json(flights);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.get("/getUsers", (req, res) => {
  UserModel.find({})
    .then(function (users) {
      res.json(users);
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.use("/", require("./routes"));

app.listen(3001, () => {
  console.log("Serve is running successfully ");
});

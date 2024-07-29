const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const FlightModel = require("../models/flight");
const UserModel = require("../models/user");

require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://shawprateek91:T3XqPMzIoiRsYl3E@cluster0.cf2j3hf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

async function updateFlightStatus(flight) {
  try {
    await FlightModel.findByIdAndUpdate(flight._id, {
      $set: { prev_status: flight.status, prev_gate: flight.gate },
    });
  } catch (error) {
    console.error("Error updating flight status:", error);
  }
}

async function sendNotificationEmail(user, flight) {
  try {
    let messageBody = "";

    switch (flight.status) {
      case "On-Time":
        messageBody = `Dear ${user.name}, your flight ${flight.flight_num} from ${flight.departure} to ${flight.destination} is on time. It will depart at ${flight.flight_time} from gate ${flight.gate}. Have a pleasant journey.`;
        break;
      case "Delayed":
        messageBody = `Dear ${user.name}, your flight ${flight.flight_num} from ${flight.departure} to ${flight.destination} is delayed. The new departure time is ${flight.flight_time} from gate ${flight.gate}. We apologize for the inconvenience.`;
        break;
      default:
        messageBody = `Dear ${user.name}, we regret to inform you that your flight ${flight.flight_num} from ${flight.departure} to ${flight.destination} has been ${flight.status}. We apologize for the inconvenience.`;
        break;
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: process.env.ETHEREAL_USERNAME,
        pass: process.env.ETHEREAL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `Indigo Airlines <${process.env.ETHEREAL_USERNAME}>`,
      to: user.email,
      subject: "Flight Schedule Update",
      text: messageBody,
      html: messageBody,
    });

    console.log("Notification email sent successfully.");
  } catch (error) {
    console.error("Error sending notification email:", error);
  }
}

async function sendNotificationSMS(user, flight) {
  try {
    let body_par = `Dear ${user.name}, we regret to inform you that your flight number ${flight.flight_num} from ${flight.departure} to ${flight.destination} has been ${flight.status}. We apologize for the inconvenience caused.`;
    if (flight.status == "On-Time") {
      body_par = `Dear ${user.name},\n\nYour flight number ${flight.flight_num} from ${flight.departure} to ${flight.destination} is scheduled to depart on time at ${flight.flight_time} from gate ${flight.gate}. We wish you a pleasant journey.\n\nBest regards,\nYour Airline`;
    } else if (flight.status == "Delayed") {
      body_par = `Dear ${user.name},\n\nWe regret to inform you that your flight number ${flight.flight_num} from ${flight.departure} to ${flight.destination} has been delayed. The new departure time is ${flight.flight_time} from gate ${flight.gate}. We apologize for any inconvenience this may cause.\n\nThank you for your understanding,\nYour Airline`;
    }

    const client = require("twilio")(
      process.env.TWILO_SID,
      process.env.TWILO_TOKEN
    );
    let message = await client.messages.create({
      body: body_par,
      from: process.env.TWILO_NO,
      to: user.mobile,
    });
    console.log("SMS sent:", message.sid);
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
}

async function fetchUsers() {
  try {
    return await UserModel.find();
  } catch (error) {
    console.error("Error fetching user list:", error);
  }
}

async function fetchFlights() {
  try {
    return await FlightModel.find();
  } catch (error) {
    console.error("Error fetching flight list:", error);
  }
}

setInterval(async () => {
  try {
    const users = await fetchUsers();
    const flights = await fetchFlights();

    flights.forEach(async (flight) => {
      if (
        flight.prev_status !== flight.status ||
        flight.prev_gate !== flight.gate
      ) {
        users.forEach(async (user) => {
          if (user.flight_num === flight.flight_num) {
            await sendNotificationSMS(user, flight);
            await sendNotificationEmail(user, flight);
            await updateFlightStatus(flight);
            console.log("Flight record updated successfully.");
          }
        });
      }
    });
  } catch (error) {
    console.error("Error in scheduled task:", error);
  }
}, 5000);

router.get("/", (req, res) => {
  res.status(200).json({ message: "Server is up and running" });
});

module.exports = router;

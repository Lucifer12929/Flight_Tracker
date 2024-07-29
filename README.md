# Flight Tracker Application

## Overview

The Flight Tracker application provides real-time updates on flight statuses. It sends notifications through SMS and email to keep users informed about flight details, including departures, destinations, timing, and gate changes. Built with a modern tech stack, the application ensures efficient data handling and user notifications.

## Technology Stack

- **Frontend**: React.js, HTML, CSS, Bootstrap
- **Backend**: Node.js, JavaScript
- **Database**: MongoDB
- **SMS**: Twilio
- **Email**: Nodemailer

## Database Schema

### Flight Collection

- **flight**: Stores flight details such as:
  - `departure`
  - `destination`
  - `flight_number`
  - `timing`
  - `gate_number`
  - `current_status`

### User Collection

- **user**: Stores user information including:
  - `username`
  - `mobile_number`
  - `email_address`

## Environment Configuration

To run the application, ensure that the necessary API keys for Twilio and Nodemailer are added to the `.env` file.

## Project Description

### Frontend

1. **Data Fetching**: Uses `Axios` with React hooks to fetch flight data from MongoDB.
2. **Real-Time Updates**: `setInterval` is used to display real-time flight status updates.
3. **Visual Feedback**: Utilizes different colors to indicate flight statuses for better clarity and user experience.
4. **User Interface**: Styled with Bootstrap and custom CSS to ensure a responsive and visually appealing design.

### Backend

1. **Notification System**:
   - **SMS and Email**: Notifications are sent via Twilio and Nodemailer. Each notification is triggered by changes in flight status.
   - **Update Mechanism**: Updates flight status to prevent duplicate notifications.

2. **Real-Time Monitoring**:
   - **Database Changes**: Uses `setInterval` to monitor the database for any status changes and sends notifications accordingly.
   - **Async Handling**: Extensively uses `async` and `await` functions to manage asynchronous operations, ensuring that code synchronization is maintained even if processes are delayed or encounter failures.

## Installation and Setup

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-repository/flight-tracker.git


2. **Configure Environment Variables**:
  - Create a .env file in the server directory.
  - Add the required API keys for Twilio and Nodemailer, following the format in the .env.example file.


### Screenshots

![image](https://github.com/user-attachments/assets/260c0262-b737-49f4-b804-e9f3581fb711)

![image](https://github.com/user-attachments/assets/be9980d9-255d-4d2e-b697-283c2380db89)

![image](https://github.com/user-attachments/assets/a5055e78-4518-4615-ac78-01eed3e36ac8)




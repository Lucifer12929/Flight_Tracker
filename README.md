Technology Used :
  ## Frontend = React.js, HTML, CSS, Bootstrap
  ## Backend = Node.js, Javascript
  ## database = MongoDB
  ## SMS send using *Twilio*
  ## Email send using *Nodemailer*
Database Name = Flight
Table name - flight used to store detailes of flight like - departure, destination, flight number, timing, gate number, previous gate number, previous status, present status
Table name - user used to store details like user name, mobile number and email id
NOTE - important keys to send SMS and Email are in .env file to run the application first uncomment all the lines
Description of Project -
To fetch the data from MondoDB "Axios" with react hook is used
screenshot folder is also present to see the brief working of the project
On frontend side setinterval is used to display real-time updates
different colors are used to display the data on basis of their flight status
On backend once message and email is send then previous status and current status are updated so that only single time notification is generated
On backend also setinterval is used so that as soon as any change in database happens it will direct to send notification to users
On backend async and await function is extensively used so that even if process take time or fail the synchronization of code is not effected

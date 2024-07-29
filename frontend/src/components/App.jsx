import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("http://localhost:3001/getFlights");
        setFlights(response.data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      }
    };

    fetchFlights();
    const intervalId = setInterval(fetchFlights, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Delayed":
        return "bg-warning text-dark";
      case "Cancelled":
        return "bg-danger text-light";
      default:
        return "bg-success text-light";
    }
  };

  return (
    <div className="container mt-4">
      <div className="title_container">
        <img src="../../public/indigo.png" alt="Indigo Logo" />
        <h2 className="text-primary  text-center">Indigo Flight Tracker</h2>
      </div>
      <div className="table-responsive">
        <table className="table table-hover table-striped table-bordered table-custom">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Flight Number</th>
              <th scope="col">Departure</th>
              <th scope="col">Destination</th>
              <th scope="col">Flight Timings</th>
              <th scope="col">Status</th>
              <th scope="col">Gate No.</th>
            </tr>
          </thead>
          <tbody>
            {flights.map(
              ({
                _id,
                flight_num,
                departure,
                destination,
                flight_time,
                status,
                gate,
              }) => (
                <tr key={_id}>
                  <td className={getStatusClass(status)}>{flight_num}</td>
                  <td className={getStatusClass(status)}>{departure}</td>
                  <td className={getStatusClass(status)}>{destination}</td>
                  <td className={getStatusClass(status)}>{flight_time}</td>
                  <td className={getStatusClass(status)}>{status}</td>
                  <td className={getStatusClass(status)}>{gate}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

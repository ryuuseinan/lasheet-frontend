import React, { useEffect, useState } from "react";
import "./Alert.css";

const Alert = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/alerts");
        const data = await response.json();

        if (data.flashes) {
          setAlerts(data.flashes);
        }
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <div className="alert-container">
      {alerts.map(([category, message], index) => (
        <div
          key={index}
          className={`alert alert-${category}`} // Clase CSS basada en la categoría
          role="alert"
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default Alert;

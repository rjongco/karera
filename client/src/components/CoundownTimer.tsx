import React, { useState, useEffect } from "react";
import axios from "axios";

const CountdownTimer = () => {
  const [countdown, setCountdown] = useState(60); // Initial countdown value

  useEffect(() => {
    const fetchCountdown = async () => {
      try {
        const response = await axios.get("http://localhost:3000/countdown");
        setCountdown(response.data.countdown);
      } catch (error) {
        console.error("Error fetching countdown:", error);
      }
    };

    const intervalId = setInterval(fetchCountdown, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Countdown Timer: {countdown} seconds</h1>
    </div>
  );
};

export default CountdownTimer;

import React, { useState, useEffect } from "react";

const Arena = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [ws, setWs] = useState(null); // State to hold the WebSocket connection

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8001/chat");

    websocket.onopen = () => {
      console.log("Connected to WebSocket server");
      // @ts-ignore
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      const newMessage = event.data;
      // @ts-ignore
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    websocket.onclose = (event) => {
      console.log("Disconnected from WebSocket server", event);
      // Reconnect logic if needed
      setTimeout(() => {
        console.log("Attempting to reconnect...");
        // Call useEffect again to establish a new WebSocket connection
      }, 5000); // Reconnect after 5 seconds
    };

    websocket.onerror = (event) => {
      console.error("WebSocket error:", event);
      // Handle WebSocket errors
    };

    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, []);

  return <div>Chat App</div>;
};

export default Arena;

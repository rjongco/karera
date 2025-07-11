import { useState } from "react";

//Hook function for the alert mechanism
export const useAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");

  const handleAlertMessage = (message: any, severity: any) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return {
    showAlert,
    alertSeverity,
    alertMessage,
    handleAlertMessage,
    handleCloseAlert,
  };
};

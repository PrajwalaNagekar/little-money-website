import { useEffect, useState } from "react";
import logout from "../utils/logout";

const useAutoLogout = (timeout) => {
  const [showModal, setShowModal] = useState(false);
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const warningTimer = setTimeout(() => {
      setShowModal(true);
    }, timeout - 10000); // Show modal 10 seconds before logout

    const logoutTimer = setTimeout(() => {
      logout();
    }, timeout);

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(logoutTimer);
    };
  }, [timeout]);

  // Countdown Logic
  useEffect(() => {
    if (!showModal) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) clearInterval(interval);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showModal]);

  return { showModal, countdown };
};

export default useAutoLogout;

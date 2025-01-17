import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const CaptainLogout = () => {
  const token = localStorage.getItem("captain-token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/captain-login"); // Redirect if no token is found
      return; // Exit early if no token
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.removeItem("captain-token"); // Remove the token from localStorage
          window.location.reload(); // Force page refresh to clear any cached state
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
        // Handle errors appropriately, maybe show a message to the user
      });
  }, [token, navigate]); // Re-run the effect if the token or navigate changes

  return <div>Logging out...</div>;
};

export default CaptainLogout;

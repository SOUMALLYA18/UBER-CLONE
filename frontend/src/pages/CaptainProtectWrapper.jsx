import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("captain-token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [captain, setCaptain] = useState(null); // Added state to store captain data

  useEffect(() => {
    if (!token) {
      navigate("/captain-login"); // Redirect if no token is found
      return; // Early exit if no token
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data.captain); // Set captain data
          setIsLoading(false); // Set loading to false once data is fetched
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("captain-token");
          navigate("/captain-login"); // Redirect to login if token is invalid
        }
      });
  }, [token, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainSignup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [errors, setErrors] = useState({}); // To store validation and backend errors

  const { setCaptain } = useContext(CaptainDataContext);

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!emailRegex.test(email)) newErrors.email = "Invalid email address.";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!vehicleColor.trim())
      newErrors.vehicleColor = "Vehicle color is required.";
    if (!vehiclePlate.trim())
      newErrors.vehiclePlate = "Vehicle plate is required.";
    if (!vehicleCapacity)
      newErrors.vehicleCapacity = "Vehicle capacity is required.";
    if (!vehicleType) newErrors.vehicleType = "Vehicle type is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return; // Stop if there are validation errors

    try {
      const captainData = {
        email,
        password,
        firstname: firstName,
        lastname: lastName,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType,
        color: vehicleColor,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );

      if (response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        navigate("/captain-home");
      }
    } catch (err) {
      // Handle backend error
      setErrors((prev) => ({
        ...prev,
        email: err.response?.data?.message || "Something went wrong!",
      }));
    }
  };

  return (
    <div className="py-5 px-5 h-screen flex flex-col justify-between">
      <div>
        <img
          className="w-20 mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber Driver Logo"
        />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg w-full font-medium mb-2">
            What's our Captain's name?
          </h3>
          <div className="flex gap-4 mb-7">
            <div className="w-1/2">
              <input
                className="bg-[#eeeeee] rounded-lg px-4 py-2 border text-lg placeholder:text-base w-full"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="w-1/2">
              <input
                className="bg-[#eeeeee] rounded-lg px-4 py-2 border text-lg placeholder:text-base w-full"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <h3 className="text-lg font-medium mb-2">
            What's our Captain's email?
          </h3>
          <div className="mb-7">
            <input
              className="bg-[#eeeeee] rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <div className="mb-7">
            <input
              className="bg-[#eeeeee] rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-4 mb-7">
            <div className="w-1/2">
              <input
                className="bg-[#eeeeee] rounded-lg px-4 py-2 border text-lg placeholder:text-base w-full"
                type="text"
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
              />
              {errors.vehicleColor && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.vehicleColor}
                </p>
              )}
            </div>
            <div className="w-1/2">
              <input
                className="bg-[#eeeeee] rounded-lg px-4 py-2 border text-lg placeholder:text-base w-full"
                type="text"
                placeholder="Vehicle Plate"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
              />
              {errors.vehiclePlate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.vehiclePlate}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4 mb-7">
            <div className="w-1/2">
              <input
                className="bg-[#eeeeee] rounded-lg px-4 py-2 border text-lg placeholder:text-base w-full"
                type="number"
                placeholder="Vehicle Capacity"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(Number(e.target.value))}
              />
              {errors.vehicleCapacity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.vehicleCapacity}
                </p>
              )}
            </div>
            <div className="w-1/2">
              <select
                className="bg-[#eeeeee] rounded-lg px-4 py-2 border text-lg placeholder:text-base w-full"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="" disabled>
                  Select Vehicle Type
                </option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
              {errors.vehicleType && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.vehicleType}
                </p>
              )}
            </div>
          </div>

          <button className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg">
            Create Captain Account
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/captain-login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] mt-6 leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainSignup;

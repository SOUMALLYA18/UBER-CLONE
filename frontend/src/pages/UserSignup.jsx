import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uberLogo from "../../public/images/Uber_logo.png";
import axios from "axios";
import { userDataContext } from "../context/UserContext";

const UserSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({}); // State to store errors for each field

  const navigate = useNavigate();
  const { setUser } = useContext(userDataContext);

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!emailRegex.test(email)) newErrors.email = "Invalid email address.";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters long.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateInputs()) return; // Stop if there are validation errors

    try {
      const newUser = {
        email,
        password,
        firstname: firstName,
        lastname: lastName,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/register`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (err) {
      // Display backend error under the email field
      setErrors((prev) => ({
        ...prev,
        email: err.response?.data?.message || "Something went wrong!",
      }));
    }
  };

  return (
    <div className="p-7 flex justify-between flex-col h-screen">
      <div>
        <img className="w-16 mb-10" src={uberLogo} alt="Uber logo" />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your name?</h3>
          <div className="flex gap-4 mb-6">
            <div className="w-1/2">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-[#eeeeee] rounded px-4 py-2 border text-base placeholder-text-base w-full"
                type="text"
                placeholder="First name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="w-1/2">
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-[#eeeeee] rounded px-4 py-2 border text-base placeholder-text-base w-full"
                type="text"
                placeholder="Last name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <div className="mb-6">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder-text-base"
              type="email"
              placeholder="email@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <h3 className="text-lg font-medium mb-2">What's your password?</h3>
          <div className="mb-6">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder-text-base"
              type="password"
              placeholder="password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg"
          >
            Create Account
          </button>
        </form>
        <p className="text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default UserSignup;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import uberLogo from "../../public/images/uber-driver.svg";

const captainSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
    });

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };
  return (
    <div className="p-7 flex justify-between flex-col h-screen">
      <div>
        <img className="w-16 mb-10" src={uberLogo} alt="Uber logo" />
        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your name?</h3>
          <div className="flex gap-4 mb-6">
            <input
              required
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-base placeholder-text-base"
              type="text"
              placeholder="First name"
            />
            <input
              required
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-base placeholder-text-base"
              type="text"
              placeholder="Last name"
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder-text-base"
            type="email"
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">What's your password?</h3>
          <input
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder-text-base"
            type="password"
            placeholder="password"
          />

          <button
            type="submit"
            className="bg-[#111] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg"
          >
            Sign Up as Captain
          </button>
        </form>
        <p className="text-center">
          Already have a account?{" "}
          <Link to="/captain-login" className="text-blue-600">
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

export default captainSignup;

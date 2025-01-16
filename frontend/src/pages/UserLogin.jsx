import React from "react";
import uberLogo from "/images/Uber_logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
const userLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submithandler = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password,
    });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex justify-between flex-col h-screen">
      <div>
        <img className="w-16 mb-10 " src={uberLogo} alt="uber-logo" />
        <form
          onSubmit={(e) => {
            submithandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your email?</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder-text-base"
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
            className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder-text-base"
            type="password"
            placeholder="password"
          />
          <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg ">
            Login
          </button>
        </form>
        <p className="text-center">
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="bg-[#28A745] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg "
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default userLogin;

import React, { useState } from "react";
import uberLogo from "../../public/images/uber-driver.svg";
import { Link } from "react-router-dom";

const captainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const submithandler = (e) => {
    e.preventDefault();
    setCaptainData({
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
          <Link to="/captain-signup" className="text-blue-600">
            Register as Captain
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/login"
          className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg "
        >
          Sign in as User
        </Link>
      </div>
    </div>
  );
};

export default captainLogin;

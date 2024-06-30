import React from "react";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import GoogleLogin from "../GoogleLogin";

function LoginPage() {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handleGoogleUserData = (userData) => {
    setEmail(userData.email);
    setName(userData.name);
    // Do not log the user in yet, just fill the form
  };

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    if (!password) {
      alert("Please enter your password.");
      return;
    }
    try {
      const { data } = await axios.post("/login", { email, password, name });
      setUser(data);
      setRedirect(true);
    } catch (error) {
      alert("Login Failed. Please check your credentials.");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark transition duration-300"
          >
            Login
          </button>
        </form>
        <div>
          <GoogleLogin onGoogleUserData={handleGoogleUserData} />
        </div>
        <div className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="text-primary font-semibold hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

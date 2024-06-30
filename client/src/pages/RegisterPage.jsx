import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import GoogleLogin from "../GoogleLogin";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleUserData = (userData) => {
    setEmail(userData.email);
    setName(userData.name);
    // Optionally, you can handle additional user data here
  };

  async function registerUser(ev) {
    console.log();
    ev.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert(`Registration Successfull..!!! Welcome ${name}`);
    } catch (error) {
      alert("Registration failed. Please try again after sometime");
    }
  }
  return (
    <div className="mt-5 grow flex items-center justify-around ">
      <div className="mb-64">
        <h1 className="text-3xl text-center mb-4">REGISTER</h1>
        <form className="mx-auto max-w-md" onSubmit={registerUser}>
          <input
            type="name"
            placeholder="Your Full Name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          ></input>
          <input
            type="email"
            placeholder="your@emailid.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          ></input>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          ></input>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg shadow-md hover:bg-primary-dark transition duration-300"
          >
            Register
          </button>
          <div>
            Register Using Google
            <GoogleLogin onGoogleUserData={handleGoogleUserData} />
          </div>
          <div className="text-center py-2 px-2 text-gray-500">
            Already a member? Go to
            <Link to={"/login"} className="underline text-black px-2">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
export default RegisterPage;

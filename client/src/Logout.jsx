import React, { useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post("/logout");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="text-center max-w-xl mx-auto mt-10 group transition-transform transform hover:scale-105">
      Logged in as {user ? `${user.name}` : "No user data"}
      <br />
      <button onClick={logout} className="primary max-w-sm mt-2">
        Log Out
      </button>
    </div>
  );
};

export default LogoutButton;

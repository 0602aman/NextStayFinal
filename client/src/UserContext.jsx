import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [token, setToken] = useState(null);
  // In UserContext or wherever you manage user authentication
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/profile");
        setUser(response.data);
        setToken(response.data.token);
        console.log("Token set to:", response.data.token);
        setReady(true); // Make sure to set this on successful fetch
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setReady(true); // Consider setting ready to true even on error to indicate loading is done
      }
    };

    fetchUserData();
  }, []);

  const logout = () => {
    setUser(null);
    setToken(null); // Clear token on logout
  };

  // useEffect(() => {
  //   if (!user) {
  //     axios.get("/profile").then(({ data }) => {
  //       setUser(data);
  //       setReady(true);
  //     });
  //   }
  // }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready, token }}>
      {children}
    </UserContext.Provider>
  );
}

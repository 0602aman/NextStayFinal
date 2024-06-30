import React from "react";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "./AccountNav";
import IndexPage from "./IndexPage";
import LogoutButton from "../Logout";

export default function ProfilePage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  useEffect(() => {
    console.log("Ready state:", ready);
    console.log("User data:", user);
  }, [ready, user]);

  if (!ready) {
    return "Loading........";
  }

  if (ready && !user && !redirect) {
    console.log("Redirecting to login because user is not authenticated.");
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <div>
        <AccountNav />
        <IndexPage disableLinks={true} />
      </div>
      <div>
        {subpage === "profile"}
        {subpage === "places" && <PlacesPage />}
      </div>
    </div>
  );
}

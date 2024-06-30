import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function GoogleLogin({ onGoogleUserData }) {
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/google-userinfo?access_token=${codeResponse.access_token}`,
          {
            withCredentials: true,
          }
        );
        onGoogleUserData(data); // Pass Google user data to parent component
      } catch (error) {
        console.log("Failed to fetch user data:", error);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return <button onClick={login}>Sign in with Google 🚀</button>;
}

export default GoogleLogin;

// import React, { useContext, useEffect, useState } from "react";
// import { googleLogout, useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { UserContext } from "./UserContext";

// function GoogleLogin() {
//   const { setUser } = useContext(UserContext);
//   const [profile, setProfile] = useState(null);

//   const login = useGoogleLogin({
//     onSuccess: (codeResponse) => {
//       axios
//         .get(
//           `http://localhost:4001/google-userinfo?access_token=${codeResponse.access_token}`,
//           {
//             withCredentials: true,
//           }
//         )
//         .then((res) => {
//           setProfile(res.data);
//           setUser(res.data); // Set user in context
//         })
//         .catch((err) => console.log(err));
//     },
//     onError: (error) => console.log("Login Failed:", error),
//   });

//   const logOut = () => {
//     googleLogout();
//     setProfile(null);
//     setUser(null);
//   };

//   return (
//     <div>
//       {profile ? (
//         <div>
//           <img src={profile.picture} alt="user image" />
//           <h3>User Logged in</h3>
//           <p>Name: {profile.name}</p>
//           <p>Email Address: {profile.email}</p>
//           <br />
//           <br />
//           <button onClick={logOut}>Log out</button>
//         </div>
//       ) : (
//         <button onClick={login}>Sign in with Google 🚀 </button>
//       )}
//     </div>
//   );
// }

// export default GoogleLogin;

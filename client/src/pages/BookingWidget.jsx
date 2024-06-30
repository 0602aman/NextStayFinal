import React, { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guest, setGuest] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [redirect, setRedirect] = useState("");
  const { user, token } = useContext(UserContext);
  let noOfNights = 0;
  let baseprice = place.price;

  if (checkIn && checkOut && guest) {
    if (guest > 2) {
      baseprice = baseprice * ((guest - 2) * 0.5 + 1);
    }
    noOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const resetForm = () => {
    setCheckIn("");
    setCheckOut("");
    setGuest(1);
    setName("");
    setPhone("");
    setEmail("");
  };
  console.log(useContext(UserContext));
  console.log("user object:", user);
  console.log("user-id:", user ? user.id : null);
  console.log("token:", token);
  async function handleBooking() {
    try {
      //const token = getTokenFromLocalStorage(); // Fetch token from localStorage
      const response = await axios.post(
        "/bookings",
        {
          checkIn,
          checkOut,
          guest,
          name,
          phone,
          email,
          price: noOfNights * baseprice,
          place: place._id,
          user: user.id,
        },
        {
          headers: {
            "user-id": user ? user.id : null,
            Authorization: token ? `Bearer ${token}` : null,
          },
        }
      );
      const bookingId = response.data._id;
      setRedirect(`/account/bookings/${bookingId}`);
      resetForm();
    } catch (error) {
      console.error("Error making booking:", error);
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="rounded-2xl bg-white shadow-md p-4 hover:shadow-lg transition duration-300 group transition-transform transform hover:scale-105">
      <h2 className="text-xl font-bold text-center">
        Price = ₹{place.price}/ night
      </h2>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check In: </label>
            <input
              className="border-2 border-gray-300"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check Out: </label>
            <input
              className="border-2 border-gray-300"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label className="mr-2">No. of Guest: </label>
          <input
            type="number"
            value={guest}
            onChange={(e) => setGuest(Number(e.target.value))}
          />
        </div>
        {noOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input
              type="text"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            <label>Your Email:</label>
            <input
              type="text"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <label>Phone number:</label>
            <input
              type="tel"
              value={phone}
              onChange={(ev) => setPhone(ev.target.value)}
              className="border-2 border-gray-300 px-1 ml-2"
            />
          </div>
        )}
      </div>
      <button
        onClick={handleBooking}
        className="primary mt-4 bg-primary hover:bg-primary-dark text-white py-2 group transition-transform transform hover:scale-105 px-4 rounded-full transition duration-300"
      >
        Book this place
        {noOfNights > 0 && <span> for ₹{noOfNights * baseprice}</span>}
      </button>
    </div>
  );
}

// import React from "react";
// import { useState } from "react";
// import { differenceInCalendarDays } from "date-fns";
// import axios from "axios";
// import { Navigate } from "react-router-dom";

// export default function BookingWidget({ place }) {
//   const [checkIn, setCheckIn] = useState("");
//   const [checkOut, setCheckOut] = useState("");
//   const [guest, setGuest] = useState(1);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [redirect, setRedirect] = useState("");
//   let noOfNights = 0;
//   let baseprice = place.price;

//   if (checkIn && checkOut && guest) {
//     if (guest > 2) {
//       baseprice = baseprice * ((guest - 2) * 0.5 + 1);
//     }
//     noOfNights = differenceInCalendarDays(
//       new Date(checkOut),
//       new Date(checkIn)
//     );
//   }

//   const resetForm = () => {
//     setCheckIn("");
//     setCheckOut("");
//     setGuest(1);
//     setName("");
//     setPhone("");
//     setEmail("");
//   };

//   async function handleBooking() {
//     try {
//       const response = await axios.post("/bookings", {
//         checkIn,
//         checkOut,
//         guest,
//         name,
//         phone,
//         email,
//         price: noOfNights * baseprice,
//         place: place._id,
//       });
//       const bookingId = response.data._id;
//       setRedirect(`/account/bookings/${bookingId}`);
//       resetForm();
//     } catch (error) {
//       console.error("Error making booking:", error);
//     }
//   }

//   if (redirect) {
//     return <Navigate to={redirect} />;
//   }

//   return (
//     <div className="rounded-2xl bg-white shadow-md p-4 hover:shadow-lg transition duration-300 group transition-transform transform hover:scale-105">
//       <h2 className="text-xl font-bold text-center">
//         Price = ₹{place.price}/ night
//       </h2>
//       <div className="border rounded-2xl mt-4">
//         <div className="flex">
//           <div className="py-3 px-4">
//             <label>Check In: </label>
//             <input
//               className="border-2 border-gray-300"
//               type="date"
//               value={checkIn}
//               onChange={(e) => setCheckIn(e.target.value)}
//             />
//           </div>
//           <div className="py-3 px-4 border-l">
//             <label>Check Out: </label>
//             <input
//               className="border-2 border-gray-300"
//               type="date"
//               value={checkOut}
//               onChange={(e) => setCheckOut(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="py-3 px-4 border-t">
//           <label className="mr-2">No. of Guest: </label>
//           <input
//             type="number"
//             value={guest}
//             onChange={(e) => setGuest(Number(e.target.value))}
//           />
//         </div>
//         {noOfNights > 0 && (
//           <div className="py-3 px-4 border-t">
//             <label>Your full name:</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(ev) => setName(ev.target.value)}
//             />
//             <label>Your Email:</label>
//             <input
//               type="text"
//               value={email}
//               onChange={(ev) => setEmail(ev.target.value)}
//             />
//             <label>Phone number:</label>
//             <input
//               type="tel"
//               value={phone}
//               onChange={(ev) => setPhone(ev.target.value)}
//               className="border-2 border-gray-300 px-1 ml-2"
//             />
//           </div>
//         )}
//       </div>
//       <button
//         onClick={handleBooking}
//         className="primary mt-4 bg-primary hover:bg-primary-dark text-white py-2 group transition-transform transform hover:scale-105 px-4 rounded-full transition duration-300"
//       >
//         Book this place
//         {noOfNights > 0 && <span> for ₹{noOfNights * baseprice}</span>}
//       </button>
//     </div>
//   );
// }

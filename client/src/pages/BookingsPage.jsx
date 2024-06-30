import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import AccountNav from "./AccountNav";
import { differenceInBusinessDays, format } from "date-fns";
import { Link } from "react-router-dom";
import Dates from "../Dates";
import LogoutButton from "../Logout";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("/bookings").then((response) => {
      setBookings(response.data);
      //console.log(response.data);
      //console.log(response.data.length);
      if (response.data.length > 0) {
        setLoading(false);
      } else {
        setLoading(true);
      }
    });
  }, []);
  //console.log(bookings);
  return (
    <>
      <div>
        <AccountNav />

        <div className="mt-8">
          {!loading ? (
            bookings.map((booking) => (
              <div key={booking._id} className="mb-4">
                <Link
                  to={`/account/bookings/${booking._id}`}
                  className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl group transition-transform transform hover:scale-105 transition-shadow duration-300"
                >
                  <div className="w-48 h-48 flex-shrink-0">
                    <img
                      src={
                        `http://localhost:4000/uploads/` +
                        booking.place.photos[0].split("\\").pop()
                      }
                      alt=""
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-grow py-4 px-6">
                    <h2 className="text-2xl font-semibold mb-2">
                      {booking.place.title}
                    </h2>
                    <a
                      className="block text-blue-500 font-bold underline mb-2"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        booking.place.address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {booking.place.address}
                    </a>
                    <Dates booking={booking} className={"text-gray-600 mb-2"} />
                    <div className="flex items-center gap-1 text-2xl mt-2 text-gray-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                        />
                      </svg>
                      <span>Total price: ₹ {booking.price}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center bg-gray-200 p-8 rounded-xl shadow-lg">
                <h1 className="text-2xl font-semibold text-gray-700 mb-2">
                  No bookings found
                </h1>
                <p className="text-gray-500">
                  You haven't made any bookings yet. Start exploring and booking
                  your favorite places now!
                </p>
                <Link
                  to="/"
                  className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
                >
                  Start Exploring
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <LogoutButton />
      </div>
    </>
  );
}

// import axios from "axios";
// import { useEffect, useState } from "react";
// import AccountNav from "./AccountNav";
// import { differenceInBusinessDays, format } from "date-fns";
// import { Link } from "react-router-dom";

// export default function BookingsPage() {
//   const [bookings, setBookings] = useState([]);
//   useEffect(() => {
//     axios.get("/bookings").then((response) => {
//       setBookings(response.data);
//     });
//   }, []);
//   //console.log("saxena");
//   //console.log(bookings);
//   //console.log(bookings.length);
//   return (
//     <div>
//       <AccountNav />

//       <div>
//         {bookings.length > 0 ? (
//           bookings.map((booking) => {
//             //console.log("aman");
//             //console.log("Booking data:", booking);
//             return (
//               <div key={booking._id}>
//                 <Link
//                   to={`/account/bookings/${booking._id}`}
//                   className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden"
//                 >
//                   {/* {console.log(
//                   `http://localhost:4000/uploads/` +
//                     booking.place.photos[0].split("\\").pop()
//                 )} */}
//                   <div className="w-32">
//                     <img
//                       src={
//                         `http://localhost:4000/uploads/` +
//                         booking.place.photos[0].split("\\").pop()
//                       }
//                       alt=""
//                     />
//                   </div>
//                   <div className="py-3">
//                     <h2 className="text-xl font-semibold">
//                       {booking.place.title}
//                     </h2>
//                     <a
//                       className="my-2 block text-blue-500 font-bold underline"
//                       href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//                         booking.place.address
//                       )}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       onClick={(e) => e.stopPropagation()} // Stop the event propagation
//                     >
//                       {booking.place.address}
//                     </a>
//                     <div className="flex gap-2 border-t border-gray-300 pt-2 mt-2 text-gray-600">
//                       <div className="flex gap-1 mb-2 mt-2">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           strokeWidth={1.5}
//                           stroke="currentColor"
//                           className="size-6"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
//                           />
//                         </svg>
//                         {differenceInBusinessDays(
//                           new Date(booking.checkOut),
//                           new Date(booking.checkIn)
//                         )}{" "}
//                         nights:
//                       </div>
//                       <div className="flex gap-1 items-center">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           fill="currentColor"
//                           className="size-6"
//                         >
//                           <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
//                           <path
//                             fillRule="evenodd"
//                             d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                         {format(new Date(booking.checkIn), "MMM dd, yyyy")}
//                       </div>
//                       &rarr;{" "}
//                       <div className="flex gap-1 items-center">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           viewBox="0 0 24 24"
//                           fill="currentColor"
//                           className="size-6"
//                         >
//                           <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
//                           <path
//                             fillRule="evenodd"
//                             d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                         {format(new Date(booking.checkOut), "MMM dd, yyyy")}
//                       </div>
//                     </div>
//                     <div className="text-xl">
//                       <div className="flex gap-1 mt-2">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           strokeWidth={1.5}
//                           stroke="currentColor"
//                           className="size-8"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
//                           />
//                         </svg>
//                         <span className="text-2xl">
//                           Total price: ${booking.price}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             );
//           })
//         ) : (
//           <h1>No bookings found</h1>
//         )}
//       </div>
//     </div>
//   );
// }

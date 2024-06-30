import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceGallery from "../PlaceGallery";
import Dates from "../Dates";
import { FaSpinner } from "react-icons/fa";
import LogoutButton from "../Logout";

export default function BookingPage() {
  const [booking, setBooking] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then((response) => {
        const foundBooking = response.data.find(({ _id }) => _id === id);
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
  }, [id]);

  return (
    <>
      <div className="min-h-screen bg-gray-100 ">
        {booking ? (
          <>
            <div className="container mx-auto max-w-screen-lg mt-4 px-4">
              <h1 className="text-3xl font-bold text-gray-800">
                {booking.place.title}
              </h1>
              <a
                className="block text-blue-500 font-bold text-xl mt-2 underline hover:text-blue-700 transition-colors duration-300 mb-4"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  booking.place.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                {booking.place.address}
              </a>
              <div className="bg-gray-200 p-6 my-6 rounded-2xl flex flex-col md:flex-row justify-between items-center shadow-lg">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                    Your Booking Information
                  </h2>
                  <Dates booking={booking} className="mt-4" />
                </div>
                <div className="bg-primary text-white p-6 rounded-2xl shadow-md transition-transform transform hover:scale-105 hover:shadow-lg">
                  <div className="text-lg font-semibold">Total Price</div>
                  <div className="text-2xl font-bold">
                    ₹{booking.place.price}
                  </div>
                </div>
              </div>
            </div>
            <PlaceGallery place={booking.place} />
          </>
        ) : (
          <div className="flex justify-center items-center h-screen">
            <FaSpinner className="animate-spin text-4xl text-primary" />
            <span className="ml-4 text-xl text-gray-700">
              Loading booking details...
            </span>
          </div>
        )}
      </div>
      <div>
        <LogoutButton />
      </div>
    </>
  );
}

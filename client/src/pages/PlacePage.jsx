import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import BookingWidget from "./BookingWidget";
import PlaceGallery from "../PlaceGallery";
import LogoutButton from "../Logout";

export default function PlacePage() {
  const params = useParams();
  const id = params.id;

  const [place, setPlace] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios
      .get(`/places/${id}`)
      .then((response) => {
        setPlace(response.data);
        checkIfFavorite(response.data._id);
      })
      .catch((error) => {
        console.error("Error fetching place:", error);
      });
  }, [id]);

  const checkIfFavorite = async (placeId) => {
    try {
      const response = await axios.get("/user/favorites");
      //console.log(response.data);
      const favorites = response.data.favorites;
      setIsFavorite(favorites.map((fav) => fav._id).includes(placeId));
    } catch (error) {
      console.error("Error checking favorites:", error);
    }
  };

  const toggleFavorite = async () => {
    try {
      await axios.put(`/users/toggleFavorite/${place._id}`);
      setIsFavorite(!isFavorite);
      console.log("isFavorite after toggle:", !isFavorite); // Log the new state after toggle
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  if (!place) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mx-auto max-w-screen-lg mt-2 px-4 bg-gray-100 relative">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">{place.title}</h1>

          <button onClick={toggleFavorite} className="text-3xl bg-transparent">
            {isFavorite ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-12 h-12 text-red-500"
              >
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            )}
          </button>
        </div>
        <a
          className="block text-blue-500 font-bold text-xl mt-2 underline hover:text-blue-700 transition-colors duration-300 mb-4"
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            place.address
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          {place.address}
        </a>
        <PlaceGallery place={place} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 px-4 py-4">
          <div className="bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="text-gray-700">{place.description}</p>
            <div className="mt-4">
              <p>
                <strong>Check-In Time:</strong> {place.checkIn}
              </p>
              <p>
                <strong>Check-Out Time:</strong> {place.checkOut}
              </p>
              <p>
                <strong>Max. no of Guest:</strong> {place.maxGuest}
              </p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
            <BookingWidget place={place} />
          </div>
        </div>

        <div className="bg-white -mx-8 px-8 mt-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
          <h2 className="text-2xl font-bold py-4 px-4">Extra Info</h2>
          <div className="text-gray-700 leading-6 px-4">{place.extraInfo}</div>
        </div>
      </div>
      <div>
        <LogoutButton />
      </div>
    </>
  );
}

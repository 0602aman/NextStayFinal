import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LogoutButton from "../Logout";
import { UserContext } from "../UserContext";
import Footer from "../Footer";

export default function IndexPage({ disableLinks }) {
  const [places, setPlaces] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces([...response.data]);
    });
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-10 gap-5">
        {places.length > 0 &&
          places.map((place) =>
            disableLinks ? (
              <div
                key={place._id}
                className="group transition-transform transform hover:scale-105"
              >
                <div className="w-auto h-auto flex flex-col leading-40 items-center justify-center p-2 overflow-hidden shadow-lg hover:shadow-2xl rounded-lg">
                  {place.photos && place.photos.length > 0 && (
                    <img
                      src={`http://localhost:4000/uploads/${place.photos[0]
                        .split("\\")
                        .pop()}`}
                      alt={""}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                </div>
                <h3 className="font-bold mt-2">{place.address}</h3>
                <h2 className="text-sm mt-2 text-gray-500">{place.title}</h2>
                <div className="mt-2">
                  <span className="font-bold">₹{place.price}</span> per night
                </div>
              </div>
            ) : (
              <Link
                to={"/place/" + place._id}
                key={place._id}
                className="group transition-transform transform hover:scale-105"
              >
                <div className="w-auto h-auto flex flex-col leading-40 items-center justify-center p-2 overflow-hidden shadow-lg hover:shadow-2xl rounded-lg">
                  {place.photos && place.photos.length > 0 && (
                    <img
                      src={`http://localhost:4000/uploads/${place.photos[0]
                        .split("\\")
                        .pop()}`}
                      alt={""}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  )}
                </div>
                <h3 className="font-bold mt-2">{place.address}</h3>
                <h2 className="text-sm mt-2 text-gray-500">{place.title}</h2>
                <div className="mt-2">
                  <span className="font-bold">₹{place.price}</span> per night
                </div>
              </Link>
            )
          )}
      </div>
      <div>{user && <LogoutButton />}</div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
}

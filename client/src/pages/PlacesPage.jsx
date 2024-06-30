import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";
import axios from "axios";
import LogoutButton from "../Logout";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  const handleDelete = (placeId) => {
    console.log(placeId);
    axios
      .delete(`/places/${placeId}`)
      .then(() => {
        setPlaces((prevPlaces) =>
          prevPlaces.filter((place) => place._id !== placeId)
        );
      })
      .catch((error) => {
        console.error("There was an error deleting the place!", error);
      });
  };

  return (
    <>
      <div>
        <AccountNav />
        <div className="text-center">
          <Link
            className="inline-flex items-center gap-1 bg-primary py-2 px-6 text-white rounded-full transition-transform transform hover:scale-105"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
        </div>
        <div className="mt-4 grid gap-4">
          {places.length > 0 &&
            places.map((place, index) => {
              if (place.photos && place.photos.length > 0) {
                const modifiedPhotos = place.photos.map((photo) => {
                  const photoName = photo.split("\\").pop();
                  return "http://localhost:4000/uploads/" + photoName;
                });

                return (
                  <div
                    className="bg-gray-100 cursor-pointer flex gap-4 rounded-2xl p-4 items-center transition-shadow hover:shadow-lg transform hover:scale-105 relative"
                    key={place.id || index}
                  >
                    <Link
                      to={"/account/places/" + place._id}
                      className="flex items-center gap-4 w-full"
                    >
                      <div className="w-48 h-48 flex-shrink-0 bg-gray-300 rounded-2xl overflow-hidden">
                        {modifiedPhotos.length > 0 && (
                          <img
                            src={modifiedPhotos[0]}
                            alt=""
                            className="w-full h-full object-cover transition-transform transform hover:scale-110"
                          />
                        )}
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-xl font-semibold text-primary transition-colors hover:text-primary">
                          {place.title}
                        </h2>
                        <p className="text-base mt-2 text-gray-800 leading-relaxed hover:text-primary">
                          {place.description}
                        </p>
                      </div>
                    </Link>
                    <button
                      onClick={() => handleDelete(place._id)}
                      className="absolute right-4 top-4 bg-red-500 text-white rounded-full p-2 hover:bg-red-700 transition-transform transform hover:scale-110"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                );
              } else {
                return null;
              }
            })}
        </div>
      </div>
      <div>
        <LogoutButton />
      </div>
    </>
  );
}

// import React from "react";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import AccountNav from "./AccountNav";
// import axios from "axios";
// import LogoutButton from "../Logout";

// export default function PlacesPage() {
//   const [places, setPlaces] = useState([]);

//   useEffect(() => {
//     axios.get("/user-places").then(({ data }) => {
//       setPlaces(data);
//     });
//   }, []);

//   return (
//     <>
//       <div>
//         <AccountNav />
//         <div className="text-center">
//           <Link
//             className="inline-flex items-center gap-1 bg-primary py-2 px-6 text-white rounded-full transition-transform transform hover:scale-105"
//             to={"/account/places/new"}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="h-6 w-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 4.5v15m7.5-7.5h-15"
//               />
//             </svg>
//             Add new place
//           </Link>
//         </div>
//         <div className="mt-4 grid gap-4">
//           {places.length > 0 &&
//             places.map((place, index) => {
//               if (place.photos && place.photos.length > 0) {
//                 const modifiedPhotos = place.photos.map((photo) => {
//                   const photoName = photo.split("\\").pop();
//                   return "http://localhost:4000/uploads/" + photoName;
//                 });

//                 return (
//                   <Link
//                     to={"/account/places/" + place._id}
//                     className="bg-gray-100 cursor-pointer flex gap-4 rounded-2xl p-4 items-center transition-shadow hover:shadow-lg transform hover:scale-105"
//                     key={place.id || index}
//                   >
//                     <div className="w-48 h-48 flex-shrink-0 bg-gray-300 rounded-2xl overflow-hidden">
//                       {modifiedPhotos.length > 0 && (
//                         <img
//                           src={modifiedPhotos[0]}
//                           alt=""
//                           className="w-full h-full object-cover transition-transform transform hover:scale-110"
//                         />
//                       )}
//                     </div>
//                     <div className="flex-grow">
//                       <h2 className="text-xl font-semibold text-primary transition-colors hover:text-primary">
//                         {place.title}
//                       </h2>
//                       <p className="text-base mt-2 text-gray-800 leading-relaxed hover:text-primary">
//                         {place.description}
//                       </p>
//                     </div>
//                   </Link>
//                 );
//               } else {
//                 return null;
//               }
//             })}
//         </div>
//       </div>
//       <div>
//         <LogoutButton />
//       </div>
//     </>
//   );
// }

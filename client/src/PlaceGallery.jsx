import React from "react";
import { useState } from "react";

export default function PlaceGallery({ place }) {
  const [startIndex, setStartIndex] = useState(1); // Index to start displaying photos
  const [showMore, setShowMore] = useState(false); // Initially show more is false
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (!place.photos) {
    console.error("place.photos is undefined or null");
    return <div>Error loading photos</div>;
  }

  const transformedPhotos = Array.isArray(place.photos)
    ? place.photos.map((photo) => photo.split("\\").pop())
    : [];

  const handleShowMore = () => {
    const nextIndex = startIndex + 4;
    if (nextIndex >= transformedPhotos.length) {
      setShowMore(!showMore); // Toggle showMore state if all photos are displayed
    }
    setStartIndex(nextIndex); // Increment startIndex to display next set of photos
  };

  const handleShowLess = () => {
    setShowMore(false); // Set showMore to false when toggling to "Show Less"
    setStartIndex(1); // Reset startIndex to display initial 5 photos
  };

  if (showAllPhotos) {
    return (
      <div>
        <div className="absolute inset-0 bg-black text-white min-h-screen ">
          <div className="bg-black p-8 grid gap-4 grid-cols-2">
            <div className="col-span-2 flex justify-between items-center">
              <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
              <button
                onClick={() => setShowAllPhotos(false)}
                className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
                Close photos
              </button>
            </div>
            {place?.photos?.length > 0 &&
              place.photos.map((photo, index) => (
                <div key={photo.id || index}>
                  <img
                    className="w-full h-full object-cover rounded-md object-center gap-10"
                    //className="mx-auto max-w-screen-lg object-cover rounded-md gap-10 relative"
                    src={
                      `http://localhost:4000/uploads/` + photo.split("\\").pop()
                    }
                    alt=""
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-lg mt-2 px-4 bg-gray-100 relative overflow-hidden">
      {/*<h2 className="text-2xl font-bold">{place.title}</h2>
      <a
        className="my-2 block text-blue-500 font-bold underline"
        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          place.address
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {place.address}
      </a>*/}
      <div className="grid gap-4 grid-cols-4">
        <div className="col-span-2">
          {transformedPhotos[0] && (
            <img
              onClick={() => setShowAllPhotos(true)}
              className="rounded-md w-full h-[600px] object-cover cursor-pointer"
              src={`http://localhost:4000/uploads/` + transformedPhotos[0]}
              alt=""
            />
          )}
        </div>
        <div className="col-span-2 grid grid-cols-2 gap-4 relative">
          {transformedPhotos
            .slice(startIndex, startIndex + 4)
            .map((photo, index) => (
              <img
                onClick={() => setShowAllPhotos(true)}
                className="w-full h-[296px] object-cover rounded-md cursor-pointer"
                key={index}
                src={`http://localhost:4000/uploads/` + photo}
                alt=""
              />
            ))}
        </div>
      </div>
      <div className="flex justify-between mt-4">
        {transformedPhotos.length > 5 && startIndex > 1 && (
          <button
            className="bg-black text-white px-4 py-2 group transition-transform transform hover:scale-105 rounded-md opacity-75"
            onClick={handleShowLess}
          >
            Show Less
          </button>
        )}
        {transformedPhotos.length > startIndex + 4 && (
          <button
            className="bg-black text-white px-4 py-2 rounded-md opacity-75 group transition-transform transform hover:scale-105 ml-auto"
            onClick={handleShowMore}
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
}

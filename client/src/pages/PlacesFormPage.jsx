import React from "react";
import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Perks from "../Perks";
import axios from "axios";
import AccountNav from "./AccountNav";
import { Navigate, useParams } from "react-router-dom";
import LogoutButton from "../Logout";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  //const [photolink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuest, setMaxGuest] = useState(1);
  const [price, setPrice] = useState(99);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    console.log(id);
    if (!id) {
      return;
    }
    console.log("2");
    axios.get("/places/" + id).then((response) => {
      console.log(response.data);
      const { data } = response;
      setTitle(data.title);
      console.log(data.title);
      setAddress(data.address);
      console.log(data.address);
      setAddedPhotos(data.photos);
      console.log(data.title);
      setDescription(data.description);
      console.log(data.description);
      setPerks(data.perks);
      console.log(data.perks);
      setExtraInfo(data.extraInfo);
      console.log(data.extraInfo);
      setCheckIn(data.checkIn);
      console.log(data.checkIn);
      setCheckOut(data.checkOut);
      console.log(data.checkOut);
      setMaxGuest(data.maxGuest);
      console.log(data.maxGuest);
      setPrice(data.price);
      console.log(data.price);
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(ev) {
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuest,
      price,
    };
    ev.preventDefault();
    if (id) {
      //update places in form
      await axios.put("/places", { id, ...placeData });
      setRedirect(true);
    } else {
      //add new place in from
      await axios.post("/places", {
        ...placeData,
      });
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }
  return (
    <>
      <div className="">
        <AccountNav />
        <form onSubmit={savePlace}>
          {preInput("Title", "Title should be short and catchy")}
          <input
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            placeholder="title: for eg:- My lovely apartment"
          />
          {preInput("Address", "Address to this place")}
          <input
            type="text"
            value={address}
            onChange={(ev) => setAddress(ev.target.value)}
            placeholder="Add address"
          ></input>
          {preInput("Photos", "more-better")}
          <PhotosUploader addedphotos={addedPhotos} onChange={setAddedPhotos} />
          <div>
            {preInput("Description", "description of the place")}

            <textarea
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
          </div>

          {preInput("Perks", "Select all the perks")}
          <div className="grid gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mt-2">
            <Perks selected={perks} onChange={setPerks} />
          </div>

          <div>
            {preInput("Extra Info", "house,rules,etc")}
            <textarea
              value={extraInfo}
              onChange={(ev) => setExtraInfo(ev.target.value)}
            />
          </div>
          <div>
            {preInput(
              "Checkin & Checkout Time",
              "please add checkin and checkout time and please leave some time" +
                "for room cleaning between guests"
            )}

            <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              <div>
                <h3 className="mt-2 -mb-1">Add Checkin time</h3>
                <input
                  type="text"
                  placeholder="12:00"
                  value={checkIn}
                  onChange={(ev) => setCheckIn(ev.target.value)}
                ></input>
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Add Checkout time</h3>
                <input
                  type="text"
                  placeholder="11:00"
                  value={checkOut}
                  onChange={(ev) => setCheckOut(ev.target.value)}
                ></input>
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Maximum Guest</h3>
                <input
                  type="number"
                  placeholder="2"
                  value={maxGuest}
                  onChange={(ev) => setMaxGuest(ev.target.value)}
                ></input>
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Price per night</h3>
                <input
                  type="number"
                  placeholder="₹99 - ₹99999"
                  value={price}
                  onChange={(ev) => setPrice(ev.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <div>
            <button className="primary mt-4"> Save </button>
          </div>
        </form>
      </div>
      <div>
        <LogoutButton />
      </div>
    </>
  );
}

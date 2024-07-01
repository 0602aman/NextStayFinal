import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import IndexPage from "./pages/IndexPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import axios from "axios";
import { UserContextProvider } from "./UserContext.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import PlacesPage from "./pages/PlacesPage.jsx";
import Chatbot from "./Chatbot.jsx";
import PlacesFormPage from "./pages/PlacesFormPage.jsx";
import PlacePage from "./pages/PlacePage.jsx";
import BookingsPage from "./pages/BookingsPage.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import GoogleLogin from "./GoogleLogin.jsx";
import PhonePe from "./pages/PhonePe.jsx";
import { useState } from "react";

axios.defaults.baseURL = "https://next-stay-final-backend.vercel.app";
axios.defaults.withCredentials = true;
function App() {
  const [user, setUser] = useState(null);
  return (
    <UserContextProvider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account/" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFormPage />} />
          <Route path="/account/places/:id" element={<PlacesFormPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
          <Route path="/google" element={<GoogleLogin />} />
          <Route path="/phonepe" element={<PhonePe />} />
          {/* <Route path="/account/booking" element={<ProfilePage />} />
          <Route path="/account/places" element={<ProfilePage />} /> */}
        </Route>
      </Routes>
      <Chatbot />
    </UserContextProvider>
  );
}

export default App;

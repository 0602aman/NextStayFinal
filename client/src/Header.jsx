import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md ">
      <Link
        to="/"
        className="flex items-center gap-1 hover:text-primary transition-colors duration-300 group transition-transform transform hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
          />
        </svg>

        <span className="font-bold text-xl">NextStay</span>
      </Link>

      <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md hover:shadow-lg transition-shadow duration-300 group transition-transform transform hover:scale-105">
        <div>Anywhere</div>
        <div className="border-l border-gray-300"></div>
        <div>Any Week</div>
        <div className="border-l border-gray-300"></div>
        <div>Add Guest</div>
        <button className="bg-primary text-white p-1  rounded-full hover:bg-primary-dark transition-colors duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>

      <Link
        to={user ? "/account" : "/login"}
        className="flex items-center gap-2 border border-gray-300 group transition-transform transform hover:scale-105 rounded-full py-2 px-4 shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
        <div className="bg-gray-500 text-white border border-gray-300 rounded-full overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 relative top-1"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {!!user && <div>{user.name}</div>}
      </Link>
    </header>
  );
}

export default Header;

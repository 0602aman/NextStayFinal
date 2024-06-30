import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <h2 className="text-xl font-semibold mb-3">About NextStay</h2>
            <p className="text-sm">
              NextStay is your trusted companion for your next vacation. We
              specialize in providing the best rental properties to make your
              trips comfortable and memorable. Experience hassle-free bookings
              and top-notch customer service for your happy vacation.
            </p>
          </div>
          <div className="col-span-1">
            <h2 className="text-xl font-semibold mb-3">Contact Info</h2>
            <ul className="text-sm">
              <li>Email: 0602aman@gmail.com</li>
              <li>Phone: +1234567890</li>
              <li>Address: 123 Main St, City, Country</li>
            </ul>
          </div>
          <div className="col-span-1">
            <h2 className="text-xl font-semibold mb-3">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-400">
                Facebook
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                Twitter
              </a>
              <a href="#" className="text-white hover:text-gray-400">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 text-center text-sm">
          &copy; {new Date().getFullYear()} NextStay. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

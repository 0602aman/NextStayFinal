import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sha256 from "crypto-js/sha256";
import { redirect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Pay = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const handleFormData = (e) => {
    // console.log(e.target.value);
    const dd = { ...data, [e.target.name]: e.target.value };
    setData(dd);
  };

  const makePayment = async (e) => {
    e.preventDefault();
    function generateTransactionId() {
      return "Tr-" + uuidv4().toString(36).slice(-6);
    }
    //const transactionid = "Tr-" + uuidv4().toString(36).slice(-6);

    const payload = {
      merchantId: "PGTESTPAYUAT",
      merchantTransactionId: generateTransactionId(),
      merchantUserId: "MUID98E65D31S31R32",
      name: "VIRAT KOHLI",
      amount: 10000,
      redirectUrl: "http://localhost:4000/api/status",
      redirectMode: "POST",

      mobileNumber: "9999999999",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const dataPayload = JSON.stringify(payload);
    console.log(dataPayload);

    try {
      const response = await axios.post("http://localhost:4000/api/pay", {
        payload,
      });

      const redirectUrl =
        response.data.data.instrumentResponse.redirectInfo.url;
      window.location.href = redirectUrl;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                value={data.name}
                onChange={(e) => handleFormData(e)}
                type="text"
                //autoComplete="name"
                required=""
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="Mobile"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Mobile
            </label>
            <div className="mt-2">
              <input
                id="Mobile"
                name="mobile"
                type="text"
                value={data.mobile}
                onChange={(e) => handleFormData(e)}
                //autoComplete="Mobile"
                required=""
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="Amount"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Amount
            </label>
            <div className="mt-2">
              <input
                id="Amount"
                name="amount"
                value={data.amount}
                type="text"
                //autoComplete="Amount"
                onChange={(e) => handleFormData(e)}
                required=""
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="MUID"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              MUID
            </label>
            <div className="mt-2">
              <input
                id="MUID"
                name="muid"
                value={data.muid}
                onChange={(e) => handleFormData(e)}
                type="text"
                //autoComplete="MUID"
                required=""
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div></div>
          <div>
            <button
              onClick={(e) => makePayment(e)}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Pay
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pay;

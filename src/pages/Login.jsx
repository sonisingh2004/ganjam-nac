import React, { useState } from "react";

const Login = () => {
  const [role, setRole] = useState("citizen");

  return (
    <div className="min-h-screen flex">

      {/* LEFT SECTION */}
      <div className="hidden lg:flex w-3/5 bg-green-700 text-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-12">
            <img src="https://swachhganjam.in/assets/logo-D7UUn_EU.png" alt="logo" className="h-10" />
            <h1 className="text-lg font-semibold">GANJAM N.A.C</h1>
          </div>

          <h2 className="text-4xl font-bold mb-4">
            Solid Waste Management System
          </h2>

          <p className="text-green-100 max-w-md mb-10">
            Join our community effort to create a cleaner, greener environment
            through responsible waste management.
          </p>

          <div className="flex gap-4">
            {["PAPER", "GLASS", "ORGANIC", "PLASTIC"].map((item) => (
              <div
                key={item}
                className="w-24 h-20 bg-green-600 rounded-lg flex flex-col items-center justify-center text-sm"
              >
                ♻
                <span className="mt-1">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-green-200">
          © 2025 Solid Waste Management System
        </p>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-2/5 flex items-center justify-center bg-gray-50 px-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">

          {/* LOGO */}
          <div className="flex justify-center mb-4">
            <img src="https://swachhganjam.in/assets/logo-D7UUn_EU.png" alt="logo" className="h-14" />
          </div>

          {/* ROLE TABS */}
          <div className="flex justify-center gap-6 mb-6 text-sm font-medium">
            {["citizen", "supervisor", "admin"].map((item) => (
              <button
                key={item}
                onClick={() => setRole(item)}
                className={`pb-2 uppercase ${
                  role === item
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-400"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* TITLE */}
          <h2 className="text-xl font-semibold text-center mb-2">
            {role.charAt(0).toUpperCase() + role.slice(1)} Login
          </h2>

          <p className="text-sm text-gray-500 text-center mb-6">
            Welcome to the Solid Waste Management System
          </p>

          {/* LOGIN FORM */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Phone Number *"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              GET OTP
            </button>
          </form>

          <p className="text-xs text-center text-gray-500 mt-6">
            By logging in, you agree to our{" "}
            <span className="text-green-600 cursor-pointer">Terms of Service</span>{" "}
            and{" "}
            <span className="text-green-600 cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

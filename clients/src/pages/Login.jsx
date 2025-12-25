import React, { useState } from "react";

const text = {
  en: {
    title: "Solid Waste Management System",
    welcome: "Welcome to the Solid Waste Management System",
    phone: "Phone Number *",
    getOtp: "GET OTP",
    verifyOtp: "VERIFY OTP",
    login: "Login"
  },
  hi: {
    title: "ठोस अपशिष्ट प्रबंधन प्रणाली",
    welcome: "ठोस अपशिष्ट प्रबंधन प्रणाली में आपका स्वागत है",
    phone: "मोबाइल नंबर *",
    getOtp: "ओटीपी प्राप्त करें",
    verifyOtp: "ओटीपी सत्यापित करें",
    login: "लॉगिन"
  },
  od: {
    title: "ଠୋସ ଅବଞ୍ଜନ ପରିଚାଳନା ପ୍ରଣାଳୀ",
    welcome: "ଠୋସ ଅବଞ୍ଜନ ପରିଚାଳନା ପ୍ରଣାଳୀକୁ ସ୍ୱାଗତ",
    phone: "ମୋବାଇଲ୍ ନମ୍ବର *",
    getOtp: "ଓଟିପି ପାଆନ୍ତୁ",
    verifyOtp: "ଓଟିପି ଯାଞ୍ଚ",
    login: "ଲଗଇନ୍"
  }
};

const Login = () => {
  const [role, setRole] = useState("citizen");
  const [lang, setLang] = useState("en");
  const t = text[lang];

  // Notice popup (once)
  const [showNotice, setShowNotice] = useState(
    !localStorage.getItem("noticeAccepted")
  );

  // OTP states
  const [phone, setPhone] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");

  return (
    <div className="min-h-screen flex relative">

      {/* ================= NOTICE POPUP ================= */}
      {showNotice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden">

            <div className="bg-green-700 text-white px-6 py-4 flex items-center gap-3">
              <span className="text-xl">⚠️</span>
              <h2 className="text-lg font-semibold">Official Notice</h2>
            </div>

            <div className="px-6 py-5 text-gray-700 text-sm leading-relaxed">
              <p className="mb-3">
                This portal is an official digital service of
                <span className="font-semibold"> Berhampur N.A.C </span>
                under the Solid Waste Management System.
              </p>
              <p className="mb-3">
                Any misuse, false reporting, or unauthorized access may lead
                to administrative or legal action.
              </p>
              <p>
                Please proceed only if you are an authorized user or
                registered citizen.
              </p>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-center">
              <button
                onClick={() => {
                  localStorage.setItem("noticeAccepted", "true");
                  setShowNotice(false);
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-md"
              >
                I Understand
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ================= MOBILE NAVBAR ================= */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-green-600 flex items-center gap-3 px-4 py-3 z-40">
        <img
          src="https://swachhganjam.in/assets/logo-D7UUn_EU.png"
          className="h-8"
          alt="logo"
        />
        <span className="text-white font-semibold text-sm">
          Solid Waste Management
        </span>

        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="ml-auto text-sm rounded px-1"
        >
          <option value="en">EN</option>
          <option value="hi">HI</option>
          <option value="od">OD</option>
        </select>
      </div>

      {/* ================= LEFT SECTION ================= */}
      <div className="hidden lg:flex w-1/2 bg-[#2f7d57] text-white px-16 py-20">
        <div>
          <div className="flex items-center gap-3 mb-16">
            <img
              src="https://swachhganjam.in/assets/logo-D7UUn_EU.png"
              className="h-10"
              alt="logo"
            />
            <span className="font-semibold text-lg">GANJAM N.A.C</span>
          </div>

          <h1 className="text-5xl font-bold mb-6">{t.title}</h1>

          <p className="text-green-100 max-w-md mb-14">
            Join our community effort to create a cleaner, greener environment
            through responsible waste management.
          </p>

          <div className="flex gap-6">
            {["PAPER", "GLASS", "ORGANIC", "PLASTIC"].map((i) => (
              <div
                key={i}
                className="w-28 h-24 bg-white/10 border border-white/20 rounded-lg
                           flex flex-col items-center justify-center text-sm"
              >
                ♻
                <span className="mt-1">{i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= RIGHT SECTION ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 pt-20 lg:pt-0">
        <div className="bg-white w-full max-w-md p-8 shadow-lg rounded">

          {/* Language (desktop) */}
          <div className="hidden lg:flex justify-end mb-2">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="border text-sm rounded px-2 py-1"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="od">ଓଡ଼ିଆ</option>
            </select>
          </div>

          <div className="flex justify-center mb-4">
            <img
              src="https://swachhganjam.in/assets/logo-D7UUn_EU.png"
              className="h-20"
              alt="logo"
            />
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-8 text-sm mb-6">
            {["citizen", "supervisor", "admin"].map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRole(r);
                  setShowOtp(false);
                  setPhone("");
                  setOtp("");
                }}
                className={`uppercase pb-2 ${
                  role === r
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-400"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-center mb-2 capitalize">
            {role} Login
          </h2>

          <p className="text-center text-gray-500 text-sm mb-6">
            {t.welcome}
          </p>

          {/* ================= CITIZEN OTP FLOW ================= */}
          {role === "citizen" && !showOtp && (
            <>
              <input
                value={phone}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10) {
                    setPhone(e.target.value);
                  }
                }}
                placeholder={t.phone}
                className="w-full border px-4 py-2 rounded mb-5"
              />

              <button
                disabled={phone.length !== 10}
                onClick={() => setShowOtp(true)}
                className={`w-full py-2 rounded text-white ${
                  phone.length === 10
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-green-300 cursor-not-allowed"
                }`}
              >
                {t.getOtp}
              </button>
            </>
          )}

          {role === "citizen" && showOtp && (
            <>
              <p className="text-sm text-center text-gray-600 mb-2">
                Demo OTP: <span className="font-semibold">123456</span>
              </p>

              <input
                value={otp}
                onChange={(e) => {
                  if (/^\d*$/.test(e.target.value) && e.target.value.length <= 6) {
                    setOtp(e.target.value);
                  }
                }}
                placeholder="Enter OTP"
                className="w-full border px-4 py-2 rounded mb-5"
              />

              <button
                onClick={() => {
                  if (otp === "123456") {
                    alert("OTP Verified (Demo)");
                  } else {
                    alert("Invalid OTP");
                  }
                }}
                className="w-full bg-green-600 text-white py-2 rounded"
              >
                {t.verifyOtp}
              </button>
            </>
          )}

          {/* ================= SUPERVISOR / ADMIN ================= */}
          {role !== "citizen" && (
            <>
              <input
                placeholder="Username *"
                className="w-full border px-4 py-2 rounded mb-4"
              />
              <input
                type="password"
                placeholder="Password *"
                className="w-full border px-4 py-2 rounded mb-5"
              />
              <button className="w-full bg-green-600 text-white py-2 rounded">
                {t.login}
              </button>
            </>
          )}

          <p className="text-xs text-center text-gray-500 mt-6">
            By logging in, you agree to our Terms of Service and Privacy Policy
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;

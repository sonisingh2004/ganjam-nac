import React, { useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

const Login = () => {
  const { t, i18n } = useTranslation();

  const [role, setRole] = useState("citizen");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-green-600 to-teal-600"></div>
      
      {/* ================= MOBILE NAVBAR ================= */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-40
                      bg-green-700/95 backdrop-blur-md
                      flex items-center justify-between px-4 py-3 shadow-md">
        {/* LEFT: LOGO + TEXT */}
        <div className="flex items-center gap-2">
          <img
            src="https://swachhganjam.in/assets/logo-D7UUn_EU.png"
            alt="logo"
            className="h-8"
          />
          <div className="leading-tight">
            <p className="text-white text-sm font-semibold">
              {t("berhampurNAC")}
            </p>
            <p className="text-green-100 text-[11px]">
              {t("solidWaste")}
            </p>
          </div>
        </div>

        {/* RIGHT: LANGUAGE */}
        <select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          className="text-xs rounded-md px-2 py-1 bg-white text-gray-700"
        >
          <option value="en">{t("english")}</option>
          <option value="hi">{t("hindi")}</option>
          <option value="od">{t("odia")}</option>
        </select>
      </div>

      {/* ================= POPUP (MUST & SHOULD) ================= */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.85, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 text-center"
            >
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                🏛️ {t("officialPortal")}
              </h3>

              <p className="text-sm text-gray-600 mb-6">
                {t("officialWarning")}
              </p>

              <button
                onClick={() => setShowPopup(false)}
                className="bg-green-600 hover:bg-green-700 text-white
                          px-6 py-2 rounded-xl font-medium"
              >
                {t("iUnderstand")}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= MAIN GRID ================= */}
      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
        {/* ================= LEFT PANEL ================= */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden lg:flex flex-col justify-center px-16 text-white"
        >
          {/* TOP BRANDING */}
          <div className="flex items-center gap-4 mb-10">
            <img
              src="https://swachhganjam.in/assets/logo-D7UUn_EU.png"
              alt="logo"
              className="h-14"
            />
            <div>
              <h3 className="text-xl font-semibold">{t("berhampurNAC")}</h3>
              <p className="text-sm text-green-100">{t("solidWaste")}</p>
            </div>
          </div>

          <h1 className="text-4xl font-bold mb-4">{t("smartCity")}</h1>

          <p className="text-green-100 max-w-lg mb-10">
            {t("platformDescription")}
          </p>

          <div className="grid grid-cols-2 gap-6">
            {[
              t("liveTracking"),
              t("doorCollection"),
              t("photoComplaints"),
              t("wardReports"),
            ].map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="bg-white/15 border border-white/20
                          rounded-xl px-5 py-4 text-sm"
              >
                {item}
              </motion.div>
            ))}
          </div>

          <p className="mt-10 text-xs text-green-100">
            {t("governmentAuthorized")}
          </p>
        </motion.div>

        {/* ================= RIGHT LOGIN ================= */}
        <div className="flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md bg-white/95 backdrop-blur-xl
                      rounded-3xl shadow-2xl px-8 py-10"
          >
            {/* FORM LOGO */}
            <div className="flex justify-center mb-4">
              <img
                src="https://swachhganjam.in/assets/logo-D7UUn_EU.png"
                alt="logo"
                className="h-16"
              />
            </div>

            <h2 className="text-center text-xl font-semibold text-gray-800 mb-1 capitalize">
              {t("loginAs")} {t(`roles.${role}`)}
            </h2>

            <p className="text-center text-sm text-gray-500 mb-6">
              {t("welcome")}
            </p>

            {/* LANGUAGE */}
            <div className="flex justify-center mb-6">
              <select
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="border rounded-lg px-3 py-1 text-sm"
              >
                <option value="en">{t("english")}</option>
                <option value="hi">{t("hindi")}</option>
                <option value="od">{t("odia")}</option>
              </select>
            </div>

            {/* ROLE SWITCH */}
            <div className="flex bg-gray-100 rounded-full p-1 mb-6">
              {["citizen", "supervisor", "admin"].map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setShowOtp(false);
                    setPhone("");
                    setOtp("");
                  }}
                  className={`flex-1 py-2 rounded-full text-sm transition
                  ${
                    role === r
                      ? "bg-green-600 text-white shadow"
                      : "text-gray-500"
                  }`}
                >
                  {t(`roles.${r}`)}
                </button>
              ))}
            </div>

            {/* LOGIN FLOW */}
            <AnimatePresence mode="wait">
              {/* CITIZEN PHONE */}
              {role === "citizen" && !showOtp && (
                <motion.div
                  key="citizen-phone"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <input
                    value={phone}
                    onChange={(e) =>
                      /^\d*$/.test(e.target.value) &&
                      e.target.value.length <= 10 &&
                      setPhone(e.target.value)
                    }
                    placeholder={t("phone")}
                    className="w-full border rounded-xl px-4 py-3 mb-4 text-center text-lg"
                  />

                  <button
                    disabled={phone.length !== 10}
                    onClick={() => {
                      setShowOtp(true);
                      toast.info(t("otpSent"));
                    }}
                    className={`w-full py-3 rounded-xl text-white font-semibold
                    ${
                      phone.length === 10
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-green-300 cursor-not-allowed"
                    }`}
                  >
                    {t("getOtp")}
                  </button>
                </motion.div>
              )}

              {/* CITIZEN OTP */}
              {role === "citizen" && showOtp && (
                <motion.div
                  key="citizen-otp"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <input
                    value={otp}
                    onChange={(e) =>
                      /^\d*$/.test(e.target.value) &&
                      e.target.value.length <= 6 &&
                      setOtp(e.target.value)
                    }
                    placeholder={t("enterOtp")}
                    className="w-full border rounded-xl px-4 py-3 mb-2 text-center text-lg"
                  />

                  <p className="text-xs text-center text-gray-500 mb-4">
                    {t("demoOtp")}: <b>123456</b>
                  </p>

                  <button
                    onClick={() =>
                      otp === "123456"
                        ? toast.success(t("loginSuccess"))
                        : toast.error(t("invalidOtp"))
                    }
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
                  >
                    {t("verifyOtp")}
                  </button>
                </motion.div>
              )}

              {/* ADMIN / SUPERVISOR */}
              {role !== "citizen" && (
                <motion.div
                  key="admin"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <input
                    placeholder={t("username")}
                    className="w-full border rounded-xl px-4 py-3 mb-4 text-center"
                  />
                  <input
                    type="password"
                    placeholder={t("password")}
                    className="w-full border rounded-xl px-4 py-3 mb-6 text-center"
                  />

                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold">
                    {t("login")}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-xs text-center text-gray-400 mt-6">
              {t("secureSystem")}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LOGO = "https://swachhganjam.in/assets/logo-D7UUn_EU.png";

const Login = () => {
  const { t, i18n } = useTranslation();
  const [role, setRole] = useState("citizen");
  const [phone, setPhone] = useState("");
  const [showNotice, setShowNotice] = useState(true);

  return (
    <div className="min-h-screen relative font-sans">

      {/* ================= OFFICIAL NOTICE ================= */}
      {showNotice && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 text-center shadow-xl">
            <h2 className="text-xl font-semibold text-green-700 mb-3">
              {t("officialPortal")}
            </h2>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              {t("officialWarning")}
            </p>
            <button
              onClick={() => setShowNotice(false)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
            >
              {t("iUnderstand")}
            </button>
          </div>
        </div>
      )}

      {/* ================= MOBILE NAVBAR ================= */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-40 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src={LOGO}
              alt="Logo"
              className="h-9 w-9 rounded-full object-cover"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/40")
              }
            />
            <div>
              <p className="font-semibold text-gray-800 leading-none">
                {t("berhampurNAC")}
              </p>
              <p className="text-[11px] text-gray-500">
                {t("solidWaste")}
              </p>
            </div>
          </div>

          <select
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="border rounded-md text-xs px-2 py-1"
          >
            <option value="en">EN</option>
            <option value="hi">HI</option>
            <option value="od">OD</option>
          </select>
        </div>
      </div>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="flex min-h-screen pt-20 lg:pt-0">

        {/* ================= LEFT PANEL ================= */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-green-700 to-emerald-600 text-white px-16 py-14 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] bg-[length:40px_40px]" />

          <div className="relative z-10 flex items-center gap-4">
            <img src={LOGO} className="h-12 w-12 rounded-full bg-white p-1" />
            <div>
              <h2 className="text-xl font-bold">{t("berhampurNAC")}</h2>
              <p className="text-sm text-green-100">
                {t("solidWaste")}
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <h1 className="text-6xl font-extrabold mb-6 leading-tight">
              {t("smartCity")}
            </h1>

            <p className="text-lg text-green-100 max-w-xl mb-12">
              {t("platformDescription")}
            </p>

            <div className="grid grid-cols-2 gap-6 max-w-lg">
              {[
                t("liveTracking"),
                t("doorCollection"),
                t("photoComplaints"),
                t("wardReports"),
              ].map((item) => (
                <div
                  key={item}
                  className="bg-white/20 backdrop-blur border border-white/30
                             rounded-xl px-5 py-4 text-sm shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-xs text-green-100">
            {t("governmentAuthorized")}
          </p>
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

            {/* Desktop language */}
            <div className="hidden lg:flex justify-end mb-3">
              <select
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="border rounded-md text-xs px-2 py-1"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="od">ଓଡ଼ିଆ</option>
              </select>
            </div>

            <div className="flex justify-center mb-4">
              <img src={LOGO} className="h-16 w-16 rounded-full shadow" />
            </div>

            {/* ROLE TABS */}
            <div className="flex justify-center gap-6 text-sm mb-6">
              {["citizen", "supervisor", "admin"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  className={`pb-1 font-semibold transition ${
                    role === r
                      ? "text-green-600 border-b-2 border-green-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {t(`roles.${r}`)}
                </button>
              ))}
            </div>

            <h2 className="text-xl font-semibold text-center mb-1 capitalize">
              {t("loginAs")} {t(`roles.${role}`)}
            </h2>
            <p className="text-sm text-gray-500 text-center mb-6">
              {t("welcome")}
            </p>

            {/* FORM */}
            {role === "citizen" ? (
              <>
                <input
                  value={phone}
                  onChange={(e) =>
                    /^\d*$/.test(e.target.value) &&
                    e.target.value.length <= 10 &&
                    setPhone(e.target.value)
                  }
                  placeholder={t("phone")}
                  className="w-full border rounded-lg px-4 py-3 mb-5
                             focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <button className="w-full bg-green-600 hover:bg-green-700
                                   text-white py-3 rounded-lg font-semibold shadow">
                  {t("getOtp")}
                </button>
              </>
            ) : (
              <>
                <input
                  placeholder={t("username")}
                  className="w-full border rounded-lg px-4 py-3 mb-4"
                />
                <input
                  type="password"
                  placeholder={t("password")}
                  className="w-full border rounded-lg px-4 py-3 mb-6"
                />
                <button className="w-full bg-green-600 hover:bg-green-700
                                   text-white py-3 rounded-lg font-semibold shadow">
                  {t("login")}
                </button>
              </>
            )}

            <p className="text-xs text-center text-gray-400 mt-5">
              {t("secureSystem")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

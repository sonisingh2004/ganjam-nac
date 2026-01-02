// @ts-nocheck
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";

const LOGO = "https://swachhganjam.in/assets/logo-D7UUn_EU.png";

const Login = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ FIX

  const [role, setRole] = useState("citizen");

  // citizen
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  // staff
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showNotice, setShowNotice] = useState(true);

  const featureBoxes = [
    { title: t("liveTracking"), color: "bg-emerald-500/20" },
    { title: t("doorCollection"), color: "bg-lime-500/20" },
    { title: t("photoComplaints"), color: "bg-cyan-500/20" },
    { title: t("wardReports"), color: "bg-yellow-500/20" },
  ];

  /* ================= CITIZEN OTP ================= */
  const handleGetOtp = async () => {
    if (phone.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    try {
      const res = await api.get(`/citizens?phone=${phone}`);

      if (res.data.length === 0) {
        toast.error("Phone number not registered");
        return;
      }

      setGeneratedOtp("123456");
      setShowOtpInput(true);
      toast.success("OTP sent to registered mobile");
    } catch {
      toast.error("Server error");
    }
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      toast.warning("Please enter OTP");
      return;
    }

    if (otp !== generatedOtp) {
      toast.error("Invalid OTP");
      return;
    }

    // ✅ FIX: use AuthContext
    login({ role: "citizen", phone });

    toast.success("Citizen login successful");

    setTimeout(() => {
      navigate("/citizen");
    }, 300);
  };

  /* ================= STAFF LOGIN ================= */
  const handleStaffLogin = async () => {
    if (!username || !password) {
      toast.error("Username & password required");
      return;
    }

    try {
      const res = await api.get(
        `/users?username=${username}&password=${password}&role=${role}`
      );

      if (res.data.length === 0) {
        toast.error("Invalid credentials");
        return;
      }

      const user = res.data[0];

      // ✅ FIX: use AuthContext
      login({
        role: user.role,
        username: user.username,
      });

      toast.success(
        `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} login successful`
      );

      setTimeout(() => {
        navigate(`/${user.role}`);
      }, 300);
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="min-h-screen relative font-sans">

      {/* ================= NOTICE ================= */}
      {showNotice && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 text-center shadow-xl">
            <h2 className="text-xl font-semibold text-green-700 mb-3">
              {t("officialPortal")}
            </h2>
            <p className="text-sm text-gray-600 mb-5">
              {t("officialWarning")}
            </p>
            <button
              onClick={() => setShowNotice(false)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg"
            >
              {t("iUnderstand")}
            </button>
          </div>
        </div>
      )}

      {/* ================= MOBILE NAVBAR ================= */}
      <div className="lg:hidden fixed top-0 w-full z-40 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img src={LOGO} className="h-9 w-9 rounded-full" />
            <div>
              <p className="font-semibold text-gray-800">
                {t("berhampurNAC")}
              </p>
              <p className="text-xs text-gray-500">{t("solidWaste")}</p>
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

      <div className="flex min-h-screen pt-20 lg:pt-0">

        {/* ================= LEFT PANEL ================= */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-green-700 to-emerald-600 text-white px-16 py-14 flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-10">
              <img src={LOGO} className="h-12 w-12 rounded-full bg-white p-1" />
              <div>
                <h2 className="text-xl font-bold">{t("berhampurNAC")}</h2>
                <p className="text-sm text-green-100">{t("solidWaste")}</p>
              </div>
            </div>

            <h1 className="text-6xl font-extrabold mb-6 mt-40">
              {t("smartCity")}
            </h1>

            <p className="text-lg text-green-100 mb-12">
              {t("platformDescription")}
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">
              {featureBoxes.map((item, index) => (
                <div
                  key={index}
                  className={`rounded-xl px-10 py-14 text-2xl font-medium
                  text-white border border-white/30
                  backdrop-blur shadow ${item.color}`}
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-green-100">
            {t("governmentAuthorized")}
          </p>
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

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

            {/* ROLES */}
            <div className="flex justify-center gap-6 mb-6 text-sm">
              {["citizen", "supervisor", "admin"].map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setShowOtpInput(false);
                    setOtp("");
                    setUsername("");
                    setPassword("");
                  }}
                  className={`pb-1 font-semibold ${
                    role === r
                      ? "text-green-600 border-b-2 border-green-600"
                      : "text-gray-400"
                  }`}
                >
                  {t(`roles.${r}`)}
                </button>
              ))}
            </div>

            {/* FORMS */}
            {role === "citizen" ? (
              <>
                {!showOtpInput ? (
                  <>
                    <input
                      value={phone}
                      onChange={(e) =>
                        /^\d*$/.test(e.target.value) &&
                        e.target.value.length <= 10 &&
                        setPhone(e.target.value)
                      }
                      placeholder={t("phone")}
                      className="w-full border rounded-lg px-4 py-3 mb-4"
                    />
                    <button
                      onClick={handleGetOtp}
                      className="w-full bg-green-600 text-white py-3 rounded-lg"
                    >
                      {t("getOtp")}
                    </button>
                  </>
                ) : (
                  <>
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder={t("enterOtp")}
                      className="w-full border rounded-lg px-4 py-3 mb-2"
                    />
                    <p className="text-xs text-center mb-3">
                      {t("demoOtp")}: <b>123456</b>
                    </p>
                    <button
                      onClick={handleVerifyOtp}
                      className="w-full bg-green-600 text-white py-3 rounded-lg"
                    >
                      {t("verifyOtp")}
                    </button>
                  </>
                )}
              </>
            ) : (
              <>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={t("username")}
                  className="w-full border rounded-lg px-4 py-3 mb-4"
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder={t("password")}
                  className="w-full border rounded-lg px-4 py-3 mb-6"
                />
                <button
                  onClick={handleStaffLogin}
                  className="w-full bg-green-600 text-white py-3 rounded-lg"
                >
                  {t("login")}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Phone, User, Lock, Globe } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import api from "../api/api";

const LOGO = "https://swachhganjam.in/assets/logo-D7UUn_EU.png";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [role, setRole] = useState("citizen");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showNotice, setShowNotice] = useState(true);

  const wasteCategories = [
    { name: "PAPER", color: "bg-blue-500", icon: "📄" },
    { name: "PLASTIC", color: "bg-yellow-500", icon: "♻️" },
    { name: "GLASS", color: "bg-cyan-500", icon: "🗑️" },
    { name: "ORGANIC", color: "bg-green-500", icon: "🌱" }
  ];

  // -------- shared helpers --------

  // Store login info into db.json -> loginLogs[]
  const saveLoginLog = async ({ role, phone, username, status }) => {
    try {
      await api.post("/loginLogs", {
        role,
        phone: phone || null,
        username: username || null,
        time: new Date().toISOString(),
        status // "success" | "failed"
      });
    } catch (error) {
      console.error("Failed to save login log", error);
    }
  };

  // Ensure citizen exists in db.json -> citizens[]
  const ensureCitizenExists = async (phoneNumber) => {
    try {
      // check if this phone already exists
      const { data: citizens } = await api.get("/citizens", {
        params: { phone: phoneNumber }
      });

      if (!citizens || citizens.length === 0) {
        // create new citizen record (json-server will auto-generate id)
        await api.post("/citizens", {
          phone: phoneNumber
        });
      }
    } catch (error) {
      console.error("Failed to ensure citizen exists", error);
      // do not block login just because this failed
    }
  };

  // -------- citizen login --------

  const handleGetOtp = () => {
    if (phone.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }
    setShowOtpInput(true);
  };

  const handleVerifyOtp = async () => {
    if (otp === "123456") {
      // 1) make sure citizen phone is stored in citizens[]
      await ensureCitizenExists(phone);

      // 2) log login success
      await saveLoginLog({
        role: "citizen",
        phone,
        username: null,
        status: "success"
      });

      // 3) auth + navigation
      login({ role: "citizen", phone });
      toast.success("Login successful!");
      navigate("/citizen");
    } else {
      await saveLoginLog({
        role: "citizen",
        phone,
        username: null,
        status: "failed"
      });
      alert("Invalid OTP");
    }
  };

  // -------- staff (admin/supervisor) login --------

  const handleStaffLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const { data: users } = await api.get("/users", {
        params: { username, password, role }
      });

      if (!users || users.length === 0) {
        await saveLoginLog({
          role,
          phone: null,
          username,
          status: "failed"
        });
        toast.error("Invalid username or password");
        return;
      }

      await saveLoginLog({
        role,
        phone: null,
        username,
        status: "success"
      });

      login({ role, username });
      toast.success("Login successful!");
      navigate(`/${role}`);
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  // -------- JSX --------

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans">
      {/* Notice Popup */}
      {showNotice && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
              <img src={LOGO} alt="Ganjam Logo" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-2xl font-bold text-emerald-700 mb-3">
              Official Government Portal
            </h2>
            <p className="text-gray-600 mb-6">
              This is an official portal of GANJAM N.A.C for Solid Waste Management.
              Please ensure you're on the correct website before entering any credentials.
            </p>
            <button
              onClick={() => setShowNotice(false)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              I Understand
            </button>
          </div>
        </div>
      )}

      {/* Left Panel - Info Section */}
      <div className="lg:w-1/2 bg-gradient-to-br from-teal-600 to-emerald-700 text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg overflow-hidden">
              <img src={LOGO} alt="Ganjam Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{t("berhampurNAC")}</h1>
              <p className="text-teal-100 text-sm">{t("municipalServices")}</p>
            </div>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold mb-4 mt-12">
            {t("solidWaste")}
          </h2>

          <p className="text-xl text-teal-50 mb-4">
            {t("joinMission")}
          </p>

          <p className="text-teal-100 mb-12">
            {t("buildingFuture")}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            {wasteCategories.map((category, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all"
              >
                <div className="text-4xl mb-2">{category.icon}</div>
                <div
                  className={`${category.color} text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2`}
                >
                  {category.name}
                </div>
                <p className="text-sm text-teal-50">Recyclable</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="relative h-32 opacity-30">
            <svg viewBox="0 0 1200 200" className="absolute bottom-0 w-full">
              <rect x="50" y="100" width="60" height="100" fill="currentColor" opacity="0.6" />
              <rect x="130" y="80" width="50" height="120" fill="currentColor" opacity="0.7" />
              <rect x="200" y="60" width="70" height="140" fill="currentColor" opacity="0.5" />
              <rect x="290" y="90" width="55" height="110" fill="currentColor" opacity="0.6" />
              <rect x="365" y="50" width="60" height="150" fill="currentColor" opacity="0.8" />
              <rect x="445" y="70" width="50" height="130" fill="currentColor" opacity="0.5" />
              <rect x="515" y="40" width="80" height="160" fill="currentColor" opacity="0.7" />
              <rect x="615" y="85" width="55" height="115" fill="currentColor" opacity="0.6" />
              <rect x="690" y="95" width="60" height="105" fill="currentColor" opacity="0.5" />
              <rect x="770" y="55" width="70" height="145" fill="currentColor" opacity="0.7" />
              <rect x="860" y="75" width="50" height="125" fill="currentColor" opacity="0.6" />
              <rect x="930" y="90" width="65" height="110" fill="currentColor" opacity="0.5" />
              <rect x="1015" y="65" width="55" height="135" fill="currentColor" opacity="0.7" />
              <rect x="1090" y="80" width="60" height="120" fill="currentColor" opacity="0.6" />
            </svg>
          </div>
          <p className="text-xs text-teal-100 mt-4">
            © 2025 GANJAM N.A.C - All Rights Reserved
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="lg:w-1/2 bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex justify-center mb-6">
            <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
              <img src={LOGO} alt="Ganjam Logo" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-emerald-500">
            {/* Language Selector */}
            <div className="flex justify-end mb-4">
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-gray-500" />
                <select
                  value={i18n.language}
                  onChange={(e) => i18n.changeLanguage(e.target.value)}
                  className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी</option>
                  <option value="od">ଓଡ଼ିଆ</option>
                </select>
              </div>
            </div>

            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                <img src={LOGO} alt="Ganjam Logo" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Role Tabs */}
            <div className="flex justify-center gap-8 mb-8 border-b">
              {["citizen", "supervisor", "admin"].map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setShowOtpInput(false);
                    setOtp("");
                    setPhone("");
                    setUsername("");
                    setPassword("");
                  }}
                  className={`pb-3 px-2 font-semibold text-sm uppercase transition-all ${
                    role === r
                      ? "text-emerald-600 border-b-3 border-emerald-600"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {t(`roles.${r}`)}
                </button>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
              {t("loginTitle", { role: t(`roles.${role}`) })}
            </h2>
            <p className="text-gray-500 text-sm text-center mb-6">
              {t("welcomeMessage")}
            </p>

            {/* Forms */}
            {role === "citizen" ? (
              <>
                {!showOtpInput ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("phone")}
                    </label>
                    <div className="relative">
                      <Phone
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) =>
                          /^\d*$/.test(e.target.value) &&
                          e.target.value.length <= 10 &&
                          setPhone(e.target.value)
                        }
                        placeholder={t("phone")}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                      />
                    </div>
                    <button
                      onClick={handleGetOtp}
                      className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      {t("getOtp")}
                    </button>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("enterOtp")}
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder={t("enterOtp")}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    />
                    <p className="text-xs text-center text-gray-500 mt-2">
                      Demo OTP:{" "}
                      <span className="font-bold text-emerald-600">123456</span>
                    </p>
                    <button
                      onClick={handleVerifyOtp}
                      className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-colors"
                    >
                      {t("verifyOtp")}
                    </button>
                    <button
                      onClick={() => {
                        setShowOtpInput(false);
                        setOtp("");
                      }}
                      className="w-full mt-3 text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                    >
                      ← {t("changePhone")}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("username")}
                </label>
                <div className="relative mb-4">
                  <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={t("username")}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  />
                </div>

                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("password")}
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t("password")}
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                  />
                </div>

                <button
                  onClick={handleStaffLogin}
                  className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  {t("login")}
                </button>
              </div>
            )}

            <p className="text-xs text-center text-gray-500 mt-6">
              By logging in, you agree to our{" "}
              <a href="#" className="text-emerald-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-emerald-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Need help?{" "}
              <a
                href="mailto:support@ganjamnac.in"
                className="text-emerald-600 hover:underline font-medium"
              >
                support@ganjamnac.in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

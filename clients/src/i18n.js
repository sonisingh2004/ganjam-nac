import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
  en: {
    translation: {
      "berhampurNAC": "Berhampur N.A.C",
      "solidWaste": "Solid Waste Management",
      "smartCity": "Smart City Waste Platform",
      "platformDescription": "Monitor garbage collection, manage complaints, and ensure cleanliness across all wards digitally.",
      "liveTracking": "🚛 Live Vehicle Tracking",
      "doorCollection": "🗑️ Door-to-Door Collection",
      "photoComplaints": "📸 Photo Complaints",
      "wardReports": "📊 Ward Reports",
      "governmentAuthorized": "Government Authorized • Secure • Real-time Monitoring",
      "officialPortal": "Official Government Portal",
      "officialWarning": "This is an official Solid Waste Management System of Berhampur N.A.C. Unauthorized use or false reporting may lead to action.",
      "iUnderstand": "I Understand",
      "loginAs": "Login as",
      "welcome": "Enter your credentials to continue",
      "english": "EN",
      "hindi": "HI",
      "odia": "OD",
      "roles": {
        "citizen": "Citizen",
        "supervisor": "Supervisor",
        "admin": "Admin"
      },
      "phone": "Phone Number (10 digits)",
      "getOtp": "Get OTP",
      "otpSent": "OTP sent to registered mobile",
      "enterOtp": "Enter OTP",
      "demoOtp": "Demo OTP",
      "verifyOtp": "Verify OTP",
      "loginSuccess": "Login successful",
      "invalidOtp": "Invalid OTP",
      "username": "Username",
      "password": "Password",
      "login": "Login",
      "secureSystem": "Secure • Government Authorized System"
    }
  },
  hi: {
    translation: {
      "berhampurNAC": "बेरहमपुर N.A.C",
      "solidWaste": "ठोस अपशिष्ट प्रबंधन",
      "smartCity": "स्मार्ट सिटी कचरा मंच",
      "platformDescription": "कचरा संग्रह की निगरानी करें, शिकायतों का प्रबंधन करें, और सभी वार्डों में स्वच्छता सुनिश्चित करें।",
      "liveTracking": "🚛 लाइव वाहन ट्रैकिंग",
      "doorCollection": "🗑️ घर-घर संग्रह",
      "photoComplaints": "📸 फोटो शिकायतें",
      "wardReports": "📊 वार्ड रिपोर्ट्स",
      "governmentAuthorized": "सरकारी अधिकृत • सुरक्षित • रीयल-टाइम निगरानी",
      "officialPortal": "आधिकारिक सरकारी पोर्टल",
      "officialWarning": "यह बेरहमपुर N.A.C का आधिकारिक ठोस अपशिष्ट प्रबंधन सिस्टम है। अनधिकृत उपयोग या गलत रिपोर्टिंग पर कार्रवाई हो सकती है।",
      "iUnderstand": "समझ गया",
      "loginAs": "लॉगिन करें",
      "welcome": "जारी रखने के लिए अपनी जानकारी दर्ज करें",
      "english": "EN",
      "hindi": "हिंदी",
      "odia": "OD",
      "roles": {
        "citizen": "नागरिक",
        "supervisor": "निरीक्षक",
        "admin": "प्रशासक"
      },
      "phone": "फ़ोन नंबर (10 अंक)",
      "getOtp": "OTP प्राप्त करें",
      "otpSent": "पंजीकृत मोबाइल पर OTP भेजा गया",
      "enterOtp": "OTP दर्ज करें",
      "demoOtp": "डेमो OTP",
      "verifyOtp": "OTP सत्यापित करें",
      "loginSuccess": "लॉगिन सफल",
      "invalidOtp": "गलत OTP",
      "username": "उपयोगकर्ता नाम",
      "password": "पासवर्ड",
      "login": "लॉगिन",
      "secureSystem": "सुरक्षित • सरकारी अधिकृत सिस्टम"
    }
  },
  od: {
    translation: {
      "berhampurNAC": "ବେରହାମ୍ପୁର୍ N.A.C",
      "solidWaste": "ଘନ କୁଆଡ଼଼ା ପରିଚାଳନା",
      "smartCity": "ସ୍ମାର୍ଟ୍ ସିଟି କୁଆଡ଼଼ା ମଞ୍ଚ",
      "platformDescription": "କୁଆଡ଼଼ା ସଂଗ୍ରହ ନିଗରାଣୀ, ଦରକାର ପରିଚାଳନା କରନ୍ତୁ, ଏବଂ ସମସ୍ତ ଓ୍ବାର୍ଡରେ ପରିଷ୍କାର ନିଶ୍ଚିତ କରନ୍ତୁ।",
      "liveTracking": "🚛 ଲାଇଭ୍ ଗାଡ଼ି ଟ୍ର୍ୟାକିଂ",
      "doorCollection": "🗑️ ଦରଜାରେ ସଂଗ୍ରହ",
      "photoComplaints": "📸 ଫଟୋ ଦରକାର",
      "wardReports": "📊 ଓ୍ବାର୍ଡ୍ ରିପୋର୍ଟ",
      "governmentAuthorized": "ସରକାରୀ ଅନୁମୋଦିତ • ନିରାପଦ • ରିୟାଲ୍-ଟାଇମ୍ ନିଗରାଣୀ",
      "officialPortal": "ଆଧିକାରିକ ସରକାରୀ ପୋର୍ଟାଲ୍",
      "officialWarning": "ଏହା ବେରହାମ୍ପୁର୍ N.A.Cର ଆଧିକାରିକ ଘନ କୁଆଡ଼଼ା ପରିଚାଳନା ସିଷ୍ଟମ୍। ଅନଧିକୃତ ବ୍ୟବହାର କିମ୍ବା ଭୁଲ୍ ରିପୋର୍ଟିଂରେ କାର୍ଯ୍ୟ ହୋଇପାରେ।",
      "iUnderstand": "ମୁଁ ବୁଝିଛି",
      "loginAs": "ଲଗିନ୍ କରନ୍ତୁ",
      "welcome": "ଆଗକୁ ଯିବା ପାଇଁ ଆପଣଙ୍କ ସୂଚନା ପ୍ରବେଶ କରନ୍ତୁ",
      "english": "EN",
      "hindi": "HI",
      "odia": "ଓଡ଼ିଆ",
      "roles": {
        "citizen": "ନାଗରିକ",
        "supervisor": "ପର୍ଯ୍ୟବେକ୍ଷକ",
        "admin": "ପ୍ରଶାସକ"
      },
      "phone": "ଫୋନ୍ ନମ୍ବର (୧୦ ଅଙ୍କ)",
      "getOtp": "OTP ପାଆନ୍ତୁ",
      "otpSent": "ନିବନ୍ଧିତ ମୋବାଇଲରେ OTP ପଠାଗଲା",
      "enterOtp": "OTP ପ୍ରବେଶ କରନ୍ତୁ",
      "demoOtp": "ଡେମୋ OTP",
      "verifyOtp": "OTP ଯାଞ୍ଚ କରନ୍ତୁ",
      "loginSuccess": "ଲଗିନ୍ ସଫଳ",
      "invalidOtp": "ଭୁଲ୍ OTP",
      "username": "ଉପଭୋକ୍ତା ନାମ",
      "password": "ପାସୱାର୍ଡ",
      "login": "ଲଗିନ୍",
      "secureSystem": "ନିରାପଦ • ସରକାରୀ ଅନୁମୋଦିତ ସିଷ୍ଟମ୍"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;

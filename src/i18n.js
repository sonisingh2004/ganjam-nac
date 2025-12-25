import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Official Notice
      officialPortal: "Official Government Portal",
      officialWarning: "This is the official portal of Berhampur NAC. Beware of fake websites and unauthorized apps.",
      iUnderstand: "I Understand",

      // Header
      berhampurNAC: "Berhampur NAC",
      solidWaste: "Solid Waste Management",

      // Left Panel
      smartCity: "Smart City, Clean Future",
      platformDescription: "Digital platform for efficient waste management with real-time tracking and citizen engagement.",
      liveTracking: "Live Vehicle Tracking",
      doorCollection: "Door-to-Door Collection",
      photoComplaints: "Photo Complaints",
      wardReports: "Ward-wise Reports",
      governmentAuthorized: "Government Authorized Platform © 2025",

      // Roles
      "roles.citizen": "Citizen",
      "roles.supervisor": "Supervisor",
      "roles.admin": "Admin",

      // Login Form
      loginAs: "Login as",
      welcome: "Welcome back! Please login to continue",
      phone: "Enter 10-digit mobile number",
      getOtp: "Get OTP",
      username: "Username",
      password: "Password",
      login: "Login",
      secureSystem: "🔒 Secure login system powered by Briskode Technology"
    }
  },
  hi: {
    translation: {
      // Official Notice
      officialPortal: "आधिकारिक सरकारी पोर्टल",
      officialWarning: "यह बेहरामपुर एनएसी का आधिकारिक पोर्टल है। नकली वेबसाइटों और अनधिकृत ऐप्स से सावधान रहें।",
      iUnderstand: "मैं समझता हूं",

      // Header
      berhampurNAC: "बेहरामपुर एनएसी",
      solidWaste: "ठोस अपशिष्ट प्रबंधन",

      // Left Panel
      smartCity: "स्मार्ट सिटी, स्वच्छ भविष्य",
      platformDescription: "वास्तविक समय ट्रैकिंग और नागरिक जुड़ाव के साथ कुशल अपशिष्ट प्रबंधन के लिए डिजिटल प्लेटफॉर्म।",
      liveTracking: "लाइव वाहन ट्रैकिंग",
      doorCollection: "घर-घर संग्रह",
      photoComplaints: "फोटो शिकायतें",
      wardReports: "वार्ड-वार रिपोर्ट",
      governmentAuthorized: "सरकार द्वारा अधिकृत प्लेटफॉर्म © 2025",

      // Roles
      "roles.citizen": "नागरिक",
      "roles.supervisor": "पर्यवेक्षक",
      "roles.admin": "व्यवस्थापक",

      // Login Form
      loginAs: "लॉगिन करें",
      welcome: "वापसी पर स्वागत है! जारी रखने के लिए कृपया लॉगिन करें",
      phone: "10-अंकों का मोबाइल नंबर दर्ज करें",
      getOtp: "ओटीपी प्राप्त करें",
      username: "उपयोगकर्ता नाम",
      password: "पासवर्ड",
      login: "लॉगिन",
      secureSystem: "🔒 ब्रिस्कोड टेक्नोलॉजी द्वारा संचालित सुरक्षित लॉगिन सिस्टम"
    }
  },
  od: {
    translation: {
      // Official Notice
      officialPortal: "ସରକାରୀ ସରକାରୀ ପୋର୍ଟାଲ୍",
      officialWarning: "ଏହା ବେହରାମପୁର NAC ର ସରକାରୀ ପୋର୍ଟାଲ୍ | ନକଲି ୱେବସାଇଟ୍ ଏବଂ ଅନଧିକୃତ ଆପ୍ ଠାରୁ ସାବଧାନ ରୁହନ୍ତୁ |",
      iUnderstand: "ମୁଁ ବୁଝିଲି",

      // Header
      berhampurNAC: "ବେହରାମପୁର NAC",
      solidWaste: "କଠିନ ବର୍ଜ୍ୟବସ୍ତୁ ପରିଚାଳନା",

      // Left Panel
      smartCity: "ସ୍ମାର୍ଟ ସିଟି, ସ୍ୱଚ୍ଛ ଭବିଷ୍ୟତ",
      platformDescription: "ରିଅଲ୍-ଟାଇମ୍ ଟ୍ରାକିଂ ଏବଂ ନାଗରିକ ସମ୍ପୃକ୍ତି ସହିତ ଦକ୍ଷ ବର୍ଜ୍ୟବସ୍ତୁ ପରିଚାଳନା ପାଇଁ ଡିଜିଟାଲ୍ ପ୍ଲାଟଫର୍ମ |",
      liveTracking: "ଲାଇଭ୍ ଯାନ ଟ୍ରାକିଂ",
      doorCollection: "ଘର-ଘର ସଂଗ୍ରହ",
      photoComplaints: "ଫଟୋ ଅଭିଯୋଗ",
      wardReports: "ୱାର୍ଡ-ଅନୁସାରେ ରିପୋର୍ଟ",
      governmentAuthorized: "ସରକାରଙ୍କ ଦ୍ୱାରା ଅନୁମୋଦିତ ପ୍ଲାଟଫର୍ମ © 2025",

      // Roles
      "roles.citizen": "ନାଗରିକ",
      "roles.supervisor": "ପର୍ଯ୍ୟବେକ୍ଷକ",
      "roles.admin": "ପ୍ରଶାସକ",

      // Login Form
      loginAs: "ଲଗ୍ ଇନ୍ କରନ୍ତୁ",
      welcome: "ସ୍ୱାଗତ! ଜାରି ରଖିବାକୁ ଦୟାକରି ଲଗ୍ ଇନ୍ କରନ୍ତୁ",
      phone: "10-ଅଙ୍କ ବିଶିଷ୍ଟ ମୋବାଇଲ୍ ନମ୍ବର ପ୍ରବେଶ କରନ୍ତୁ",
      getOtp: "OTP ପାଆନ୍ତୁ",
      username: "ଉପଯୋଗକର୍ତ୍ତା ନାମ",
      password: "ପାସୱାର୍ଡ",
      login: "ଲଗ୍ ଇନ୍",
      secureSystem: "🔒 ବ୍ରିସ୍କୋଡ୍ ଟେକ୍ନୋଲୋଜି ଦ୍ୱାରା ସୁରକ୍ଷିତ ଲଗ୍ଇନ୍ ସିଷ୍ଟମ୍"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;

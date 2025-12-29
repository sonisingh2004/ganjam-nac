// @ts-nocheck
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
const App = () => {
  return (
    <>
    <ToastContainer position="top-center" />
      <AuthProvider>
    <AppRoutes />
  </AuthProvider>
    </>
  )
}

export default App

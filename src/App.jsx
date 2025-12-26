import { AuthProvider } from "./context/AuthContext"
import AppRoutes from "./routes/AppRoutes"
import { ToastContainer } from "react-toastify";
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

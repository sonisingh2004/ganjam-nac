import AppRoutes from "./routes/AppRoutes"
import "./index.css"
import "./App.css"
import React from "react"
import { ToastContainer } from "react-toastify"
const App = () => {
  return (
    <>
      <AppRoutes/>
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>
  )
}

export default App

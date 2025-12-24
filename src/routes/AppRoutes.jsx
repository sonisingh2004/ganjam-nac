// src/routes/AppRoutes.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<MainLayout />}>
          
          
        </Route>

        
      </Routes>
    </BrowserRouter>
  );
}

// src/routes/AppRoutes.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminLayout from "../layout/AdminLayout";
import Login from "../pages/Login";
import Complaint from "../pages/admin/Complaint";
import AdminDashboard from "../pages/admin/Dashboard";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="complaints" element={<Complaint />} />
          {/* Add more admin routes here */}
        </Route>

        {/* Future: Citizen Routes */}
        {/* <Route path="/citizen" element={<CitizenLayout />}>
          <Route path="dashboard" element={<CitizenDashboard />} />
        </Route> */}

        {/* Future: Supervisor Routes */}
        {/* <Route path="/supervisor" element={<SupervisorLayout />}>
          <Route path="dashboard" element={<SupervisorDashboard />} />
        </Route> */}
        
      </Routes>
    </BrowserRouter>
  );
}

// src/routes/AppRoutes.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AdminLayout from "../layout/AdminLayout";
import Complaint from "../pages/admin/Complaint";
import AdminDashboard from "../pages/admin/Dashboard";
import Login from "../pages/Login";

import MainLayout from "../layout/MainLayout";
import CitizenLayout from "../layout/CitizenLayout";
import CitizenDashboard from "../pages/citizen/CitizenDashboard";
import CitizenPostComplaint from "../pages/citizen/CitizenPostComplaint";
import CitizenTrackVehicle from "../pages/citizen/CitizenTrackVehicle";



export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        
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

        <Route element={<CitizenLayout />}>
          <Route path="/citizen" element={<CitizenDashboard />} />
          <Route
            path="/citizen/complaint"
            element={<CitizenPostComplaint />}
          />
          <Route path="/citizen/track" element={<CitizenTrackVehicle />} />
        </Route>

        {/* Future: Supervisor Routes */}
        {/* <Route path="/supervisor" element={<SupervisorLayout />}>
          <Route path="dashboard" element={<SupervisorDashboard />} />
        </Route> */}
        
      </Routes>
    </BrowserRouter>
  );
}

// src/routes/AppRoutes.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";

/* Admin */
import AdminLayout from "../layout/AdminLayout";
import AdminAttendance from "../pages/admin/Attendance";
import Complaint from "../pages/admin/Complaint";
import AdminDashboard from "../pages/admin/Dashboard";
import FuelManagement from "../pages/admin/FuelManagement";
import TrackVehicle from "../pages/admin/TrackVehicle";
import Vehicle from "../pages/admin/Vehicle";
import Ward from "../pages/admin/Ward";
import WasteCollection from "../pages/admin/WasteCollection";

/* Supervisor */
import CitizenLayout from "../layout/CitizenLayout";
import SupervisorLayout from "../layout/SupervisorLayout";
import CitizenDashboard from "../pages/citizen/CitizenDashboard";
import CitizenPostComplaint from "../pages/citizen/CitizenPostComplaint";
import CitizenTrackVehicle from "../pages/citizen/CitizenTrackVehicle";
import Analytics from "../pages/supervisor/Analytics";
import Attendance from "../pages/supervisor/Attendance";
import Complaints from "../pages/supervisor/Complaints";
import LiveTracking from "../pages/supervisor/LiveTracking";
import QueueFulfillment from "../pages/supervisor/QueueFulfillment";
import SupervisorDashboard from "../pages/supervisor/SupervisorDashboard";
import Vehicles from "../pages/supervisor/Vehicles";
import Wards from "../pages/supervisor/Wards";
import ProtectedRoute from "./ProtectedRoute";



export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="complaints" element={<Complaint />} />
          <Route path="vehicles" element={<Vehicle />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="wards" element={<Ward />} />
          <Route path="track-vehicles" element={<TrackVehicle />} />
          <Route path="waste-collection" element={<WasteCollection />} />
          <Route path="fuel-management" element={<FuelManagement />} />
        </Route>

{/* ================= CITIZEN ROUTES ================= */}
        <Route element={<CitizenLayout />}>
          <Route path="/citizen" element={<CitizenDashboard />} />
          <Route
            path="/citizen/complaint"
            element={<CitizenPostComplaint />}
          />
          <Route path="/citizen/track" element={<CitizenTrackVehicle />} />
        </Route>

        {/* ================= SUPERVISOR ROUTES ================= */}
        <Route path="/supervisor" element={
          <ProtectedRoute allowedRoles={["supervisor"]}>
      <SupervisorLayout />
    </ProtectedRoute>
        }>
          <Route index element={<SupervisorDashboard />} />
          <Route path="dashboard" element={<SupervisorDashboard />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="wards" element={<Wards />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="live-tracking" element={<LiveTracking />} />
          <Route path="queue" element={<QueueFulfillment />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

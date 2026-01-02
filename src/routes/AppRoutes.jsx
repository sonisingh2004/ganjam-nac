// src/routes/AppRoutes.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";

/* ================= ADMIN ================= */
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import Complaint from "../pages/admin/Complaint";
import TrackVehicle from "../pages/admin/TrackVehicle";
import Vehicle from "../pages/admin/Vehicle";
import Ward from "../pages/admin/Ward";

/* ================= CITIZEN ================= */
import CitizenLayout from "../layout/CitizenLayout";
import CitizenDashboard from "../pages/citizen/CitizenDashboard";
import CitizenPostComplaint from "../pages/citizen/CitizenPostComplaint";
import CitizenTrackVehicle from "../pages/citizen/CitizenTrackVehicle";

/* ================= SUPERVISOR ================= */
import SupervisorLayout from "../layout/SupervisorLayout";
import SupervisorDashboard from "../pages/supervisor/SupervisorDashboard";
import Vehicles from "../pages/supervisor/Vehicles";
import Wards from "../pages/supervisor/Wards";
import Complaints from "../pages/supervisor/Complaints";
import Attendance from "../pages/supervisor/Attendance";
import Analytics from "../pages/supervisor/Analytics";
import LiveTracking from "../pages/supervisor/LiveTracking";
import QueueFulfillment from "../pages/supervisor/QueueFulfillment";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= LOGIN ================= */}
        <Route path="/" element={<Login />} />

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="complaints" element={<Complaint />} />
          <Route path="vehicles" element={<Vehicle />} />
          <Route path="wards" element={<Ward />} />
          <Route path="track-vehicles" element={<TrackVehicle />} />
        </Route>

        {/* ================= CITIZEN ROUTES ================= */}
        <Route
          path="/citizen"
          element={
            <ProtectedRoute allowedRoles={["citizen"]}>
              <CitizenLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CitizenDashboard />} />
          <Route path="complaint" element={<CitizenPostComplaint />} />
          <Route path="track" element={<CitizenTrackVehicle />} />
        </Route>

        {/* ================= SUPERVISOR ROUTES ================= */}
        <Route
          path="/supervisor"
          element={
            <ProtectedRoute allowedRoles={["supervisor"]}>
              <SupervisorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SupervisorDashboard />} />
          <Route path="dashboard" element={<SupervisorDashboard />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="wards" element={<Wards />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="live-tracking" element={<LiveTracking />} />
          <Route path="queue-fulfillment" element={<QueueFulfillment />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";

/* Admin */
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import Complaint from "../pages/admin/Complaint";

/* Supervisor */
import SupervisorLayout from "../layout/SupervisorLayout";
import SupervisorDashboard from "../pages/supervisor/SupervisorDashboard";
import Vehicles from "../pages/supervisor/Vehicles";
import Wards from "../pages/supervisor/Wards";
import Complaints from "../pages/supervisor/Complaints";
import Attendance from "../pages/supervisor/Attendance";
import Analytics from "../pages/supervisor/Analytics";
import LiveTracking from "../pages/supervisor/LiveTracking";
import ProtectedRoute from "./ProtectedRoute";
import QueueFulfillment from "../pages/supervisor/QueueFulfillment";

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

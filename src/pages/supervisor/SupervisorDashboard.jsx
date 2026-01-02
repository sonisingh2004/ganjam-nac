// @ts-nocheck
// // src/pages/supervisor/SupervisorDashboard.jsx
// import {
//   LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
//   PieChart, Pie, Cell
// } from "recharts";
// import {
//   Truck, AlertCircle, Wrench, ClipboardList, Activity
// } from "lucide-react";

// /* ---------------- MOCK DATA ---------------- */

// const collectionTrend = [
//   { month: "Jan", value: 120 },
//   { month: "Feb", value: 180 },
//   { month: "Mar", value: 260 },
//   { month: "Apr", value: 210 },
//   { month: "May", value: 300 },
// ];

// const statusData = [
//   { name: "Resolved", value: 45 },
//   { name: "Pending", value: 25 },
//   { name: "In Progress", value: 30 },
// ];

// const COLORS = ["#22c55e", "#facc15", "#ef4444"];

// const activities = [
//   "Vehicle OD-07-GT-1023 completed Ward 5",
//   "Complaint resolved in Ward 12",
//   "New complaint raised in Ward 3",
//   "Vehicle sent for maintenance",
// ];

// /* ---------------- COMPONENT ---------------- */

// const StatCard = ({ title, value, icon, color }) => (
//   <div className={`rounded-2xl p-6 text-white shadow ${color}`}>
//     <div className="flex justify-between items-center mb-3">
//       <div className="bg-white/20 p-2 rounded-lg">{icon}</div>
//       <span className="text-xs bg-white/30 px-2 py-1 rounded-full">
//         Live
//       </span>
//     </div>
//     <p className="text-sm opacity-90">{title}</p>
//     <h2 className="text-3xl font-bold mt-1">{value}</h2>
//   </div>
// );

// const SupervisorDashboard = () => {
//   return (
//     <div className="space-y-8">

//       {/* ================= HEADER ================= */}
//       <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-8 text-white shadow">
//         <h1 className="text-3xl font-bold">Supervisor Dashboard</h1>
//         <p className="text-sm opacity-90 mt-1">
//           Smart Solid Waste Monitoring System
//         </p>
//       </div>

//       {/* ================= KPI CARDS ================= */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard
//           title="Total Vehicles"
//           value="48"
//           icon={<Truck />}
//           color="bg-gradient-to-br from-blue-500 to-blue-700"
//         />
//         <StatCard
//           title="Active Complaints"
//           value="12"
//           icon={<AlertCircle />}
//           color="bg-gradient-to-br from-red-500 to-red-700"
//         />
//         <StatCard
//           title="Defects Reported"
//           value="6"
//           icon={<Wrench />}
//           color="bg-gradient-to-br from-orange-400 to-orange-600"
//         />
//         <StatCard
//           title="Today's Collection"
//           value="92%"
//           icon={<ClipboardList />}
//           color="bg-gradient-to-br from-green-500 to-green-700"
//         />
//       </div>

//       {/* ================= CHART SECTION ================= */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

//         {/* Line Chart */}
//         <div className="bg-white rounded-2xl shadow p-6 lg:col-span-2">
//           <h3 className="font-semibold mb-4">
//             Garbage Collection Trend
//           </h3>
//           <ResponsiveContainer width="100%" height={260}>
//             <LineChart data={collectionTrend}>
//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />
//               <Line
//                 type="monotone"
//                 dataKey="value"
//                 stroke="#22c55e"
//                 strokeWidth={3}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Pie Chart */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h3 className="font-semibold mb-4">
//             Complaint Status
//           </h3>
//           <ResponsiveContainer width="100%" height={260}>
//             <PieChart>
//               <Pie
//                 data={statusData}
//                 dataKey="value"
//                 innerRadius={50}
//                 outerRadius={90}
//                 paddingAngle={5}
//               >
//                 {statusData.map((_, index) => (
//                   <Cell key={index} fill={COLORS[index]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//       </div>

//       {/* ================= ACTIVITY LOG ================= */}
//       <div className="bg-white rounded-2xl shadow p-6">
//         <div className="flex items-center gap-2 mb-4">
//           <Activity className="text-green-600" />
//           <h3 className="font-semibold">Recent Activities</h3>
//         </div>

//         <ul className="space-y-3 text-sm text-gray-600">
//           {activities.map((a, i) => (
//             <li
//               key={i}
//               className="border-l-4 border-green-500 pl-3"
//             >
//               {a}
//             </li>
//           ))}
//         </ul>
//       </div>

//     </div>
//   );
// };

// export default SupervisorDashboard;

// import {
//   Wrench,
//   AlertCircle,
//   Truck,
//   ClipboardList,
//   Activity,
//   CheckCircle,
// } from "lucide-react";

// /* ================= STAT CARD ================= */
// const StatCard = ({ title, value, color, icon }) => (
//   <div className={`rounded-2xl p-6 text-white shadow-lg ${color}`}>
//     <div className="flex items-center justify-between mb-4">
//       <div className="bg-white/20 p-2 rounded-lg">{icon}</div>
//       <span className="text-xs bg-white/30 px-3 py-1 rounded-full">
//         Today
//       </span>
//     </div>
//     <p className="text-sm opacity-90">{title}</p>
//     <h2 className="text-4xl font-bold mt-2">{value}</h2>
//     <div className="h-1 bg-white/30 rounded mt-4">
//       <div className="h-1 w-1/2 bg-white rounded"></div>
//     </div>
//   </div>
// );

// /* ================= DASHBOARD ================= */
// const SupervisorDashboard = () => {
//   return (
//     <div className="space-y-10">

//       {/* HEADER */}
//       <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-8 text-white shadow-xl">
//         <h1 className="text-3xl font-bold">Supervisor Dashboard</h1>
//         <p className="opacity-90 text-sm">
//           Solid Waste Management System – NAC
//         </p>
//       </div>

//       {/* QUICK ACTIONS */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <button className="bg-white shadow rounded-xl p-4 flex gap-3 items-center hover:bg-green-50">
//           <Wrench /> Report Machinery Defect
//         </button>
//         <button className="bg-white shadow rounded-xl p-4 flex gap-3 items-center hover:bg-orange-50">
//           <ClipboardList /> Add Queue Record
//         </button>
//         <button className="bg-white shadow rounded-xl p-4 flex gap-3 items-center hover:bg-blue-50">
//           <Truck /> Track Vehicles
//         </button>
//       </div>

//       {/* STATISTICS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard
//           title="Total Defects"
//           value="0"
//           color="bg-gradient-to-br from-blue-500 to-blue-700"
//           icon={<Wrench />}
//         />
//         <StatCard
//           title="Pending Issues"
//           value="0"
//           color="bg-gradient-to-br from-orange-400 to-orange-600"
//           icon={<AlertCircle />}
//         />
//         <StatCard
//           title="In Progress"
//           value="0"
//           color="bg-gradient-to-br from-purple-500 to-purple-700"
//           icon={<Activity />}
//         />
//         <StatCard
//           title="Resolved"
//           value="0"
//           color="bg-gradient-to-br from-green-500 to-green-700"
//           icon={<CheckCircle />}
//         />
//       </div>

//       {/* QUEUE FULFILLMENT OVERVIEW */}
//       <div className="bg-gradient-to-r from-yellow-500 to-green-500 rounded-2xl p-6 text-white shadow-lg">
//         <h3 className="text-xl font-semibold mb-2">
//           Queue Fulfillment Tracker
//         </h3>
//         <p className="text-sm opacity-90 mb-4">
//           Cube fulfillment progress (MCC / MRF)
//         </p>

//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//           <div className="bg-white/20 rounded-xl p-4">
//             <p className="text-sm">Total Records</p>
//             <h2 className="text-2xl font-bold">0</h2>
//           </div>
//           <div className="bg-white/20 rounded-xl p-4">
//             <p className="text-sm">Resolved</p>
//             <h2 className="text-2xl font-bold">0</h2>
//           </div>
//           <div className="bg-white/20 rounded-xl p-4">
//             <p className="text-sm">MCC Left</p>
//             <h2 className="text-2xl font-bold">14</h2>
//           </div>
//           <div className="bg-white/20 rounded-xl p-4">
//             <p className="text-sm">MRF Left</p>
//             <h2 className="text-2xl font-bold">6</h2>
//           </div>
//         </div>
//       </div>

//       {/* LIVE VEHICLE STATUS */}
//       <div className="bg-white rounded-2xl shadow p-6">
//         <h3 className="font-semibold mb-4 flex items-center gap-2 text-green-700">
//           <Truck size={18} /> Live Vehicle Status
//         </h3>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {["OD07AT8333", "MP04TC2391", "OD07AW5653"].map((v) => (
//             <div
//               key={v}
//               className="border rounded-xl p-4 flex justify-between items-center"
//             >
//               <div>
//                 <p className="font-semibold">{v}</p>
//                 <p className="text-sm text-gray-500">Speed: 0 km/h</p>
//               </div>
//               <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
//                 ACTIVE
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* RECENT ACTIVITY */}
//       <div className="bg-white rounded-2xl shadow p-8 text-center">
//         <AlertCircle size={46} className="mx-auto text-gray-300" />
//         <h3 className="text-xl font-semibold mt-4">
//           No Recent Activity Found
//         </h3>
//         <p className="text-gray-500 mt-2">
//           New reports and updates will appear here.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SupervisorDashboard;

import {
  Activity,
  AlertCircle,
  Bell,
  ClipboardList,
  Truck,
  Wrench,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import api from "../../api/api";

/* ================= FALLBACK DATA ================= */

const fallbackCollectionTrend = [
  { day: "Mon", value: 72 },
  { day: "Tue", value: 78 },
  { day: "Wed", value: 85 },
  { day: "Thu", value: 81 },
  { day: "Fri", value: 90 },
];

const fallbackWards = [
  { name: "Ward 1", percent: 92 },
  { name: "Ward 3", percent: 84 },
  { name: "Ward 5", percent: 76 },
  { name: "Ward 12", percent: 88 },
];

const fallbackVehicles = [
  { no: "OD-07-GT-1023", status: "Active" },
];

/* ================= STAT CARD ================= */

const StatCard = ({ title, value, icon, color }) => (
  <div className={`rounded-3xl p-6 text-white shadow-sm ${color}`}>
    <div className="flex justify-between items-center mb-3">
      <div className="bg-white/20 p-2 rounded-lg">{icon}</div>
      <span className="text-xs bg-white/30 px-2 py-1 rounded-full">
        Today
      </span>
    </div>
    <p className="text-sm opacity-90">{title}</p>
    <h2 className="text-3xl font-bold mt-1">{value}</h2>
  </div>
);

/* ================= DASHBOARD ================= */

const SupervisorDashboard = () => {
  const navigate = useNavigate();

  // ✅ State
  const [collectionTrend, setCollectionTrend] = useState(
    fallbackCollectionTrend
  );
  const [wards, setWards] = useState(fallbackWards);
  const [vehicles, setVehicles] = useState(fallbackVehicles);

  /* ================= API LOAD ================= */
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // Vehicles from db.json
        const vehicleRes = await api.get("/vehicles");

        if (vehicleRes.data?.length) {
          setVehicles(
            vehicleRes.data.map((v) => ({
              no: v.number,
              status: v.status,
            }))
          );
        }

        // OPTIONAL (if added later in db.json)
        const trendRes = await api.get("/collectionTrend").catch(() => null);
        if (trendRes?.data?.length) setCollectionTrend(trendRes.data);

        const wardRes = await api.get("/wards").catch(() => null);
        if (wardRes?.data?.length) setWards(wardRes.data);
      } catch {
        // silent fallback → UI unchanged
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="space-y-8 bg-emerald-50 p-6 rounded-3xl">

      {/* ================= ALERT BAR ================= */}
      <div className="bg-emerald-100 border border-emerald-300 text-emerald-800 rounded-xl px-6 py-4 flex items-center gap-3">
        <Bell size={20} />
        <p className="text-sm">
          2 vehicles scheduled for maintenance today.
        </p>
      </div>

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-700 rounded-3xl p-8 text-white shadow">
        <h1 className="text-3xl font-bold">Supervisor Dashboard</h1>
        <p className="text-sm opacity-90 mt-1">
          Smart Solid Waste Monitoring System
        </p>
        <p className="text-xs opacity-80 mt-1">
          Data Period: Today ({new Date().toLocaleDateString()})
        </p>
      </div>

      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Vehicles"
          value={vehicles.length}
          icon={<Truck />}
          color="bg-gradient-to-br from-emerald-500 to-green-600"
        />
        <StatCard
          title="Active Complaints"
          value="12"
          icon={<AlertCircle />}
          color="bg-gradient-to-br from-orange-500 to-orange-600"
        />
        <StatCard
          title="Defects Reported"
          value="6"
          icon={<Wrench />}
          color="bg-gradient-to-br from-yellow-500 to-orange-500"
        />
        <StatCard
          title="Collection Rate"
          value="92%"
          icon={<ClipboardList />}
          color="bg-gradient-to-br from-green-500 to-emerald-600"
        />
      </div>

      {/* ================= CHART + VEHICLE STATUS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* COLLECTION TREND */}
        <div className="bg-white rounded-3xl shadow-sm p-6 lg:col-span-2">
          <h3 className="font-semibold mb-4">
            Weekly Collection Trend (% Coverage)
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={collectionTrend}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#16a34a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* VEHICLE STATUS */}
        <div className="bg-white rounded-3xl shadow-sm p-6">
          <h3 className="font-semibold mb-4">Vehicle Status</h3>

          <ul className="space-y-3 text-sm h-75 overflow-y-scroll">
            {vehicles.map((v) => (
              <li key={v.no} className="flex justify-between items-center">
                <span>{v.no}</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs text-white ${
                    v.status === "Active"
                      ? "bg-green-600"
                      : v.status === "Inactive"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {v.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ================= WARD PERFORMANCE ================= */}
      <div className="bg-white rounded-3xl shadow-sm p-6">
        <h3 className="font-semibold mb-4">
          Ward-wise Collection Performance
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wards.map((w) => (
            <div key={w.name}>
              <div className="flex justify-between text-sm mb-1">
                <span>{w.name}</span>
                <span className="font-medium">{w.percent}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-green-600 rounded"
                  style={{ width: `${w.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={() => navigate("/supervisor/defects")}
          className="bg-gradient-to-r from-emerald-600 to-green-700 text-white rounded-xl px-6 py-4 flex items-center gap-3 shadow hover:opacity-90"
        >
          <Wrench /> Report Defect
        </button>

        <button
          onClick={() => navigate("/supervisor/complaints")}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl px-6 py-4 flex items-center gap-3 shadow hover:opacity-90"
        >
          <AlertCircle /> View Complaints
        </button>

        <button
          onClick={() => navigate("/supervisor/live-tracking")}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl px-6 py-4 flex items-center gap-3 shadow hover:opacity-90"
        >
          <Activity /> Live Tracking
        </button>
      </div>

      {/* ================= SYSTEM HEALTH ================= */}
      <div className="bg-gradient-to-r from-emerald-700 to-green-800 text-white rounded-3xl shadow-sm p-6">
        <h3 className="font-semibold mb-2">System Health</h3>
        <p className="text-sm opacity-90 mb-4">
          Overall platform performance
        </p>

        <div className="flex flex-wrap gap-4 text-sm">
          <span className="bg-white/20 px-4 py-2 rounded-full">
            ✔ API Services Online
          </span>
          <span className="bg-white/20 px-4 py-2 rounded-full">
            ✔ GPS Tracking Active
          </span>
          <span className="bg-white/20 px-4 py-2 rounded-full">
            ⚠ 1 Maintenance Alert
          </span>
        </div>

        <p className="text-xs opacity-80 mt-3">
          System status is auto-monitored. Manual intervention is restricted.
        </p>
      </div>

    </div>
  );
};

export default SupervisorDashboard;

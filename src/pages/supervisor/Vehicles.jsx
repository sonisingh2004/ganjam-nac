// @ts-nocheck
import { MapPin, Search, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/api";

/* ================= VEHICLES PAGE ================= */

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  /* --------- LOAD FROM API (NO UI CHANGE) --------- */
  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const res = await api.get("/vehicles");

        if (res.data?.length) {
          setVehicles(
            res.data.map((v) => ({
              id: v.id,
              number: v.number,
              type: v.type || "Tipper",
              ward: v.ward || "N/A",
              route: v.route || "Zone A",
              driver: v.driver || "N/A",
              status: v.status || "Inactive",
              gps: v.status === "Active" ? "Online" : "Offline",
              trip:
                v.status === "Active"
                  ? "On Route"
                  : v.status === "Maintenance"
                  ? "Workshop"
                  : "Idle",
              updatedAt: "Today",
            }))
          );
        }
      } catch {
        // silent fail – UI stays same
      }
    };

    loadVehicles();
  }, []);

  /* --------- SEARCH FILTER --------- */
  const filteredVehicles = vehicles.filter(
    (v) =>
      v.number.toLowerCase().includes(search.toLowerCase()) ||
      v.ward.toLowerCase().includes(search.toLowerCase()) ||
      v.route.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-2xl p-6 shadow">
        <div className="flex items-center gap-3">
          <Truck size={28} />
          <div>
            <h2 className="text-2xl font-bold">Vehicle Management</h2>
            <p className="text-sm opacity-90">
              Fleet monitoring & operational status
            </p>
          </div>
        </div>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <SummaryCard
          title="Total Vehicles"
          value={vehicles.length}
          color="bg-blue-600"
        />
        <SummaryCard
          title="Active"
          value={vehicles.filter(v => v.status === "Active").length}
          color="bg-green-600"
        />
        <SummaryCard
          title="Maintenance"
          value={vehicles.filter(v => v.status === "Maintenance").length}
          color="bg-yellow-500"
        />
      </div>

      {/* ================= SEARCH BAR ================= */}
      <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
        <Search className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by vehicle, ward or route..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* ================= VEHICLE TABLE ================= */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Vehicle No</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Ward</th>
              <th className="px-4 py-3 text-left">Route</th>
              <th className="px-4 py-3 text-left">Driver</th>
              <th className="px-4 py-3 text-left">GPS</th>
              <th className="px-4 py-3 text-left">Trip</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Last Update</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredVehicles.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-8 text-gray-500">
                  No vehicles found
                </td>
              </tr>
            ) : (
              filteredVehicles.map((v) => (
                <tr
                  key={v.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">{v.number}</td>
                  <td className="px-4 py-3">{v.type}</td>
                  <td className="px-4 py-3">{v.ward}</td>
                  <td className="px-4 py-3">{v.route}</td>
                  <td className="px-4 py-3">{v.driver}</td>
                  <td className="px-4 py-3">
                    <Badge
                      value={v.gps}
                      color={
                        v.gps === "Online"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      value={v.trip}
                      color="bg-blue-100 text-blue-700"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={v.status} />
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {v.updatedAt}
                  </td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1 text-green-600 hover:underline text-xs">
                      <MapPin size={14} />
                      View Status
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ================= REUSABLE COMPONENTS ================= */

const SummaryCard = ({ title, value, color }) => (
  <div className={`rounded-xl p-5 text-white shadow ${color}`}>
    <p className="text-sm opacity-90">{title}</p>
    <h3 className="text-3xl font-bold mt-1">{value}</h3>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-red-100 text-red-700",
    Maintenance: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const Badge = ({ value, color }) => (
  <span className={`px-3 py-1 rounded-full text-xs font-medium ${color}`}>
    {value}
  </span>
);

export default Vehicles;

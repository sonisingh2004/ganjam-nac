import { useEffect, useState } from "react";
import { Truck, Search, MapPin } from "lucide-react";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setVehicles([
        {
          id: 1,
          number: "OD-07-GT-1023",
          ward: "Ward 5",
          driver: "Ramesh",
          status: "Active",
        },
        {
          id: 2,
          number: "OD-07-GT-1048",
          ward: "Ward 12",
          driver: "Suresh",
          status: "Inactive",
        },
        {
          id: 3,
          number: "OD-07-GT-1099",
          ward: "Ward 3",
          driver: "Mahesh",
          status: "Maintenance",
        },
      ]);
    }, 500);
  }, []);

  const filteredVehicles = vehicles.filter(
    (v) =>
      v.number.toLowerCase().includes(search.toLowerCase()) ||
      v.ward.toLowerCase().includes(search.toLowerCase())
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
              Monitor and manage waste collection vehicles
            </p>
          </div>
        </div>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <SummaryCard title="Total Vehicles" value={vehicles.length} color="bg-blue-500" />
        <SummaryCard title="Active" value={vehicles.filter(v => v.status === "Active").length} color="bg-green-500" />
        <SummaryCard title="Maintenance" value={vehicles.filter(v => v.status === "Maintenance").length} color="bg-yellow-500" />
      </div>

      {/* ================= SEARCH BAR ================= */}
      <div className="bg-white rounded-xl shadow p-4 flex items-center gap-3">
        <Search className="text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by vehicle number or ward..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-sm"
        />
      </div>

      {/* ================= VEHICLE TABLE ================= */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Vehicle No</th>
              <th className="px-4 py-3 text-left">Ward</th>
              <th className="px-4 py-3 text-left">Driver</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredVehicles.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No vehicles found
                </td>
              </tr>
            ) : (
              filteredVehicles.map((v) => (
                <tr
                  key={v.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium">
                    {v.number}
                  </td>
                  <td className="px-4 py-3">{v.ward}</td>
                  <td className="px-4 py-3">{v.driver}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={v.status} />
                  </td>
                  <td className="px-4 py-3">
                    <button className="flex items-center gap-1 text-green-600 hover:underline text-xs">
                      <MapPin size={14} />
                      Track
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

/* ================= SMALL COMPONENTS ================= */

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

export default Vehicles;

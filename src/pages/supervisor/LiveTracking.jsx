import { useState } from "react";
import { MapPin, Truck, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const vehicles = [
  {
    id: 1,
    number: "OD07AT8333",
    speed: "0 km/h",
    fuel: "0%",
    odometer: "0 km",
    signal: "STRONG",
    status: "ACTIVE",
  },
  {
    id: 2,
    number: "MP04TC2391",
    speed: "12 km/h",
    fuel: "32%",
    odometer: "102 km",
    signal: "GOOD",
    status: "ACTIVE",
  },
  {
    id: 3,
    number: "OD07AW5653",
    speed: "0 km/h",
    fuel: "18%",
    odometer: "66 km",
    signal: "WEAK",
    status: "INACTIVE",
  },
];

const LiveTracking = () => {
  const [selected, setSelected] = useState(vehicles[0]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-3xl p-6 text-white shadow-xl flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <MapPin size={26} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Fleet & Friend Tracker</h1>
            <p className="text-sm opacity-90">
              Real-time tracking · {vehicles.length} vehicles online
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* VEHICLE LIST */}
        <div className="bg-white rounded-2xl shadow p-4 space-y-4 max-h-[520px] overflow-y-auto">
          <h3 className="font-semibold text-green-700 flex items-center gap-2">
            <Truck size={18} /> Fleet Vehicles
          </h3>

          {vehicles.map((v) => (
            <div
              key={v.id}
              onClick={() => setSelected(v)}
              className={`cursor-pointer border rounded-xl p-4 transition ${
                selected.id === v.id
                  ? "border-green-500 bg-green-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{v.number}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    v.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {v.status}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>Speed: {v.speed}</p>
                <p>Fuel: {v.fuel}</p>
                <p>Odometer: {v.odometer}</p>
                <p>
                  Signal:{" "}
                  <span className="font-medium">{v.signal}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* MAP VIEW */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-700">
              Live Location – {selected.number}
            </h3>
          </div>

          {/* MAP PLACEHOLDER */}
          <div className="h-[420px] flex items-center justify-center bg-gray-100 text-gray-400">
            <div className="text-center">
              <MapPin size={48} className="mx-auto mb-2" />
              <p className="font-medium">Map Integration Pending</p>
              <p className="text-sm">
                Google Maps / Mapbox can be integrated here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTracking;

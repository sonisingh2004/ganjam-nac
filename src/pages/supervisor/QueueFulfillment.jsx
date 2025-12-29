import { useState } from "react";
import {
  Plus,
  X,
  Package,
  AlertTriangle,
  Search,
} from "lucide-react";
import { toast } from "react-toastify";

/* ================= STAT CARD ================= */
const StatCard = ({ title, value, color, tag }) => (
  <div className={`rounded-2xl p-6 text-white shadow-lg ${color}`}>
    <div className="flex justify-between mb-3">
      <span className="text-sm opacity-90">{title}</span>
      <span className="text-xs bg-white/30 px-3 py-1 rounded-full">
        {tag}
      </span>
    </div>
    <h2 className="text-4xl font-bold">{value}</h2>
    <div className="h-1 bg-white/30 rounded mt-4">
      <div className="h-1 w-1/3 bg-white rounded"></div>
    </div>
  </div>
);

/* ================= MAIN COMPONENT ================= */
const QueueFulfillment = () => {
  const [open, setOpen] = useState(false);

  // supervisor role simulation
  const role = "Supervisor";

  // dummy records (audit trail)
  const records = [
    {
      id: "QF-2025-001",
      category: "MCC",
      cube: "Cube-04",
      status: "Pending",
      date: "24 Jul 2025",
    },
  ];

  const handleSubmit = () => {
    toast.success("Queue fulfillment record submitted successfully");
    setOpen(false);
  };

  return (
    <div className="space-y-8 relative">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-orange-500 to-green-600 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Package size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              Queue Fulfillment Tracker
            </h1>
            <p className="text-sm opacity-90">
              MCC / MRF cube-wise fulfillment monitoring
            </p>
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Records" value="1" tag="Total" color="bg-blue-600" />
        <StatCard title="Resolved" value="0" tag="Done" color="bg-green-600" />
        <StatCard title="MCC Cubes Left" value="14" tag="MCC" color="bg-orange-600" />
        <StatCard title="MRF Cubes Left" value="6" tag="MRF" color="bg-purple-600" />
      </div>

      {/* ================= SEARCH & FILTER ================= */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2 w-full">
            <Search className="text-orange-500" />
            <input
              placeholder="Search by record ID, category or cube..."
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <select className="border rounded-xl px-4 py-3">
            <option>All Status</option>
            <option>Pending</option>
            <option>Verified</option>
            <option>Fulfilled</option>
          </select>
        </div>
      </div>

      {/* ================= RECORD TABLE ================= */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Record ID</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Cube No</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="px-4 py-3 font-medium">{r.id}</td>
                <td className="px-4 py-3">{r.category}</td>
                <td className="px-4 py-3">{r.cube}</td>
                <td className="px-4 py-3">
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                    {r.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {r.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= EMPTY STATE (IF NO DATA) ================= */}
      {records.length === 0 && (
        <div className="bg-white rounded-2xl shadow p-14 text-center">
          <AlertTriangle size={60} className="mx-auto text-gray-300" />
          <h3 className="text-xl font-semibold mt-4">
            No Queue Records Found
          </h3>
          <p className="text-gray-500 mt-2">
            Click "Add Record" to submit a new cube fulfillment
          </p>
        </div>
      )}

      {/* ================= ADD RECORD BUTTON ================= */}
      {role === "Supervisor" && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
        >
          <Plus /> Add Record
        </button>
      )}

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">

            <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4 text-white flex justify-between">
              <h3 className="font-semibold text-lg">
                Cube Fulfillment Record
              </h3>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <Input label="ULB / NAC Name" value="Gopalpur NAC" disabled />
              <Input label="Supervisor Name" value="Ramesh Kumar" disabled />
              <Input label="Contact Number" value="9876543210" disabled />

              <div className="grid grid-cols-2 gap-4">
                <select className="border rounded-xl px-4 py-3">
                  <option>MCC</option>
                  <option>MRF</option>
                </select>
                <select className="border rounded-xl px-4 py-3">
                  <option>Select Cube Number</option>
                  <option>Cube-01</option>
                  <option>Cube-02</option>
                  <option>Cube-03</option>
                </select>
              </div>

              <select className="border rounded-xl px-4 py-3 w-full">
                <option>Pending</option>
                <option>Verified</option>
                <option>Fulfilled</option>
              </select>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm">
                ✔ Date & time auto-recorded <br />
                ✔ Geo-tagging & image capture (production)
              </div>
            </div>

            <div className="flex justify-end gap-4 p-4 border-t">
              <button
                onClick={() => setOpen(false)}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-5 py-2 bg-orange-600 text-white rounded-lg"
              >
                Submit Record
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

/* ================= INPUT ================= */
const Input = ({ label, value, disabled }) => (
  <input
    placeholder={label}
    value={value}
    disabled={disabled}
    className="w-full border rounded-xl px-4 py-3 disabled:bg-gray-100"
  />
);

export default QueueFulfillment;

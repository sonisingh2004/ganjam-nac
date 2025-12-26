import { useState } from "react";
import {
  Plus,
  X,
  Package,
  CheckCircle,
  AlertTriangle,
  Search,
} from "lucide-react";
import { toast } from "react-toastify";

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

const QueueFulfillment = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    toast.success("Queue fulfillment record added");
    setOpen(false);
  };

  return (
    <div className="space-y-8 relative">

      {/* HEADER */}
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
              Track cumulative cube fulfillment
            </p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Records"
          value="0"
          tag="Total"
          color="bg-gradient-to-br from-blue-500 to-blue-700"
        />
        <StatCard
          title="Resolved"
          value="0"
          tag="Done"
          color="bg-gradient-to-br from-green-500 to-green-700"
        />
        <StatCard
          title="Unfilled Cubes"
          value="14"
          tag="MCC Left"
          color="bg-gradient-to-br from-orange-500 to-orange-700"
        />
        <StatCard
          title="Unfilled Cubes"
          value="6"
          tag="MRF Left"
          color="bg-gradient-to-br from-purple-500 to-purple-700"
        />
      </div>

      {/* SEARCH & FILTER */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex items-center gap-2 w-full">
            <Search className="text-orange-500" />
            <input
              placeholder="Search by name, ID or category..."
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <select className="border rounded-xl px-4 py-3">
            <option>All Status</option>
            <option>Done</option>
            <option>Pending</option>
          </select>
        </div>

        <div className="flex gap-3 mt-4">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg">
            All Categories
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded-lg">
            MCC
          </button>
          <button className="px-4 py-2 bg-gray-100 rounded-lg">
            MRF
          </button>
        </div>
      </div>

      {/* EMPTY STATE */}
      <div className="bg-white rounded-2xl shadow p-14 text-center">
        <AlertTriangle size={60} className="mx-auto text-gray-300" />
        <h3 className="text-xl font-semibold mt-4">
          No Queue Records Found
        </h3>
        <p className="text-gray-500 mt-2">
          Click "Add Record" to submit a new cube fulfillment
        </p>
      </div>

      {/* ADD BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
      >
        <Plus /> Add Record
      </button>

      {/* MODAL */}
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

            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <Input label="Wealth Center" value="Gopalpur NAC" disabled />
              <Input label="Supervisor Name" />
              <Input label="Contact Number" />

              <div className="grid grid-cols-2 gap-4">
                <select className="border rounded-xl px-4 py-3">
                  <option>MCC</option>
                  <option>MRF</option>
                </select>
                <select className="border rounded-xl px-4 py-3">
                  <option>Select cube number</option>
                </select>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm">
                ✔ Date & Time auto recorded <br />
                ✔ Image geo-tagged (production)
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

const Input = ({ label, value, disabled }) => (
  <input
    placeholder={label}
    value={value}
    disabled={disabled}
    className="w-full border rounded-xl px-4 py-3 disabled:bg-gray-100"
  />
);

export default QueueFulfillment;

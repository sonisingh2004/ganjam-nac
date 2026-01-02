import { useEffect, useState } from "react";
import {
  Plus,
  X,
  Package,
  Search,
  CheckCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../../api/axiosInstance";

/* ================= STAT CARD ================= */
const StatCard = ({ title, value, icon, color }) => (
  <div className={`rounded-2xl p-6 text-white shadow-lg ${color}`}>
    <div className="flex justify-between items-center">
      <div>
        <p className="text-sm opacity-90">{title}</p>
        <h2 className="text-3xl font-bold mt-1">{value}</h2>
      </div>
      <div className="bg-white/20 p-3 rounded-xl">{icon}</div>
    </div>
  </div>
);

/* ================= MAIN COMPONENT ================= */
const QueueFulfillment = () => {
  const [open, setOpen] = useState(false);
  const [records, setRecords] = useState([]);
  const role = "Supervisor";

  /* ================= LOAD RECORDS ================= */
  useEffect(() => {
    const loadRecords = async () => {
      try {
        const res = await api.get("/queueFulfillment");
        setRecords(res.data || []);
      } catch {
        toast.error("Failed to load fulfillment records");
      }
    };

    loadRecords();
  }, []);

  /* ================= STATUS STYLE ================= */
  const statusStyle = {
    Pending: "bg-yellow-100 text-yellow-700",
    Verified: "bg-blue-100 text-blue-700",
    Fulfilled: "bg-green-100 text-green-700",
  };

  /* ================= STATS ================= */
  const total = records.length;
  const pending = records.filter(r => r.status === "Pending").length;
  const verified = records.filter(r => r.status === "Verified").length;
  const fulfilled = records.filter(r => r.status === "Fulfilled").length;

  /* ================= ADD RECORD ================= */
  const handleSubmit = async () => {
    const newRecord = {
      id: `QF-${new Date().getFullYear()}-${String(records.length + 1).padStart(3, "0")}`,
      category: "MCC",
      cube: "Cube-01",
      status: "Pending",
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      supervisor: "Ramesh Kumar",
    };

    try {
      await api.post("/queueFulfillment", newRecord);
      setRecords((prev) => [...prev, newRecord]);
      toast.success("Queue fulfillment record submitted successfully");
      setOpen(false);
    } catch {
      toast.error("Failed to submit record");
    }
  };

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-orange-500 to-green-600 rounded-3xl p-8 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Package size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">
              MCC / MRF Queue Fulfillment
            </h1>
            <p className="text-sm opacity-90">
              Command & Control – Cube-wise operational tracking
            </p>
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Records" value={total} icon={<Package />} color="bg-blue-600" />
        <StatCard title="Pending Verification" value={pending} icon={<Clock />} color="bg-orange-600" />
        <StatCard title="Verified" value={verified} icon={<ShieldCheck />} color="bg-purple-600" />
        <StatCard title="Fulfilled" value={fulfilled} icon={<CheckCircle />} color="bg-green-600" />
      </div>

      {/* ================= SEARCH ================= */}
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex items-center gap-2 w-full">
            <Search className="text-orange-500" />
            <input
              placeholder="Search by Record ID / Cube / Category"
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

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-5 py-4 text-left">Record ID</th>
              <th className="px-5 py-4 text-left">Category</th>
              <th className="px-5 py-4 text-left">Cube</th>
              <th className="px-5 py-4 text-left">Supervisor</th>
              <th className="px-5 py-4 text-left">Status</th>
              <th className="px-5 py-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {records.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50">
                <td className="px-5 py-4 font-medium">{r.id}</td>
                <td className="px-5 py-4">{r.category}</td>
                <td className="px-5 py-4">{r.cube}</td>
                <td className="px-5 py-4">{r.supervisor}</td>
                <td className="px-5 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusStyle[r.status]}`}>
                    {r.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-gray-500 text-xs">
                  {r.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= COMPLIANCE NOTE ================= */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm">
        ✔ All records are time-stamped<br />
        ✔ Status lifecycle follows audit compliance<br />
        ✔ Geo-tagging & image capture enabled in production environment
      </div>

      {/* ================= ADD RECORD BUTTON ================= */}
      {role === "Supervisor" && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2"
        >
          <Plus /> Add Fulfillment Record
        </button>
      )}

      {/* ================= MODAL ================= */}
      {open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden">

            <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4 text-white flex justify-between">
              <h3 className="font-semibold text-lg">
                MCC / MRF Fulfillment Entry
              </h3>
              <button onClick={() => setOpen(false)}>
                <X />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <Input value="Gopalpur NAC" disabled />
              <Input value="Ramesh Kumar (Supervisor)" disabled />
              <Input value="Auto-captured Date & Time" disabled />

              <div className="grid grid-cols-2 gap-4">
                <select className="border rounded-xl px-4 py-3">
                  <option>MCC</option>
                  <option>MRF</option>
                </select>
                <select className="border rounded-xl px-4 py-3">
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
const Input = ({ value, disabled }) => (
  <input
    value={value}
    disabled={disabled}
    className="w-full border rounded-xl px-4 py-3 disabled:bg-gray-100"
  />
);

export default QueueFulfillment;

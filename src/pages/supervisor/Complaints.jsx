import { useState } from "react";

/* ================= MAIN COMPONENT ================= */

const Complaints = () => {
  const [filter, setFilter] = useState("All");
  const [preview, setPreview] = useState(null);

  const [complaints, setComplaints] = useState([
    {
      id: "CMP-001",
      ward: "Ward 5",
      type: "Garbage not collected",
      image: "https://via.placeholder.com/300",
      vehicle: "OD-07-GT-1023",
      driver: "Ramesh Kumar",
      status: "Pending",
      date: "2025-07-24",
      updatedAt: "10:10 AM",
    },
    {
      id: "CMP-002",
      ward: "Ward 12",
      type: "Overflowing dustbin",
      image: "https://via.placeholder.com/300",
      vehicle: "OD-07-GT-1048",
      driver: "Suresh Das",
      status: "In Progress",
      date: "2025-07-24",
      updatedAt: "09:40 AM",
    },
    {
      id: "CMP-003",
      ward: "Ward 3",
      type: "Missed pickup",
      image: "https://via.placeholder.com/300",
      vehicle: "OD-07-GT-1099",
      driver: "Mahesh Patra",
      status: "Resolved",
      date: "2025-07-23",
      updatedAt: "04:15 PM",
    },
  ]);

  /* ================= STATUS FLOW CONTROL ================= */

  const allowedNextStatus = {
    Pending: ["In Progress"],
    "In Progress": ["Resolved"],
    Resolved: [],
  };

  const updateStatus = (id, newStatus) => {
    if (!window.confirm(`Mark complaint as "${newStatus}"?`)) return;

    setComplaints((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: newStatus,
              updatedAt: new Date().toLocaleTimeString(),
            }
          : c
      )
    );
  };

  const statusColor = (status) => {
    if (status === "Pending") return "bg-red-100 text-red-700";
    if (status === "In Progress") return "bg-yellow-100 text-yellow-700";
    if (status === "Resolved") return "bg-green-100 text-green-700";
  };

  const filteredComplaints =
    filter === "All"
      ? complaints
      : complaints.filter((c) => c.status === filter);

  return (
    <div className="space-y-6">

      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-2xl font-semibold">
          Citizen Complaint Management
        </h2>
        <p className="text-sm text-gray-500">
          Supervisor resolution & monitoring
        </p>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="flex gap-2">
        {["All", "Pending", "In Progress", "Resolved"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm border ${
              filter === f
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto bg-white shadow rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Ward</th>
              <th className="p-3 border">Issue</th>
              <th className="p-3 border">Assigned Vehicle</th>
              <th className="p-3 border">Driver</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Last Update</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredComplaints.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="p-3 border font-medium">{c.id}</td>

                <td className="p-3 border">
                  <img
                    src={c.image}
                    alt="complaint"
                    onClick={() => setPreview(c.image)}
                    className="w-16 h-16 rounded border cursor-pointer"
                  />
                </td>

                <td className="p-3 border">{c.ward}</td>
                <td className="p-3 border">{c.type}</td>
                <td className="p-3 border">{c.vehicle}</td>
                <td className="p-3 border">{c.driver}</td>
                <td className="p-3 border">{c.date}</td>

                <td className="p-3 border">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                      c.status
                    )}`}
                  >
                    {c.status}
                  </span>
                </td>

                <td className="p-3 border text-xs text-gray-500">
                  {c.updatedAt}
                </td>

                <td className="p-3 border">
                  {allowedNextStatus[c.status].length > 0 && (
                    <select
                      onChange={(e) =>
                        updateStatus(c.id, e.target.value)
                      }
                      className="border px-2 py-1 rounded text-xs"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Update
                      </option>
                      {allowedNextStatus[c.status].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  )}
                </td>
              </tr>
            ))}

            {filteredComplaints.length === 0 && (
              <tr>
                <td
                  colSpan="10"
                  className="text-center p-8 text-gray-500"
                >
                  No complaints found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ================= IMAGE PREVIEW MODAL ================= */}
      {preview && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl shadow-xl">
            <img src={preview} className="max-w-md rounded" />
            <button
              onClick={() => setPreview(null)}
              className="mt-3 w-full bg-green-600 text-white py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ================= NOTE ================= */}
      <p className="text-xs text-gray-500">
        Complaint status follows a controlled workflow.
        Direct resolution skipping is restricted for audit compliance.
      </p>
    </div>
  );
};

export default Complaints;

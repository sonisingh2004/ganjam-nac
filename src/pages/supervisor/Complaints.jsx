import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";

/* ================= MAIN COMPONENT ================= */

const Complaints = () => {
  const [filter, setFilter] = useState("All");
  const [preview, setPreview] = useState(null);
  const [mapView, setMapView] = useState(null);
  const [complaints, setComplaints] = useState([]);

  /* ================= LOAD COMPLAINTS (AXIOS) ================= */
  useEffect(() => {
    const loadComplaints = async () => {
      try {
        const res = await api.get("/complaints");

        if (res.data?.length) {
          setComplaints(
            res.data.map((c, index) => ({
              id: `CMP-${String(c.id).padStart(3, "0")}`,
              ward: c.ward || "N/A",
              type: c.title || "General Issue",
              image:
                c.image && c.image !== ""
                  ? c.image
                  : "https://via.placeholder.com/300",
              vehicle: c.vehicle || "Not Assigned",
              driver: c.driver || "Not Assigned",
              status: c.status || "Pending",
              priority: c.priority || "Medium",
              date: c.date || new Date().toISOString().split("T")[0],
              updatedAt: new Date().toLocaleTimeString(),
              sla:
                c.sla ||
                new Date(
                  Date.now() + 4 * 60 * 60 * 1000
                ).toISOString(),
              location: c.location || "Berhampur, Odisha",
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load complaints");
      }
    };

    loadComplaints();
  }, []);

  /* ================= STATUS FLOW ================= */

  const allowedNextStatus = {
    Pending: ["In Progress"],
    "In Progress": ["Resolved"],
    Resolved: [],
  };

  const updateStatus = async (id, newStatus) => {
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

    // OPTIONAL: persist status change
    const numericId = Number(id.split("-")[1]);
    await api.patch(`/complaints/${numericId}`, {
      status: newStatus,
    });
  };

  const statusColor = (status) => {
    if (status === "Pending") return "bg-red-100 text-red-700";
    if (status === "In Progress") return "bg-yellow-100 text-yellow-700";
    if (status === "Resolved") return "bg-green-100 text-green-700";
  };

  const priorityColor = (priority) => {
    if (priority === "High") return "text-red-600 font-semibold";
    if (priority === "Medium") return "text-orange-600 font-semibold";
    return "text-green-600 font-semibold";
  };

  const isSLABreached = (sla, status) => {
    if (status === "Resolved") return false;
    return new Date() > new Date(sla);
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
          Supervisor resolution & monitoring (ICT Compliant)
        </p>
      </div>

      {/* ================= FILTERS ================= */}
      <div className="flex gap-2">
        {["All", "Pending", "In Progress", "Resolved"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm border transition ${
              filter === f
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr className="text-gray-600 uppercase text-xs tracking-wide">
                <th className="px-5 py-4">ID</th>
                <th className="px-5 py-4">Photo</th>
                <th className="px-5 py-4">Ward</th>
                <th className="px-5 py-4">Issue</th>
                <th className="px-5 py-4">Priority</th>
                <th className="px-5 py-4">Vehicle</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">SLA</th>
                <th className="px-5 py-4">Route</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {filteredComplaints.map((c) => {
                const breached = isSLABreached(c.sla, c.status);

                return (
                  <tr
                    key={c.id}
                    className={`hover:bg-gray-50 ${
                      breached ? "bg-red-50" : ""
                    }`}
                  >
                    <td className="px-5 py-4 font-medium">{c.id}</td>

                    <td className="px-5 py-4">
                      <img
                        src={c.image}
                        onClick={() => setPreview(c.image)}
                        className="w-14 h-14 rounded-lg object-cover border cursor-pointer"
                      />
                    </td>

                    <td className="px-5 py-4">{c.ward}</td>
                    <td className="px-5 py-4">{c.type}</td>

                    <td className={`px-5 py-4 ${priorityColor(c.priority)}`}>
                      {c.priority}
                    </td>

                    <td className="px-5 py-4">{c.vehicle}</td>

                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                          c.status
                        )}`}
                      >
                        {c.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-xs">
                      {breached ? (
                        <span className="text-red-600 font-semibold">
                          SLA Breached
                        </span>
                      ) : (
                        <span className="text-green-600">On Time</span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <button
                        onClick={() => setMapView(c.location)}
                        className="text-green-600 text-xs font-medium hover:underline"
                      >
                        View Route
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      {allowedNextStatus[c.status].length > 0 ? (
                        <select
                          defaultValue=""
                          onChange={(e) =>
                            updateStatus(c.id, e.target.value)
                          }
                          className="border rounded-lg px-3 py-1 text-xs"
                        >
                          <option value="" disabled>
                            Update
                          </option>
                          {allowedNextStatus[c.status].map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="text-xs text-green-600 font-medium">
                          Completed
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= IMAGE MODAL ================= */}
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

      {/* ================= MAP MODAL ================= */}
      {mapView && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
          <div className="bg-white w-[90%] md:w-[70%] h-[70%] rounded-xl shadow-xl overflow-hidden">
            <div className="flex justify-between px-4 py-3 border-b">
              <h3 className="font-semibold">
                Route View – {mapView}
              </h3>
              <button onClick={() => setMapView(null)}>Close</button>
            </div>
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                mapView
              )}&output=embed`}
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* ================= COMPLIANCE NOTE ================= */}
      <p className="text-xs text-gray-500">
        ✔ SLA-based monitoring enabled <br />
        ✔ Status lifecycle enforced for audit compliance <br />
        ✔ Geo-tagging & image evidence supported (production)
      </p>
    </div>
  );
};

export default Complaints;

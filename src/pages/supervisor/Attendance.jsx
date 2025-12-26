import { useState } from "react";

const Attendance = () => {
  const [date] = useState(new Date().toISOString().split("T")[0]);

  const drivers = [
    { id: 1, name: "Ramesh Kumar", ward: "Ward 5", status: "Present" },
    { id: 2, name: "Suresh Das", ward: "Ward 12", status: "Absent" },
    { id: 3, name: "Mahesh Patra", ward: "Ward 3", status: "Present" },
    { id: 4, name: "Amit Nayak", ward: "Ward 7", status: "Leave" },
  ];

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Driver Attendance
        </h1>
        <p className="text-sm text-gray-500">
          Attendance for {date}
        </p>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Driver Name</th>
              <th className="px-4 py-3 text-left">Ward</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {drivers.map((d) => (
              <tr key={d.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{d.name}</td>
                <td className="px-4 py-3">{d.ward}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={d.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {drivers.map((d) => (
          <div
            key={d.id}
            className="bg-white rounded-xl shadow p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{d.name}</h3>
              <StatusBadge status={d.status} />
            </div>
            <p className="text-sm text-gray-600">
              Ward: {d.ward}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Present: "bg-green-100 text-green-700",
    Absent: "bg-red-100 text-red-700",
    Leave: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
};

export default Attendance;

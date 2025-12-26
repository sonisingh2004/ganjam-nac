import { useEffect, useState } from "react";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setVehicles([
        { id: 1, number: "OD-07-GT-1023", ward: "Ward 5", driver: "Ramesh", status: "Active" },
        { id: 2, number: "OD-07-GT-1048", ward: "Ward 12", driver: "Suresh", status: "Inactive" },
        { id: 3, number: "OD-07-GT-1099", ward: "Ward 3", driver: "Mahesh", status: "Maintenance" },
      ]);
    }, 500);
  }, []);

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-semibold text-gray-800">
        Vehicle Management
      </h2>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Vehicle No</th>
              <th className="px-4 py-3 text-left">Ward</th>
              <th className="px-4 py-3 text-left">Driver</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{v.number}</td>
                <td className="px-4 py-3">{v.ward}</td>
                <td className="px-4 py-3">{v.driver}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={v.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-red-100 text-red-700",
    Maintenance: "bg-yellow-100 text-yellow-800",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
};

export default Vehicles;

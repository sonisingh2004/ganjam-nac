import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const Analytics = () => {
  const vehicleData = [
    { name: "Active", value: 18 },
    { name: "Inactive", value: 4 },
    { name: "Maintenance", value: 2 },
  ];

  const complaintData = [
    { name: "Pending", count: 7 },
    { name: "In Progress", count: 5 },
    { name: "Resolved", count: 15 },
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"];

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Analytics Overview
        </h1>
        <p className="text-sm text-gray-500">
          Operational performance insights
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* VEHICLE STATUS PIE */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-4">
            Vehicle Status
          </h3>

          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={vehicleData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                >
                  {vehicleData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* COMPLAINT BAR */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-4">
            Complaint Status
          </h3>

          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={complaintData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#16a34a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Analytics;

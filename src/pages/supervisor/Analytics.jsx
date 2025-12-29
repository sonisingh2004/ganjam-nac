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

/* ================= DATA ================= */

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

const wardPerformance = [
  { ward: "Ward 1", percent: 92 },
  { ward: "Ward 3", percent: 78 },
  { ward: "Ward 5", percent: 85 },
  { ward: "Ward 12", percent: 88 },
];

const COLORS = {
  Active: "#22c55e",
  Inactive: "#ef4444",
  Maintenance: "#facc15",
  Pending: "#ef4444",
  "In Progress": "#facc15",
  Resolved: "#22c55e",
};

/* ================= COMPONENT ================= */

const Analytics = () => {
  const totalVehicles = vehicleData.reduce(
    (sum, v) => sum + v.value,
    0
  );
  const resolved = complaintData.find(
    (c) => c.name === "Resolved"
  )?.count || 0;
  const totalComplaints = complaintData.reduce(
    (sum, c) => sum + c.count,
    0
  );

  const resolutionRate = totalComplaints
    ? Math.round((resolved / totalComplaints) * 100)
    : 0;

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Analytics Overview
        </h1>
        <p className="text-sm text-gray-500">
          Data Period: Today ({new Date().toLocaleDateString()})
        </p>
      </div>

      {/* ================= KPI SUMMARY ================= */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard title="Total Vehicles" value={totalVehicles} />
        <SummaryCard title="Active Vehicles" value={vehicleData[0].value} color="text-green-600" />
        <SummaryCard title="Complaints Today" value={totalComplaints} />
        <SummaryCard title="Resolution Rate" value={`${resolutionRate}%`} color="text-green-700" />
      </div>

      {/* ================= CHART GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* VEHICLE STATUS PIE */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-4">
            Vehicle Status Distribution
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
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {vehicleData.map((v, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[v.name]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* COMPLAINT STATUS BAR */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold mb-4">
            Complaint Status Overview
          </h3>

          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={complaintData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {complaintData.map((c, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[c.name]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* ================= WARD PERFORMANCE ================= */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold mb-4">
          Ward-wise Collection Performance
        </h3>

        <div className="space-y-4">
          {wardPerformance.map((w) => (
            <div key={w.ward}>
              <div className="flex justify-between text-sm mb-1">
                <span>{w.ward}</span>
                <span className="font-medium">
                  {w.percent}%
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-green-600 rounded"
                  style={{ width: `${w.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= FOOT NOTE ================= */}
      <p className="text-xs text-gray-500">
        Data shown is system-generated and updated periodically.
        This analytics module supports operational review and
        decision-making.
      </p>
    </div>
  );
};

/* ================= SMALL COMPONENT ================= */

const SummaryCard = ({ title, value, color }) => (
  <div className="bg-white rounded-xl shadow p-4">
    <p className="text-xs text-gray-500">{title}</p>
    <h3 className={`text-2xl font-bold ${color || ""}`}>
      {value}
    </h3>
  </div>
);

export default Analytics;

// @ts-nocheck
const ComplaintsStatus = ({ data }) => {
  const totalComplaints = (data?.pending || 0) + (data?.open || 0) + (data?.closed || 0) + (data?.outOfScope || 0);
  
  const calculatePercentage = (value) => {
    if (totalComplaints === 0) return 0;
    return ((value / totalComplaints) * 100).toFixed(1);
  };

  const complaintStats = [
    { label: 'Pending', count: data?.pending || 0, color: 'text-orange-500', dotColor: 'bg-orange-500' },
    { label: 'Open', count: data?.open || 0, color: 'text-red-500', dotColor: 'bg-red-500' },
    { label: 'Closed', count: data?.closed || 0, color: 'text-green-500', dotColor: 'bg-green-500' },
    { label: 'Out of Scope', count: data?.outOfScope || 0, color: 'text-gray-500', dotColor: 'bg-gray-500' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Complaints</h3>
      
      {/* Donut Chart Placeholder */}
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="60"
              fill="none"
              stroke="#f3f4f6"
              strokeWidth="20"
            />
            {/* Segments would be calculated based on percentages */}
            <circle
              cx="80"
              cy="80"
              r="60"
              fill="none"
              stroke="#ef4444"
              strokeWidth="20"
              strokeDasharray={`${calculatePercentage(data?.open) * 3.77} 377`}
              strokeDashoffset="0"
            />
            <circle
              cx="80"
              cy="80"
              r="60"
              fill="none"
              stroke="#22c55e"
              strokeWidth="20"
              strokeDasharray={`${calculatePercentage(data?.closed) * 3.77} 377`}
              strokeDashoffset={`-${calculatePercentage(data?.open) * 3.77}`}
            />
          </svg>
        </div>
      </div>

      {/* Stats List */}
      <div className="space-y-2">
        {complaintStats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className={`w-3 h-3 rounded-full ${stat.dotColor} mr-2`}></span>
              <span className="text-sm text-gray-700">{stat.label}</span>
            </div>
            <span className={`text-sm font-semibold ${stat.color}`}>
              {stat.count}
            </span>
          </div>
        ))}
      </div>

      {/* Secondary Scan Section */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Secondary Scan</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
            <span className="text-gray-600">0 Today</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
            <span className="text-gray-600">0 Yesterday</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            <span className="text-gray-600">0 Till Month</span>
          </div>
          <div className="flex items-center">
            <span className="w-2 h-2 rounded-full bg-gray-500 mr-2"></span>
            <span className="text-gray-600">0 Prev Month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsStatus;

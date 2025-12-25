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
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
          Complaints
        </h3>
        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-xl">📋</span>
        </div>
      </div>
      
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
              stroke="url(#gradientOpen)"
              strokeWidth="20"
              strokeDasharray={`${calculatePercentage(data?.open) * 3.77} 377`}
              strokeDashoffset="0"
              className="transition-all duration-500"
            />
            <circle
              cx="80"
              cy="80"
              r="60"
              fill="none"
              stroke="url(#gradientClosed)"
              strokeWidth="20"
              strokeDasharray={`${calculatePercentage(data?.closed) * 3.77} 377`}
              strokeDashoffset={`-${calculatePercentage(data?.open) * 3.77}`}
              className="transition-all duration-500"
            />
            <defs>
              <linearGradient id="gradientOpen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#f87171" />
              </linearGradient>
              <linearGradient id="gradientClosed" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#4ade80" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Stats List */}
      <div className="space-y-2">
        {complaintStats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gradient-to-r hover:from-gray-50 hover:to-pink-50 transition-all group">
            <div className="flex items-center">
              <span className={`w-3 h-3 rounded-full ${stat.dotColor} mr-2`}></span>
              <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900">{stat.label}</span>
            </div>
            <span className={`text-sm font-bold ${stat.color}`}>
              {stat.count}
            </span>
          </div>
        ))}
      </div>

      {/* Secondary Scan Section */}
      <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">Secondary Scan</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center p-2 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 mr-2"></span>
            <span className="text-gray-700 font-medium">0 Today</span>
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

// @ts-nocheck
const KYCStatus = ({ data }) => {
  const totalKYC = (data?.residential || 0) + (data?.commercial || 0) + (data?.religious || 0) + (data?.industrial || 0);
  
  const kycCategories = [
    { label: 'Residential', count: data?.residential || 0, color: 'text-orange-500', dotColor: 'bg-orange-500' },
    { label: 'Commercial', count: data?.commercial || 0, color: 'text-orange-600', dotColor: 'bg-orange-600' },
    { label: 'Religious', count: data?.religious || 0, color: 'text-green-500', dotColor: 'bg-green-500' },
    { label: 'Industrial', count: data?.industrial || 0, color: 'text-gray-500', dotColor: 'bg-gray-500' },
  ];

  const doorToDoorStats = [
    { label: 'Today', count: data?.doorToDoor?.today || 0, color: 'bg-orange-500' },
    { label: 'Yesterday', count: data?.doorToDoor?.yesterday || 0, color: 'bg-red-500' },
    { label: 'Till Month', count: data?.doorToDoor?.tillMonth || 0, color: 'bg-green-500' },
    { label: 'Prev Month', count: data?.doorToDoor?.prevMonth || 0, color: 'bg-gray-500' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">KYC</h3>
      
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
            {/* Simplified representation */}
            <circle
              cx="80"
              cy="80"
              r="60"
              fill="none"
              stroke="#22c55e"
              strokeWidth="20"
              strokeDasharray="200 377"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-800">{totalKYC}</span>
          </div>
        </div>
      </div>

      {/* KYC Categories */}
      <div className="space-y-2 mb-6">
        {kycCategories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <span className={`w-3 h-3 rounded-full ${category.dotColor} mr-2`}></span>
              <span className="text-sm text-gray-700">{category.label}</span>
            </div>
            <span className={`text-sm font-semibold ${category.color}`}>
              {category.count}
            </span>
          </div>
        ))}
      </div>

      {/* Door to Door Section */}
      <div className="pt-4 sm:pt-6 border-t border-gray-200">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Door to Door</h4>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {doorToDoorStats.map((stat, index) => (
            <div key={index} className="flex items-center">
              <span className={`w-2 h-2 rounded-full ${stat.color} mr-2`}></span>
              <span className="text-gray-600">{stat.count} {stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KYCStatus;

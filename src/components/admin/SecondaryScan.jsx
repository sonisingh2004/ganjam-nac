// @ts-nocheck
const SecondaryScan = ({ data }) => {
  const scanStats = [
    { label: 'Today', count: data?.today || 0, color: 'bg-orange-500' },
    { label: 'Yesterday', count: data?.yesterday || 0, color: 'bg-red-500' },
    { label: 'Till Month', count: data?.tillMonth || 0, color: 'bg-green-500' },
    { label: 'Prev Month', count: data?.prevMonth || 0, color: 'bg-gray-500' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
          Secondary Scan
        </h3>
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
          <span className="text-white text-xl">🔍</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {scanStats.map((stat, index) => (
          <div key={index} className="text-center p-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg hover:shadow-md transition-all">
            <div className="flex items-center justify-center mb-2">
              <span className={`w-3 h-3 rounded-full ${stat.color} mr-2`}></span>
              <span className="text-sm text-gray-600 font-medium">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {stat.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecondaryScan;

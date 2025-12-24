// @ts-nocheck
const SecondaryScan = ({ data }) => {
  const scanStats = [
    { label: 'Today', count: data?.today || 0, color: 'bg-orange-500' },
    { label: 'Yesterday', count: data?.yesterday || 0, color: 'bg-red-500' },
    { label: 'Till Month', count: data?.tillMonth || 0, color: 'bg-green-500' },
    { label: 'Prev Month', count: data?.prevMonth || 0, color: 'bg-gray-500' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Secondary Scan</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {scanStats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center mb-2">
              <span className={`w-3 h-3 rounded-full ${stat.color} mr-2`}></span>
              <span className="text-sm text-gray-600">{stat.label}</span>
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

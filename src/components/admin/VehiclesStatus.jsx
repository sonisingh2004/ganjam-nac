// @ts-nocheck
const VehiclesStatus = ({ data }) => {
  const vehicleStatuses = [
    { label: 'All', count: data?.all || 0, badge: 'bg-blue-500' },
    { label: 'Over Speeding', count: data?.overSpeeding || 0, badge: 'bg-red-500' },
    { label: 'Running', count: data?.running || 0, badge: 'bg-green-500' },
    { label: 'Standing', count: data?.standing || 0, badge: 'bg-blue-400' },
    { label: 'Stopped', count: data?.stopped || 0, badge: 'bg-orange-500' },
    { label: 'Data Not Retrieving', count: data?.dataNotRetrieving || 0, badge: 'bg-gray-400' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Vehicles</h3>
      
      <div className="space-y-3">
        {vehicleStatuses.map((status, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <span className="text-sm text-gray-700">{status.label}</span>
            <span className={`${status.badge} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
              {status.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehiclesStatus;

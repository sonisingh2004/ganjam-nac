// @ts-nocheck
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api/api';
import MapView from '../../components/admin/MapView';
import StatsCard from '../../components/admin/StatsCard';

const TrackVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    ward: 'all',
    search: ''
  });

  // Fetch vehicle locations from API
  useEffect(() => {
    fetchVehicleLocations();
    
    // Poll for updates every 10 seconds for real-time tracking
    const interval = setInterval(fetchVehicleLocations, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchVehicleLocations = async () => {
    try {
      setLoading(true);
      const response = await api.get('/vehicles');
      
      // Map db.json structure to UI expected structure
      const mappedData = response.data.map(v => {
        // Determine status based on speed and data availability
        let status = 'stopped';
        if (!v.location || v.speed === null || v.speed === undefined) {
          status = 'dataNotRetrieving';
        } else if (v.speed > 0) {
          status = 'running';
        } else if (v.fuelLevel > 0 && v.speed === 0) {
          status = 'standing';
        }
        
        // Override with db.json status if it matches our expected values
        if (['running', 'standing', 'stopped', 'dataNotRetrieving'].includes(v.status?.toLowerCase())) {
          status = v.status.toLowerCase();
        }
        
        return {
          id: v.id,
          registrationNumber: v.registrationNumber || v.number || 'N/A',
          type: v.type || 'compactor',
          status: status,
          location: v.location || null,
          speed: v.speed !== undefined ? v.speed : null,
          assignedWard: v.assignedWard || v.ward || 'N/A',
          driverName: v.driverName || v.driver || 'N/A',
          driverPhone: v.driverPhone || '+91 98765 43210',
          fuelLevel: v.fuelLevel !== undefined ? v.fuelLevel : null,
          lastUpdated: v.lastUpdated || new Date().toISOString(),
          routeProgress: v.routeProgress || Math.floor(Math.random() * 100), // Generate if not available
          wasteCollected: v.wasteCollected || (Math.random() * 10).toFixed(1),
          targetWaste: v.targetWaste || 8.5
        };
      });

      setVehicles(mappedData);
    } catch (error) {
      console.error('Error fetching vehicle locations:', error);
      toast.error('Failed to fetch vehicle locations');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      running: { bg: 'bg-emerald-500', text: 'text-emerald-600', dot: 'bg-emerald-500' },
      standing: { bg: 'bg-blue-500', text: 'text-blue-600', dot: 'bg-blue-500' },
      stopped: { bg: 'bg-orange-500', text: 'text-orange-600', dot: 'bg-orange-500' },
      dataNotRetrieving: { bg: 'bg-gray-500', text: 'text-gray-600', dot: 'bg-gray-500' }
    };
    return colors[status] || colors.stopped;
  };

  const getVehicleIcon = (type) => {
    const icons = {
      compactor: '🚛',
      tipper: '🚚',
      'mini-truck': '🚐'
    };
    return icons[type] || '🚛';
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesStatus = filters.status === 'all' || vehicle.status === filters.status;
    const matchesWard = filters.ward === 'all' || vehicle.assignedWard === filters.ward;
    const matchesSearch = vehicle.registrationNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
                        vehicle.driverName.toLowerCase().includes(filters.search.toLowerCase());
    return matchesStatus && matchesWard && matchesSearch;
  });

  const getUniqueWards = () => {
    return [...new Set(vehicles.map(v => v.assignedWard))].sort();
  };

  const getTimeSinceUpdate = (timestamp) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const statsCards = [
    {
      title: "Running",
      value: vehicles.filter(v => v.status === 'running').length,
      icon: "▶️",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Standing",
      value: vehicles.filter(v => v.status === 'standing').length,
      icon: "⏸️",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      title: "Stopped",
      value: vehicles.filter(v => v.status === 'stopped').length,
      icon: "⏹️",
      gradient: "from-orange-500 to-amber-500"
    },
    {
      title: "Offline",
      value: vehicles.filter(v => v.status === 'dataNotRetrieving').length,
      icon: "❓",
      gradient: "from-gray-400 to-gray-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Live Vehicle Tracking
              </h1>
              <p className="text-gray-600 mt-1">Real-time monitoring of all vehicles</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-xl">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-emerald-700">Live Updates</span>
              </div>
              <span className="text-xs text-gray-500">
                Auto-refresh: 10s
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {statsCards.map((stat, index) => (
            <StatsCard key={index} {...stat} showButton={false} />
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Vehicle number, Driver..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              >
                <option value="all">All Status</option>
                <option value="running">Running</option>
                <option value="standing">Standing</option>
                <option value="stopped">Stopped</option>
                <option value="dataNotRetrieving">Offline</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Ward</label>
              <select
                value={filters.ward}
                onChange={(e) => setFilters({ ...filters, ward: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              >
                <option value="all">All Wards</option>
                {getUniqueWards().map(ward => (
                  <option key={ward} value={ward}>{ward}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Map View */}
        <MapView vehicles={filteredVehicles} />

        {/* Vehicle List */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Vehicle List</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-500"></div>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="bg-gradient-to-r from-gray-50 to-white hover:from-emerald-50 hover:to-teal-50 border border-gray-200 rounded-xl p-4 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <div className="flex items-center justify-between">
                    {/* Left Section */}
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${getStatusColor(vehicle.status).bg} rounded-xl flex items-center justify-center shadow-md`}>
                        <span className="text-white text-2xl">{getVehicleIcon(vehicle.type)}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{vehicle.registrationNumber}</h3>
                        <div className="flex items-center space-x-3 mt-1">
                          <span className="text-sm text-gray-600">👤 {vehicle.driverName}</span>
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(vehicle.status).bg} text-white`}>
                            {vehicle.status.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Middle Section */}
                    <div className="hidden md:flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Speed</p>
                        <p className="text-lg font-bold text-gray-900">
                          {vehicle.speed !== null ? `${vehicle.speed} km/h` : 'N/A'}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Fuel</p>
                        <p className="text-lg font-bold text-gray-900">
                          {vehicle.fuelLevel !== null ? `${vehicle.fuelLevel}%` : 'N/A'}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Progress</p>
                        <p className="text-lg font-bold text-emerald-600">
                          {vehicle.routeProgress}%
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Ward</p>
                        <p className="text-sm font-bold text-gray-900">{vehicle.assignedWard}</p>
                      </div>
                    </div>

                    {/* Right Section */}
                    <div className="flex flex-col items-end space-y-2">
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Last Update</p>
                        <p className="text-sm font-semibold text-gray-700">
                          {getTimeSinceUpdate(vehicle.lastUpdated)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVehicle(vehicle);
                        }}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 py-1 rounded-lg text-sm font-semibold shadow-md transition-all"
                      >
                        Track
                      </button>
                    </div>
                  </div>

                  {/* Mobile Progress Bar */}
                  <div className="mt-3 md:hidden">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">Route Progress</span>
                      <span className="text-xs font-bold text-emerald-600">{vehicle.routeProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all"
                        style={{ width: `${vehicle.routeProgress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {!loading && filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚛</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Vehicles Found</h3>
              <p className="text-gray-600">Try adjusting your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Vehicle Detail Modal */}
      {selectedVehicle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Vehicle Tracking Details
                </h2>
                <button
                  onClick={() => setSelectedVehicle(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Vehicle Info */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Vehicle Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Registration Number</p>
                      <p className="text-lg font-bold text-gray-900">{selectedVehicle.registrationNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Type</p>
                      <p className="text-base font-bold text-gray-900 capitalize">{selectedVehicle.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Status</p>
                      <span className={`${getStatusColor(selectedVehicle.status).bg} text-white text-sm font-bold px-3 py-1 rounded-full inline-block`}>
                        {selectedVehicle.status.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Assigned Ward</p>
                      <p className="text-base font-bold text-gray-900">{selectedVehicle.assignedWard}</p>
                    </div>
                  </div>
                </div>

                {/* Current Status */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Current Status</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Speed</p>
                      <p className="text-base font-bold text-gray-900">
                        {selectedVehicle.speed !== null ? `${selectedVehicle.speed} km/h` : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Fuel Level</p>
                      <p className="text-base font-bold text-gray-900">
                        {selectedVehicle.fuelLevel !== null ? `${selectedVehicle.fuelLevel}%` : 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Last Update</p>
                      <p className="text-base font-bold text-gray-900">
                        {getTimeSinceUpdate(selectedVehicle.lastUpdated)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Location</p>
                      <p className="text-base font-bold text-gray-900">
                        {selectedVehicle.location 
                          ? `${selectedVehicle.location.lat.toFixed(4)}, ${selectedVehicle.location.lng.toFixed(4)}`
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Route Progress */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Route Progress</h3>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Completion</span>
                      <span className="text-sm font-bold text-emerald-600">{selectedVehicle.routeProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full transition-all"
                        style={{ width: `${selectedVehicle.routeProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Waste Collected</p>
                      <p className="text-base font-bold text-gray-900">{selectedVehicle.wasteCollected} tons</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Target</p>
                      <p className="text-base font-bold text-gray-900">{selectedVehicle.targetWaste} tons</p>
                    </div>
                  </div>
                </div>

                {/* Driver Info */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Driver Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Name</p>
                      <p className="text-base font-bold text-gray-900">{selectedVehicle.driverName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Phone</p>
                      <p className="text-base font-bold text-gray-900">{selectedVehicle.driverPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setSelectedVehicle(null)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 rounded-xl font-semibold transition-all"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      if (selectedVehicle.driverPhone) {
                        window.location.href = `tel:${selectedVehicle.driverPhone}`;
                      }
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 rounded-xl font-semibold transition-all"
                  >
                    Call Driver
                  </button>
                  <button
                    onClick={() => toast.info('Route history feature coming soon!')}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-2 rounded-xl font-semibold transition-all"
                  >
                    View History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackVehicle;

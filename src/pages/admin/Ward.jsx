// @ts-nocheck
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api/api';


const Ward = () => {
  const [wards, setWards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    search: ''
  });
  const [selectedWard, setSelectedWard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWard, setNewWard] = useState({
    name: '',
    area: '',
    population: '',
    households: '',
    supervisorName: '',
    supervisorPhone: '',
    wasteGenerationPerDay: '',
    collectionFrequency: 'daily'
  });

  // Fetch wards from API
  useEffect(() => {
    fetchWards();
  }, [filters]);

  const fetchWards = async () => {
    try {
      setLoading(true);
      const response = await api.get('/wards');
      const data = response.data;
      
      // Map db.json structure to UI expected structure
      const mappedData = data.map(w => {
        const coverage = w.coverage || 0;
        // Determine status based on coverage percentage
        const status = coverage >= 100 ? 'completed' : 
                      coverage > 0 ? 'in-progress' : 
                      'pending';
        
        return {
          id: w.id,
          name: w.wardName || w.name || 'N/A',
          area: w.area || 'N/A',
          population: w.population || 0,
          households: w.households || 0,
          supervisorName: w.supervisor || w.supervisorName || 'N/A',
          supervisorPhone: w.supervisorPhone || 'N/A',
          status: status,
          completion: coverage,
          collectedToday: (coverage / 100 * 8).toFixed(1),
          targetDaily: 8,
          assignedVehicles: Array.isArray(w.vehicles) ? w.vehicles : (typeof w.vehicles === 'number' ? Array(w.vehicles).fill('Vehicle') : []),
          assignedStaff: w.staff || 10,
          binLocations: w.bins || 0,
          complaints: w.complaints || 0,
          lastCollectionTime: new Date().toISOString(),
          collectionFrequency: w.collectionFrequency?.toLowerCase() || 'daily',
          wasteGenerationPerDay: 8
        };
      });
      
      // Apply filters
      let filteredData = mappedData;
      if (filters.status !== 'all') {
        filteredData = filteredData.filter(w => w.status === filters.status);
      }
      if (filters.search) {
        filteredData = filteredData.filter(w => 
          w.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
          w.supervisorName?.toLowerCase().includes(filters.search.toLowerCase())
        );
      }
      
      setWards(filteredData);
    } catch (error) {
      console.warn('API not available:', error.message);
      setWards([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWard = async (e) => {
    e.preventDefault();
    try {
      // Create complete ward object with proper structure for db.json
      const wardToAdd = {
        wardName: newWard.name,
        area: newWard.area,
        population: parseInt(newWard.population),
        households: parseInt(newWard.households),
        supervisor: newWard.supervisorName,
        supervisorPhone: newWard.supervisorPhone,
        vehicles: 0,
        bins: 0,
        collectionFrequency: newWard.collectionFrequency.charAt(0).toUpperCase() + newWard.collectionFrequency.slice(1),
        status: 'active',
        coverage: 0
      };

      const response = await api.post('/wards', wardToAdd);
      
      // Map the response to UI expected format
      const mappedWard = {
        id: response.data.id,
        name: response.data.wardName || response.data.name || newWard.name,
        area: response.data.area || newWard.area,
        population: response.data.population || parseInt(newWard.population),
        households: response.data.households || parseInt(newWard.households),
        supervisorName: response.data.supervisor || response.data.supervisorName || newWard.supervisorName,
        supervisorPhone: response.data.supervisorPhone || newWard.supervisorPhone,
        status: 'pending',
        completion: 0,
        collectedToday: 0,
        targetDaily: 8,
        assignedVehicles: [],
        assignedStaff: 10,
        binLocations: 0,
        complaints: 0,
        lastCollectionTime: new Date().toISOString(),
        collectionFrequency: newWard.collectionFrequency,
        wasteGenerationPerDay: parseFloat(newWard.wasteGenerationPerDay)
      };
      
      setWards([...wards, mappedWard]);
      setShowAddModal(false);
      toast.success('Ward added successfully');
      setNewWard({
        name: '',
        area: '',
        population: '',
        households: '',
        supervisorName: '',
        supervisorPhone: '',
        wasteGenerationPerDay: '',
        collectionFrequency: 'daily'
      });
      fetchWards(); // Refresh to get updated data
    } catch (error) {
      console.error('Error adding ward:', error);
      toast.error('Failed to add ward');
    }
  };

  const handleDeleteWard = async (wardId) => {
    if (!window.confirm('Are you sure you want to delete this ward?')) return;
    
    try {
      await api.delete(`/wards/${wardId}`);
      toast.success('Ward deleted successfully');
      fetchWards();
    } catch (error) {
      console.error('Error deleting ward:', error);
      toast.error('Failed to delete ward');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: 'bg-gradient-to-r from-emerald-500 to-teal-500',
      'in-progress': 'bg-gradient-to-r from-blue-500 to-indigo-500',
      pending: 'bg-gradient-to-r from-orange-500 to-amber-500'
    };
    return badges[status] || badges.pending;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '🔄';
      case 'pending': return '⏳';
      default: return '⏳';
    }
  };

  const filteredWards = wards.filter(ward => {
    const matchesStatus = filters.status === 'all' || ward.status === filters.status;
    const matchesSearch = ward.name?.toLowerCase().includes(filters.search.toLowerCase()) ||
                         ward.supervisorName?.toLowerCase().includes(filters.search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Ward Management
              </h1>
              <p className="text-gray-600 mt-1">Monitor and manage all wards</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <span className="mr-2">➕</span>
              Add Ward
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Total Wards</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{wards.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">🏘️</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Completed Today</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">
                  {wards.filter(w => w.status === 'completed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">✅</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold">In Progress</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">
                  {wards.filter(w => w.status === 'in-progress').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">🔄</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-5 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-semibold">Pending</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">
                  {wards.filter(w => w.status === 'pending').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-2xl">⏳</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Ward name, Supervisor..."
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
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Ward Cards */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredWards.map((ward) => (
              <div
                key={ward.id}
                className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden group"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white text-2xl">🏘️</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{ward.name}</h3>
                        <p className="text-sm text-gray-600">{ward.area}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`${getStatusBadge(ward.status)} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md capitalize`}>
                        {ward.status.replace('-', ' ')}
                      </span>
                      <span className="text-2xl">{getStatusIcon(ward.status)}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-gray-700">Collection Progress</span>
                      <span className="text-sm font-bold text-emerald-600">{ward.completion}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`${getStatusBadge(ward.status)} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${ward.completion}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
                      <span>Collected: {ward.collectedToday} tons</span>
                      <span>Target: {ward.targetDaily} tons</span>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-xl">
                      <p className="text-xs text-gray-600 font-semibold mb-1">Population</p>
                      <p className="text-sm font-bold text-gray-900">{ward.population.toLocaleString()}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-xl">
                      <p className="text-xs text-gray-600 font-semibold mb-1">Households</p>
                      <p className="text-sm font-bold text-gray-900">{ward.households.toLocaleString()}</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-3 rounded-xl">
                      <p className="text-xs text-gray-600 font-semibold mb-1">Vehicles</p>
                      <p className="text-sm font-bold text-gray-900">{ward.assignedVehicles.length}</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-3 rounded-xl">
                      <p className="text-xs text-gray-600 font-semibold mb-1">Staff</p>
                      <p className="text-sm font-bold text-gray-900">{ward.assignedStaff}</p>
                    </div>
                  </div>

                  {/* Supervisor Info */}
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">👤 Supervisor:</span>
                        <span className="text-sm font-semibold text-gray-900">{ward.supervisorName}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">📞 Phone:</span>
                        <span className="text-sm font-semibold text-gray-900">{ward.supervisorPhone}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">📍 Bin Locations:</span>
                        <span className="text-sm font-semibold text-gray-900">{ward.binLocations}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">📋 Complaints:</span>
                        <span className={`text-sm font-semibold ${ward.complaints > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                          {ward.complaints}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Last Collection Info */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <p className="text-gray-600">Last Collection:</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(ward.lastCollectionTime).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedWard(ward);
                        setShowModal(true);
                      }}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => toast.info('Map view feature coming soon!')}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                    >
                      View Map
                    </button>
                    <button
                      onClick={() => handleDeleteWard(ward.id)}
                      className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-4 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all"
                      title="Delete Ward"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredWards.length === 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">🏘️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Wards Found</h3>
            <p className="text-gray-600">Try adjusting your filters or add a new ward</p>
          </div>
        )}
      </div>

      {/* Ward Details Modal */}
      {showModal && selectedWard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Ward Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Basic Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Ward Name</p>
                      <p className="text-lg font-bold text-gray-900">{selectedWard.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Status</p>
                      <span className={`${getStatusBadge(selectedWard.status)} text-white text-sm font-bold px-3 py-1 rounded-full inline-block mt-1 capitalize`}>
                        {selectedWard.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Area</p>
                      <p className="text-base font-bold text-gray-900">{selectedWard.area}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Collection Frequency</p>
                      <p className="text-base font-bold text-gray-900 capitalize">{selectedWard.collectionFrequency}</p>
                    </div>
                  </div>
                </div>

                {/* Demographics */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Demographics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Population</p>
                      <p className="text-base font-bold text-gray-900">{selectedWard.population.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Households</p>
                      <p className="text-base font-bold text-gray-900">{selectedWard.households.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Waste Generation/Day</p>
                      <p className="text-base font-bold text-gray-900">{selectedWard.wasteGenerationPerDay} tons</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Bin Locations</p>
                      <p className="text-base font-bold text-gray-900">{selectedWard.binLocations}</p>
                    </div>
                  </div>
                </div>

                {/* Supervisor Information */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Supervisor Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Name</p>
                      <p className="text-base font-bold text-gray-900">{selectedWard.supervisorName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Phone</p>
                      <p className="text-base font-bold text-gray-900">{selectedWard.supervisorPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Resources */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Assigned Resources</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold mb-2">Vehicles ({selectedWard.assignedVehicles.length})</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedWard.assignedVehicles.map((vehicle, index) => (
                          <span key={index} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                            {vehicle}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Staff Members</p>
                      <p className="text-base font-bold text-gray-900">{selectedWard.assignedStaff} personnel</p>
                    </div>
                  </div>
                </div>

                {/* Performance */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Today's Performance</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Completion Rate</p>
                      <p className="text-base font-bold text-emerald-600">{selectedWard.completion}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Collected Today</p>
                      <p className="text-base font-bold text-gray-900">{selectedWard.collectedToday} / {selectedWard.targetDaily} tons</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Active Complaints</p>
                      <p className={`text-base font-bold ${selectedWard.complaints > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                        {selectedWard.complaints}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Last Collection</p>
                      <p className="text-base font-bold text-gray-900">
                        {new Date(selectedWard.lastCollectionTime).toLocaleTimeString('en-IN', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 rounded-xl font-semibold transition-all"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => toast.info('Edit feature coming soon!')}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-2 rounded-xl font-semibold transition-all"
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Ward Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Add New Ward
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleAddWard} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ward Name *</label>
                    <input
                      type="text"
                      required
                      value={newWard.name}
                      onChange={(e) => setNewWard({ ...newWard, name: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Ward 1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Area *</label>
                    <input
                      type="text"
                      required
                      value={newWard.area}
                      onChange={(e) => setNewWard({ ...newWard, area: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="5.2 km²"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Population *</label>
                    <input
                      type="number"
                      required
                      value={newWard.population}
                      onChange={(e) => setNewWard({ ...newWard, population: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="12500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Households *</label>
                    <input
                      type="number"
                      required
                      value={newWard.households}
                      onChange={(e) => setNewWard({ ...newWard, households: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="2850"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Waste Generation/Day (tons) *</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={newWard.wasteGenerationPerDay}
                      onChange={(e) => setNewWard({ ...newWard, wasteGenerationPerDay: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="8.5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Collection Frequency *</label>
                    <select
                      required
                      value={newWard.collectionFrequency}
                      onChange={(e) => setNewWard({ ...newWard, collectionFrequency: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="daily">Daily</option>
                      <option value="alternate">Alternate Days</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Supervisor Name *</label>
                    <input
                      type="text"
                      required
                      value={newWard.supervisorName}
                      onChange={(e) => setNewWard({ ...newWard, supervisorName: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="Rajesh Kumar"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Supervisor Phone *</label>
                    <input
                      type="tel"
                      required
                      value={newWard.supervisorPhone}
                      onChange={(e) => setNewWard({ ...newWard, supervisorPhone: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 rounded-xl font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 rounded-xl font-semibold transition-all"
                  >
                    Add Ward
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ward;

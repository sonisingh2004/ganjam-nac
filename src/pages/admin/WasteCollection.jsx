// @ts-nocheck
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const WasteCollection = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    ward: 'all',
    date: '',
    search: ''
  });
  const [formData, setFormData] = useState({
    ward: '',
    vehicle: '',
    driver: '',
    route: '',
    wasteType: '',
    quantity: '',
    collectionDate: new Date().toISOString().split('T')[0],
    status: 'pending',
    notes: ''
  });

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API endpoint
      // const response = await fetch('/api/admin/waste-collections', {
      //   headers: {
      //     'Authorization': `Bearer ${localStorage.getItem('token')}`
      //   }
      // });
      // const data = await response.json();

      // Mock data
      const mockData = [
        {
          id: 'WC001',
          ward: 'Ward 1',
          vehicle: 'OD-05-2345',
          driver: 'Sanjay Das',
          route: 'Route A-1',
          wasteType: 'Mixed Waste',
          quantity: 11.8,
          targetQuantity: 12.8,
          collectionDate: new Date().toISOString().split('T')[0],
          status: 'completed',
          completionTime: '09:45 AM',
          notes: 'Collection completed successfully'
        },
        {
          id: 'WC002',
          ward: 'Ward 5',
          vehicle: 'OD-05-1234',
          driver: 'Ramesh Singh',
          route: 'Route B-3',
          wasteType: 'Organic Waste',
          quantity: 5.5,
          targetQuantity: 8.5,
          collectionDate: new Date().toISOString().split('T')[0],
          status: 'in-progress',
          completionTime: null,
          notes: 'Collection in progress'
        },
        {
          id: 'WC003',
          ward: 'Ward 7',
          vehicle: 'OD-05-9012',
          driver: 'Prakash Patel',
          route: 'Route C-2',
          wasteType: 'Recyclable',
          quantity: 8.7,
          targetQuantity: 10.2,
          collectionDate: new Date().toISOString().split('T')[0],
          status: 'in-progress',
          completionTime: null,
          notes: 'Almost completed'
        },
        {
          id: 'WC004',
          ward: 'Ward 3',
          vehicle: 'OD-05-5678',
          driver: 'Suresh Kumar',
          route: 'Route D-1',
          wasteType: 'Mixed Waste',
          quantity: 0,
          targetQuantity: 7.4,
          collectionDate: new Date().toISOString().split('T')[0],
          status: 'pending',
          completionTime: null,
          notes: 'Scheduled for afternoon'
        },
        {
          id: 'WC005',
          ward: 'Ward 2',
          vehicle: 'OD-05-3456',
          driver: 'Vijay Sharma',
          route: 'Route E-2',
          wasteType: 'Organic Waste',
          quantity: 1.8,
          targetQuantity: 6.3,
          collectionDate: new Date().toISOString().split('T')[0],
          status: 'in-progress',
          completionTime: null,
          notes: 'Just started'
        }
      ];

      setCollections(mockData);
    } catch (error) {
      console.error('Error fetching collections:', error);
      toast.error('Failed to fetch waste collections');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: { bg: 'bg-emerald-500', text: 'text-emerald-600', badge: 'bg-emerald-100 text-emerald-700' },
      'in-progress': { bg: 'bg-blue-500', text: 'text-blue-600', badge: 'bg-blue-100 text-blue-700' },
      pending: { bg: 'bg-orange-500', text: 'text-orange-600', badge: 'bg-orange-100 text-orange-700' },
      cancelled: { bg: 'bg-red-500', text: 'text-red-600', badge: 'bg-red-100 text-red-700' }
    };
    return colors[status] || colors.pending;
  };

  const getWasteTypeIcon = (type) => {
    const icons = {
      'Mixed Waste': '🗑️',
      'Organic Waste': '🍃',
      'Recyclable': '♻️',
      'Hazardous': '⚠️'
    };
    return icons[type] || '🗑️';
  };

  const filteredCollections = collections.filter(collection => {
    const matchesStatus = filters.status === 'all' || collection.status === filters.status;
    const matchesWard = filters.ward === 'all' || collection.ward === filters.ward;
    const matchesDate = !filters.date || collection.collectionDate === filters.date;
    const matchesSearch = collection.vehicle.toLowerCase().includes(filters.search.toLowerCase()) ||
                         collection.driver.toLowerCase().includes(filters.search.toLowerCase()) ||
                         collection.route.toLowerCase().includes(filters.search.toLowerCase());
    return matchesStatus && matchesWard && matchesDate && matchesSearch;
  });

  const getUniqueWards = () => {
    return [...new Set(collections.map(c => c.ward))].sort();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedCollection) {
      // Update existing collection
      setCollections(collections.map(c => 
        c.id === selectedCollection.id 
          ? { ...c, ...formData, id: selectedCollection.id }
          : c
      ));
      toast.success('Waste collection updated successfully!');
    } else {
      // Add new collection
      const newCollection = {
        ...formData,
        id: `WC${String(collections.length + 1).padStart(3, '0')}`,
        quantity: 0,
        completionTime: null
      };
      setCollections([...collections, newCollection]);
      toast.success('Waste collection added successfully!');
    }
    
    handleCloseModal();
  };

  const handleEdit = (collection) => {
    setSelectedCollection(collection);
    setFormData({
      ward: collection.ward,
      vehicle: collection.vehicle,
      driver: collection.driver,
      route: collection.route,
      wasteType: collection.wasteType,
      quantity: collection.quantity,
      collectionDate: collection.collectionDate,
      status: collection.status,
      notes: collection.notes || ''
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this collection record?')) {
      setCollections(collections.filter(c => c.id !== id));
      toast.success('Waste collection deleted successfully!');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCollection(null);
    setFormData({
      ward: '',
      vehicle: '',
      driver: '',
      route: '',
      wasteType: '',
      quantity: '',
      collectionDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      notes: ''
    });
  };

  const getTotalStats = () => {
    return {
      total: collections.length,
      completed: collections.filter(c => c.status === 'completed').length,
      inProgress: collections.filter(c => c.status === 'in-progress').length,
      pending: collections.filter(c => c.status === 'pending').length,
      totalWaste: collections.reduce((sum, c) => sum + c.quantity, 0).toFixed(1),
      targetWaste: collections.reduce((sum, c) => sum + c.targetQuantity, 0).toFixed(1)
    };
  };

  const stats = getTotalStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Waste Collection Management
              </h1>
              <p className="text-gray-600 mt-1">Track and manage daily waste collection activities</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition-all transform hover:scale-105"
            >
              + Add Collection
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-semibold">Total Collections</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-semibold">Completed</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.completed}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">✓</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-semibold">In Progress</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{stats.inProgress}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">⏳</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-semibold">Pending</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">{stats.pending}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">⏰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Waste Collection Progress */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Today's Collection Progress</h2>
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Total Waste Collected</span>
              <span className="text-sm font-bold text-emerald-600">{stats.totalWaste} / {stats.targetWaste} tons</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-4 rounded-full transition-all"
                style={{ width: `${(stats.totalWaste / stats.targetWaste) * 100}%` }}
              ></div>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {((stats.totalWaste / stats.targetWaste) * 100).toFixed(1)}% of target achieved
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Vehicle, Driver, Route..."
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
                <option value="cancelled">Cancelled</option>
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
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Collections Table */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Waste Collection Records</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-500"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b-2 border-emerald-200">
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">ID</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Ward</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Vehicle</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Route</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Waste Type</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Collected</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCollections.map((collection) => (
                    <tr key={collection.id} className="hover:bg-emerald-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-gray-900">{collection.id}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{collection.ward}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-bold text-gray-900">{collection.vehicle}</div>
                          <div className="text-xs text-gray-600">{collection.driver}</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-900">{collection.route}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-lg mr-2">{getWasteTypeIcon(collection.wasteType)}</span>
                          <span className="text-sm text-gray-900">{collection.wasteType}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-bold text-emerald-600">{collection.quantity} tons</div>
                          <div className="text-xs text-gray-600">Target: {collection.targetQuantity} tons</div>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(collection.status).badge}`}>
                          {collection.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(collection)}
                            className="text-blue-600 hover:text-blue-800 font-semibold text-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(collection.id)}
                            className="text-red-600 hover:text-red-800 font-semibold text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredCollections.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🗑️</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Collections Found</h3>
                  <p className="text-gray-600">Try adjusting your filters or add a new collection</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {selectedCollection ? 'Edit Collection' : 'Add New Collection'}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ward *</label>
                    <select
                      value={formData.ward}
                      onChange={(e) => setFormData({ ...formData, ward: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select Ward</option>
                      <option value="Ward 1">Ward 1</option>
                      <option value="Ward 2">Ward 2</option>
                      <option value="Ward 3">Ward 3</option>
                      <option value="Ward 4">Ward 4</option>
                      <option value="Ward 5">Ward 5</option>
                      <option value="Ward 6">Ward 6</option>
                      <option value="Ward 7">Ward 7</option>
                      <option value="Ward 8">Ward 8</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle *</label>
                    <input
                      type="text"
                      value={formData.vehicle}
                      onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="OD-05-1234"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Driver Name *</label>
                    <input
                      type="text"
                      value={formData.driver}
                      onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="Driver Name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Route *</label>
                    <input
                      type="text"
                      value={formData.route}
                      onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="Route A-1"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Waste Type *</label>
                    <select
                      value={formData.wasteType}
                      onChange={(e) => setFormData({ ...formData, wasteType: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select Type</option>
                      <option value="Mixed Waste">Mixed Waste</option>
                      <option value="Organic Waste">Organic Waste</option>
                      <option value="Recyclable">Recyclable</option>
                      <option value="Hazardous">Hazardous</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Target Quantity (tons) *</label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder="0.0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Collection Date *</label>
                    <input
                      type="date"
                      value={formData.collectionDate}
                      onChange={(e) => setFormData({ ...formData, collectionDate: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status *</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      required
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    rows="3"
                    placeholder="Additional notes or comments..."
                  ></textarea>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 rounded-xl font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-2 rounded-xl font-semibold transition-all"
                  >
                    {selectedCollection ? 'Update' : 'Add'} Collection
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

export default WasteCollection;

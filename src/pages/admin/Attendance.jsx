// @ts-nocheck
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAttendanceRecords } from '../../services/admin/attendanceService';

const Attendance = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [filters, setFilters] = useState({
    status: 'all',
    ward: 'all',
    role: 'all',
    search: ''
  });
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMarkAttendanceModal, setShowMarkAttendanceModal] = useState(false);
  const [attendanceData, setAttendanceData] = useState({
    staffId: '',
    status: 'present',
    checkInTime: '',
    checkOutTime: '',
    notes: ''
  });

  // Fetch staff attendance from API
  useEffect(() => {
    fetchAttendance();
  }, [selectedDate]);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const data = await getAttendanceRecords(selectedDate);
      setStaff(data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
      toast.error('Failed to load attendance records');
      setStaff([]);
    } finally {
      setLoading(false);
    }
  };


  const handleMarkAttendance = async (e) => {
    e.preventDefault();
    try {
      // TODO: API call to mark attendance
      toast.success('Attendance marked successfully');
      setShowMarkAttendanceModal(false);
      setAttendanceData({
        staffId: '',
        status: 'present',
        checkInTime: '',
        checkOutTime: '',
        notes: ''
      });
      fetchAttendance();
    } catch (error) {
      console.error('Error marking attendance:', error);
      toast.error('Failed to mark attendance');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      present: { bg: 'bg-emerald-500', text: 'text-emerald-600', badge: 'from-emerald-500 to-teal-500' },
      absent: { bg: 'bg-red-500', text: 'text-red-600', badge: 'from-red-500 to-rose-500' },
      'on-leave': { bg: 'bg-blue-500', text: 'text-blue-600', badge: 'from-blue-500 to-indigo-500' },
      late: { bg: 'bg-orange-500', text: 'text-orange-600', badge: 'from-orange-500 to-amber-500' },
      'half-day': { bg: 'bg-purple-500', text: 'text-purple-600', badge: 'from-purple-500 to-pink-500' }
    };
    return colors[status] || colors.present;
  };

  const getStatusIcon = (status) => {
    const icons = {
      present: '✅',
      absent: '❌',
      'on-leave': '🏖️',
      late: '⏰',
      'half-day': '⏱️'
    };
    return icons[status] || '✅';
  };

  const getRoleIcon = (role) => {
    const icons = {
      driver: '🚗',
      cleaner: '🧹',
      supervisor: '👔'
    };
    return icons[role] || '👤';
  };

  const filteredStaff = staff.filter(member => {
    const matchesStatus = filters.status === 'all' || member.status === filters.status;
    const matchesWard = filters.ward === 'all' || member.assignedWard === filters.ward;
    const matchesRole = filters.role === 'all' || member.role === filters.role;
    const matchesSearch = member.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         member.phone.includes(filters.search);
    return matchesStatus && matchesWard && matchesRole && matchesSearch;
  });

  const getUniqueWards = () => {
    return [...new Set(staff.map(s => s.assignedWard))].sort();
  };

  const attendanceStats = {
    total: staff.length,
    present: staff.filter(s => s.status === 'present').length,
    absent: staff.filter(s => s.status === 'absent').length,
    onLeave: staff.filter(s => s.status === 'on-leave').length,
    late: staff.filter(s => s.status === 'late').length,
    halfDay: staff.filter(s => s.status === 'half-day').length
  };

  const attendanceRate = staff.length > 0 
    ? ((attendanceStats.present / staff.length) * 100).toFixed(1) 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Attendance Management
              </h1>
              <p className="text-gray-600 mt-1">Track and manage staff attendance</p>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
              <button
                onClick={() => setShowMarkAttendanceModal(true)}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-2">➕</span>
                Mark Attendance
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-semibold">Total Staff</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{attendanceStats.total}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👥</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-semibold">Present</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{attendanceStats.present}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">✅</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-semibold">Absent</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{attendanceStats.absent}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">❌</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-semibold">On Leave</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">{attendanceStats.onLeave}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">🏖️</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-semibold">Late</p>
                <p className="text-2xl font-bold text-orange-600 mt-1">{attendanceStats.late}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">⏰</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600 font-semibold">Rate</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{attendanceRate}%</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📊</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Name, Phone..."
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
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="on-leave">On Leave</option>
                <option value="late">Late</option>
                <option value="half-day">Half Day</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
              <select
                value={filters.role}
                onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              >
                <option value="all">All Roles</option>
                <option value="driver">Driver</option>
                <option value="cleaner">Cleaner</option>
                <option value="supervisor">Supervisor</option>
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

        {/* Staff Attendance List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredStaff.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${getStatusColor(member.status).badge} rounded-xl flex items-center justify-center shadow-md`}>
                        <span className="text-white text-2xl">{getRoleIcon(member.role)}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600 capitalize">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className={`bg-gradient-to-r ${getStatusColor(member.status).badge} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md capitalize`}>
                        {member.status.replace('-', ' ')}
                      </span>
                      <span className="text-xl">{getStatusIcon(member.status)}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">📍 Ward:</span>
                      <span className="text-sm font-semibold text-gray-900">{member.assignedWard}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">📞 Phone:</span>
                      <span className="text-sm font-semibold text-gray-900">{member.phone}</span>
                    </div>
                    {member.vehicleAssigned && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">🚛 Vehicle:</span>
                        <span className="text-sm font-semibold text-gray-900">{member.vehicleAssigned}</span>
                      </div>
                    )}
                  </div>

                  {/* Time Info */}
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl mb-4">
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-gray-600 mb-1">Check In</p>
                        <p className="font-bold text-gray-900">{member.checkInTime || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Check Out</p>
                        <p className="font-bold text-gray-900">{member.checkOutTime || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 mb-1">Working</p>
                        <p className="font-bold text-emerald-600">{member.workingHours}</p>
                      </div>
                    </div>
                  </div>

                  {/* Leave Reason */}
                  {member.leaveReason && (
                    <div className="bg-blue-50 border border-blue-200 p-2 rounded-lg mb-4">
                      <p className="text-xs text-blue-800">
                        <span className="font-semibold">Reason:</span> {member.leaveReason}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedStaff(member);
                        setShowModal(true);
                      }}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-2 rounded-lg text-sm font-semibold shadow-md transition-all"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => toast.info('Edit attendance feature coming soon!')}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 rounded-lg text-sm font-semibold shadow-md transition-all"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && filteredStaff.length === 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Staff Found</h3>
            <p className="text-gray-600">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Staff Details Modal */}
      {showModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Staff Details
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
                      <p className="text-sm text-gray-600 font-semibold">Name</p>
                      <p className="text-lg font-bold text-gray-900">{selectedStaff.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Role</p>
                      <p className="text-base font-bold text-gray-900 capitalize">{selectedStaff.role}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Phone</p>
                      <p className="text-base font-bold text-gray-900">{selectedStaff.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Assigned Ward</p>
                      <p className="text-base font-bold text-gray-900">{selectedStaff.assignedWard}</p>
                    </div>
                  </div>
                </div>

                {/* Today's Attendance */}
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Today's Attendance</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Status</p>
                      <span className={`bg-gradient-to-r ${getStatusColor(selectedStaff.status).badge} text-white text-sm font-bold px-3 py-1 rounded-full inline-block mt-1 capitalize`}>
                        {selectedStaff.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Working Hours</p>
                      <p className="text-base font-bold text-emerald-600">{selectedStaff.workingHours}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Check In Time</p>
                      <p className="text-base font-bold text-gray-900">{selectedStaff.checkInTime || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Check Out Time</p>
                      <p className="text-base font-bold text-gray-900">{selectedStaff.checkOutTime || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Assignment */}
                {selectedStaff.vehicleAssigned && (
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">Assignment</h3>
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">Assigned Vehicle</p>
                      <p className="text-base font-bold text-gray-900">{selectedStaff.vehicleAssigned}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 rounded-xl font-semibold transition-all"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      if (selectedStaff.phone) {
                        window.location.href = `tel:${selectedStaff.phone}`;
                      }
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-2 rounded-xl font-semibold transition-all"
                  >
                    Call
                  </button>
                  <button
                    onClick={() => toast.info('Attendance history coming soon!')}
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

      {/* Mark Attendance Modal */}
      {showMarkAttendanceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Mark Attendance
                </h2>
                <button
                  onClick={() => setShowMarkAttendanceModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleMarkAttendance} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Staff Member *</label>
                  <select
                    required
                    value={attendanceData.staffId}
                    onChange={(e) => setAttendanceData({ ...attendanceData, staffId: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="">Select Staff</option>
                    {staff.map(member => (
                      <option key={member.id} value={member.id}>
                        {member.name} - {member.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Status *</label>
                  <select
                    required
                    value={attendanceData.status}
                    onChange={(e) => setAttendanceData({ ...attendanceData, status: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="on-leave">On Leave</option>
                    <option value="late">Late</option>
                    <option value="half-day">Half Day</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Check In Time</label>
                    <input
                      type="time"
                      value={attendanceData.checkInTime}
                      onChange={(e) => setAttendanceData({ ...attendanceData, checkInTime: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Check Out Time</label>
                    <input
                      type="time"
                      value={attendanceData.checkOutTime}
                      onChange={(e) => setAttendanceData({ ...attendanceData, checkOutTime: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                  <textarea
                    value={attendanceData.notes}
                    onChange={(e) => setAttendanceData({ ...attendanceData, notes: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Leave reason, remarks, etc."
                  ></textarea>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowMarkAttendanceModal(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 py-3 rounded-xl font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 rounded-xl font-semibold transition-all"
                  >
                    Save Attendance
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

export default Attendance;

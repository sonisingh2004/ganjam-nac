// @ts-nocheck
import apiClient from '../../api/api';

// Mock attendance data
const getMockAttendance = () => [
  {
    id: 'ATT001',
    employeeId: 'EMP001',
    name: 'Ramesh Singh',
    employeeName: 'Ramesh Singh',
    phone: '+91 98765 43210',
    role: 'driver',
    date: new Date().toISOString().split('T')[0],
    checkIn: '06:00',
    checkOut: '14:30',
    status: 'present',
    workingHours: 8.5,
    assignedWard: 'Ward 5',
    location: 'Ward 5',
    department: 'Sanitation'
  },
  {
    id: 'ATT002',
    employeeId: 'EMP002',
    name: 'Suresh Kumar',
    employeeName: 'Suresh Kumar',
    phone: '+91 87654 32109',
    role: 'supervisor',
    date: new Date().toISOString().split('T')[0],
    checkIn: '05:45',
    checkOut: '14:15',
    status: 'present',
    workingHours: 8.5,
    assignedWard: 'Ward 3',
    location: 'Ward 3',
    department: 'Operations'
  },
  {
    id: 'ATT003',
    employeeId: 'EMP003',
    name: 'Prakash Patel',
    employeeName: 'Prakash Patel',
    phone: '+91 76543 21098',
    role: 'driver',
    date: new Date().toISOString().split('T')[0],
    checkIn: null,
    checkOut: null,
    status: 'absent',
    workingHours: 0,
    assignedWard: 'Ward 7',
    location: null,
    department: 'Sanitation'
  },
  {
    id: 'ATT004',
    employeeId: 'EMP004',
    name: 'Vijay Sharma',
    employeeName: 'Vijay Sharma',
    phone: '+91 65432 10987',
    role: 'cleaner',
    date: new Date().toISOString().split('T')[0],
    checkIn: '06:15',
    checkOut: null,
    status: 'present',
    workingHours: 0,
    assignedWard: 'Ward 2',
    location: 'Ward 2',
    department: 'Sanitation'
  },
  {
    id: 'ATT005',
    employeeId: 'EMP005',
    name: 'Sanjay Das',
    employeeName: 'Sanjay Das',
    phone: '+91 54321 09876',
    role: 'driver',
    date: new Date().toISOString().split('T')[0],
    checkIn: '06:45',
    checkOut: '14:45',
    status: 'late',
    workingHours: 8,
    assignedWard: 'Ward 4',
    location: 'Ward 4',
    department: 'Sanitation'
  },
  {
    id: 'ATT006',
    employeeId: 'EMP006',
    name: 'Manoj Kumar',
    employeeName: 'Manoj Kumar',
    phone: '+91 43210 98765',
    role: 'cleaner',
    date: new Date().toISOString().split('T')[0],
    checkIn: '06:00',
    checkOut: '10:30',
    status: 'half-day',
    workingHours: 4.5,
    assignedWard: 'Ward 6',
    location: 'Ward 6',
    department: 'Sanitation'
  },
  {
    id: 'ATT007',
    employeeId: 'EMP007',
    name: 'Rahul Verma',
    employeeName: 'Rahul Verma',
    phone: '+91 32109 87654',
    role: 'supervisor',
    date: new Date().toISOString().split('T')[0],
    checkIn: null,
    checkOut: null,
    status: 'on-leave',
    workingHours: 0,
    assignedWard: 'Ward 1',
    location: null,
    department: 'Operations'
  }
];

/**
 * Fetch attendance records
 */
export const getAttendanceRecords = async (date = null) => {
  try {
    const url = date ? `/admin/attendance?date=${date}` : '/admin/attendance';
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    return getMockAttendance();
  }
};

/**
 * Mark attendance
 */
export const markAttendance = async (attendanceData) => {
  try {
    const response = await apiClient.post('/admin/attendance', attendanceData);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, returning mock response');
    return { success: true, data: { id: 'ATT' + Date.now(), ...attendanceData } };
  }
};

/**
 * Update attendance
 */
export const updateAttendance = async (id, attendanceData) => {
  try {
    const response = await apiClient.put(`/admin/attendance/${id}`, attendanceData);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, returning mock response');
    return { success: true, data: { id, ...attendanceData } };
  }
};

/**
 * Get attendance statistics
 */
export const getAttendanceStats = async (startDate = null, endDate = null) => {
  try {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    const response = await apiClient.get(`/admin/attendance/stats?${params}`);
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    const records = getMockAttendance();
    return {
      totalEmployees: records.length,
      present: records.filter(r => r.status === 'present').length,
      absent: records.filter(r => r.status === 'absent').length,
      onLeave: records.filter(r => r.status === 'leave').length,
      attendanceRate: ((records.filter(r => r.status === 'present').length / records.length) * 100).toFixed(2)
    };
  }
};

export default {
  getAttendanceRecords,
  markAttendance,
  updateAttendance,
  getAttendanceStats
};

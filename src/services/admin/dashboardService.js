// @ts-nocheck
import apiClient from '../../api/api';

// Mock data for when backend is not available
const getMockDashboardData = () => ({
  stats: {
    waste: 125.50,
    vehicles: 18,
    activeStaff: 45,
    complaints: 23,
    wards: 12,
    citizens: 8250
  },
  performance: {
    resolvedComplaints: 87,
    totalComplaints: 100,
    collectionRate: 94,
    complaintsTrend: [72, 68, 75, 81, 78, 85, 87],
    collectionTrend: [88, 90, 89, 92, 91, 93, 94]
  },
  pending: {
    pendingComplaints: 234,
    avgResponseTime: '2.4h'
  },
  wardCoverage: {
    wards: [
      { name: 'Ward 1', status: 'completed', completion: 100, collectedToday: 12.5 },
      { name: 'Ward 2', status: 'completed', completion: 100, collectedToday: 10.8 },
      { name: 'Ward 3', status: 'in-progress', completion: 75, collectedToday: 8.5 },
      { name: 'Ward 4', status: 'in-progress', completion: 60, collectedToday: 7.2 },
      { name: 'Ward 5', status: 'pending', completion: 25, collectedToday: 3.5 },
      { name: 'Ward 6', status: 'completed', completion: 100, collectedToday: 11.3 }
    ]
  },
  staffPerformance: {
    present: 45,
    absent: 2,
    onLeave: 1,
    attendanceRate: 94,
    tasksAssigned: 52,
    tasksCompleted: 38,
    tasksInProgress: 14
  },
  routeCompletion: {
    overallCompletion: 73,
    completedRoutes: 11,
    totalRoutes: 15,
    routes: [
      { name: 'Route A1', vehicle: 'MH-12-AB-1234', status: 'completed', completion: 100 },
      { name: 'Route A2', vehicle: 'MH-12-AB-1235', status: 'completed', completion: 100 },
      { name: 'Route B1', vehicle: 'MH-12-CD-5678', status: 'in-progress', completion: 65 },
      { name: 'Route B2', vehicle: 'MH-12-CD-5679', status: 'in-progress', completion: 45 },
      { name: 'Route C1', vehicle: 'MH-12-EF-9012', status: 'pending', completion: 0 }
    ]
  },
  fuelManagement: {
    todayUsage: 285,
    monthUsage: 4630,
    totalCost: 1687611,
    avgCostPerLiter: 105,
    alerts: [
      { type: 'warning', message: 'High fuel consumption detected', vehicle: 'MH-12-CD-5678' },
      { type: 'info', message: 'Refueling scheduled', vehicle: 'MH-12-AB-1234' }
    ]
  },
  vehicles: {
    all: 18,
    overSpeeding: 0,
    running: 12,
    standing: 3,
    stopped: 2,
    dataNotRetrieving: 1
  },
  complaints: {
    pending: 5,
    open: 12,
    closed: 58,
    outOfScope: 3
  },
  recentActivities: [
    { type: 'collection', message: 'Waste collected from Ward 5 - 2.5 tons', time: '10 mins ago' },
    { type: 'complaint', message: 'New complaint registered - Missed collection', time: '25 mins ago' },
    { type: 'vehicle', message: 'Vehicle MH-12-AB-1234 route completed', time: '45 mins ago' },
    { type: 'staff', message: 'Morning shift attendance completed - 45/48 present', time: '1 hour ago' },
    { type: 'payment', message: 'Payment received - ₹1,850', time: '2 hours ago' }
  ],
  vehicleLocations: [
    {
      id: 'VEH001',
      registrationNumber: 'OD-05-1234',
      type: 'compactor',
      status: 'running',
      location: { lat: 20.2961, lng: 85.8245 },
      speed: 35,
      assignedWard: 'Ward 5',
      driverName: 'Ramesh Singh',
      driverPhone: '+91 98765 43210',
      fuelLevel: 75,
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'VEH002',
      registrationNumber: 'OD-05-5678',
      type: 'tipper',
      status: 'standing',
      location: { lat: 20.3021, lng: 85.8321 },
      speed: 0,
      assignedWard: 'Ward 3',
      driverName: 'Suresh Kumar',
      driverPhone: '+91 87654 32109',
      fuelLevel: 45,
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'VEH003',
      registrationNumber: 'OD-05-9012',
      type: 'compactor',
      status: 'stopped',
      location: { lat: 20.2890, lng: 85.8156 },
      speed: 0,
      assignedWard: 'Ward 7',
      driverName: 'Prakash Patel',
      driverPhone: '+91 76543 21098',
      fuelLevel: 20,
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'VEH004',
      registrationNumber: 'OD-05-3456',
      type: 'mini-truck',
      status: 'running',
      location: { lat: 20.3105, lng: 85.8412 },
      speed: 52,
      assignedWard: 'Ward 2',
      driverName: 'Vijay Sharma',
      driverPhone: '+91 65432 10987',
      fuelLevel: 60,
      lastUpdated: new Date().toISOString()
    },
    {
      id: 'VEH005',
      registrationNumber: 'OD-05-2345',
      type: 'tipper',
      status: 'running',
      location: { lat: 20.2785, lng: 85.8398 },
      speed: 28,
      assignedWard: 'Ward 1',
      driverName: 'Sanjay Das',
      driverPhone: '+91 43210 98765',
      fuelLevel: 80,
      lastUpdated: new Date().toISOString()
    }
  ]
});

/**
 * Fetch all dashboard data
 * Falls back to mock data if backend is not available
 */
export const getDashboardData = async () => {
  try {
    const response = await apiClient.get('/admin/dashboard');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data:', error.message);
    // Return mock data when backend is not available
    return getMockDashboardData();
  }
};

/**
 * Fetch dashboard statistics
 */
export const getDashboardStats = async () => {
  try {
    const response = await apiClient.get('/admin/dashboard/stats');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    return getMockDashboardData().stats;
  }
};

/**
 * Fetch ward coverage data
 */
export const getWardCoverage = async () => {
  try {
    const response = await apiClient.get('/admin/dashboard/wards');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    return getMockDashboardData().wardCoverage;
  }
};

/**
 * Fetch vehicle locations for map
 */
export const getVehicleLocations = async () => {
  try {
    const response = await apiClient.get('/admin/vehicles/locations');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    return getMockDashboardData().vehicleLocations;
  }
};

/**
 * Fetch recent activities
 */
export const getRecentActivities = async () => {
  try {
    const response = await apiClient.get('/admin/dashboard/activities');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    return getMockDashboardData().recentActivities;
  }
};

/**
 * Fetch staff performance data
 */
export const getStaffPerformance = async () => {
  try {
    const response = await apiClient.get('/admin/dashboard/staff-performance');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    return getMockDashboardData().staffPerformance;
  }
};

/**
 * Fetch complaints data
 */
export const getComplaintsData = async () => {
  try {
    const response = await apiClient.get('/admin/dashboard/complaints');
    return response.data;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    return getMockDashboardData().complaints;
  }
};

export default {
  getDashboardData,
  getDashboardStats,
  getWardCoverage,
  getVehicleLocations,
  getRecentActivities,
  getStaffPerformance,
  getComplaintsData
};
